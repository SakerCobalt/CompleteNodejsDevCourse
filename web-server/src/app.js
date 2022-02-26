const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require ('./utils/geocode')
const forcast = require ('./utils/forcast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()

const port = process.env.PORT

//Setup handlebars engine
app.set('view engine','hbs') //set up the handlebars engine for express that we installed via npm
app.set('views',viewsPath) //to change the default views directory to a new name
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
  res.render('index', {
    title: "Weather App",
    name: "Andrew Mead"
  }) 
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title: "About Mead",
    name: "Weston"
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title: "Help",
    name:"Weston",
    message:"This help page is generated for your comfort."
  })
})

// app.get('/help',(req,res)=>{
//   //express detects the object/array and sends it as JSON data
//   res.send({
//     name: "Weston",
//     age:45
//   })
// })
// app.get('/about',(req,res)=>{
//   // res.send('<About</h1?><h2> my page</h2>')
// })
app.get('/weather',(req,res)=>{
  if(!req.query.address){
    res.send({
      error:"An address must be entered!"
    })
  } else{
    // console.log(req.query)
    // res.send({
    //   forcast:"It is Snowing",
    //   location: "Philadelphia"
    const enteredLocation = req.query.address
    geocode(enteredLocation, (error, {latitude,longitude,location}={})=>{
      if (error){
        return res.send({
          id:"error",
          error: error
        })
        // return console.log('Error', error)
      }
      forcast(latitude,longitude,(error,forcastData)=>{
        if (error){
          return res.send({
            error: error
          })
          // return console.log('Error',error)
        }
        res.send({
          location: location,
          forcast:forcastData,
          address: req.query.address
        })
        // console.log(location)
        // console.log(forcastData)
      })
    })
  
  }
})

app.get('/products',(req,res)=>{
  if(!req.query.search){
    res.send({
      error:"You must provide a search term"
    })
  } else {
    res.send({
      products:[]
    })

  }
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title: "404 Error",
    message: "This help file can not be found.",
    name: "Weston Gray"
  })
})

app.get('*',(req,res)=>{
  res.render('404',{
    title:"404 Error",
    message: "This page can not be found.",
    name:"Weston Gray"
  })
})

app.listen(port, ()=>{
  //This callback runs when the server starts up
  console.log(`Server is up on port ${port}`)
})