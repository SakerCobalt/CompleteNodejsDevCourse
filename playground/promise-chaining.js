require('../../task-manager/src/db/mongoose')
const User = require('../../task-manager/src/models/user')

// ObjectId("61f59a58baf2196f087426c1")

// User.findByIdAndUpdate('61f65805cf1b5e3ae0f33ecc', {age:1}).then((user)=>{
//   console.log(user)
//   return User.countDocuments({age:1})
// }).then((result)=>{
//   console.log(result)
// }).catch((e)=>{
//   console.log(e)
// })

const updateAgeandCount = async (id, age)=>{
  const user = await User.findByIdAndUpdate(id,{age:age})
  const count = await User.countDocuments({age}) //shorthand when key and value variable smae name
  return count //returns the promise
}

updateAgeandCount('61f65805cf1b5e3ae0f33ecc',2).then((count)=>{
  console.log(count)
}).catch((e)=>{
  console.log(e)
})
