const http = require ('http')

const url = `http://api.weatherstack.com/current?access_key=86564548b04587051fceef745c8b1f09&query=41,-81&units=f`

const request = http.request(url,(response)=>{
  let data = ''
  response.on('data',(chunk)=>{
    data = data + chunk.toString()
  })

  response.on('end',()=>{
    const body = JSON.parse(data)
    console.log(body)
  })

})

request.on('error',(error)=>{
  console.log('An error', error)
})

request.end() 