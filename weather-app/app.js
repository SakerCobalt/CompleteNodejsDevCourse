const geocode = require('./utils/geocode.js')
const forcast = require('./utils/forcast.js')
const process = require ('process')

console.log(process.argv[2])

if (process.argv.length<3){
  console.log('Please enter a location as argument')
} else if (process.argv.length > 3){
  console.log('Only 1 argument is acceptable.  If you have more than 1 word in your location, use "location".')
} else {
  const enteredLocation = process.argv[2]
  geocode(enteredLocation, (error, {latitude,longitude,location}={})=>{
    if (error){
      return console.log('Error', error)
    }
    forcast(latitude,longitude,(error,forcastData)=>{
      if (error){
        return console.log('Error',error)
      }
      console.log(location)
      console.log(forcastData)
    })
  })

}

