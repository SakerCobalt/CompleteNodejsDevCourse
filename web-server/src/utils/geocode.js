const request = require ('postman-request')

const geocode = (address, callback)=>{
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2FrZXJjb2JhbHQiLCJhIjoiY2tscjVkbGo3MDE2NTJvbnVibWFscnMzdCJ9.yp_xRhemxpUc2cusTHaWbA&limit=1`

  request({url:url, json:true},(error, {body})=>{
    if (error){
      callback("Unable to connect to location services!",undefined)
    } else if (body.features.length === 0){
      callback("Unable to find location.  Try another search",undefined)
    } else {
      const data = body.features[0]
      const lat = data.center[1]
      const long = data.center[0]
      const location = data.place_name
      callback(error,{
        latitude: lat,
        longitude: long,
        location: location
      })
      // console.log(`Lat: ${lat}, Long: ${long}`)
    }
  })
}

module.exports=geocode