const path = require('path')
const express = require('express')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const publicDirectoryPath = path.join(__dirname,'../public')

const app = express()

app.use(express.static(publicDirectoryPath))

//Won't see this since we have a static index.html now
// app.get('',(req,res)=>{
//   res.send('<h1>Weather</h>')  
// })

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
  res.send({
    forcast:"It is Snowing",
    location: "Philadelphia"
  })
})

const port = 3000
app.listen(port, ()=>{
  //This callback runs when the server starts up
  console.log(`Server is up on port ${port}`)
})