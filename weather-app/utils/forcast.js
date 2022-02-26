const request = require ('postman-request')

const forcast = (lat,long,callback)=>{
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_KEY}&query=${lat},${long}&units=f`
  request({url:url,json:true},(error,{body})=> {
  // const data = JSON.parse(response.body)
  if (error){
    callback("Can not connect to server.",undefined)
  } else if (body.error) {
    callback("Unable to resolve location, please try a different input.",undefined)
  } else {
    const data = body.current
    callback(error,`It is currently ${data.temperature} degrees out.  It feels like ${data.feelslike} degrees.`)
  }
}) 
}

module.exports = forcast