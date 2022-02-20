const request = require ('postman-request')

const forcast = (lat,long,callback)=>{
  const url = `http://api.weatherstack.com/current?access_key=${promise.env.WEATHERSTACK_KEY}&query=${lat},${long}&units=f`
  request({url:url,json:true},(error,{body})=> {
  // const data = JSON.parse(response.body)
  // console.log('forcast request')
  if (error){
    callback("Can not connect to server.",undefined)
  } else if (body.error) {
    // console.log("forcast body error")
    callback("Unable to resolve location, please try a different input.",undefined)
  } else {
    // console.log(body)
    const data = body.current
    callback(error,`It is currently ${data.temperature} degrees out.  It feels like ${data.feelslike} degrees.  There is ${data.cloudcover}% cloud cover.`)
  }
}) 
}

module.exports = forcast