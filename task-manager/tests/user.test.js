const request = require('supertest')

const app = require('../src/app')
const User = require('../src/models/user')
const {userOne, userOneId, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

// afterEach(()=>{
//   console.log('afterEach')
// })

test('Should signup a new user',async ()=>{
  
  const response = await request(app)
    .post('/users').send({
      name: 'Weston',
      email:'weston4@ohiogray.org',
      password:'MyPass777!'
    })
    .expect(201)

  //Assert that the database was changed correctly  (show that we did create a new user)
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  //Asertions about the response
  // expect(response.body.user.name).toBe('Mike')  //Would work fine if we are only checking 1 property
  expect(response.body).toMatchObject({
    user: {
      name:'Weston',
      email:'weston4@ohiogray.org',
    },
    token:user.tokens[0].token
  })
  expect(user.password).not.toBe('MyPass777!')
})


test('Should login existing user',async ()=>{
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)
  const user = await User.findById(userOneId)
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async()=>{
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: 'wrongone'
  }).expect(400)
})

test('Should get profile for user', async()=>{
  await request(app)
    .get('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user', async ()=>{
  await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async ()=>{
  await request(app)
    .delete('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
  
  const user = await User.findById(userOneId)
  expect(user).toBeNull()
})

test('Should not delete account for unauthorized user', async ()=>{
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image', async()=>{
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-pic.jpg')
    .expect(200)
  const user = await User.findById(userOneId)
  //toEqual matches items in an object.  toBe uses ===, so it can't be used for objects
  expect(user.avatar).toEqual(expect.any(Buffer)) //checks if the avatar is a Buffer
})

test('Should update valid user fields', async()=>{
  await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
      name:'Jess'
    })
    .expect(200)

  const user = await User.findById(userOneId)
  expect(user.name).toEqual('Jess')
})

test('Should not update invalid user fields', async()=>{
  await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
      location:'Philadelphia'
    })
    .expect(400)
})