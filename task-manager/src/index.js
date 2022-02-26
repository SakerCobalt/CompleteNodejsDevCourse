const app = require('./app')

const port = process.env.PORT



//launch server with >npm run dev for development.  See package.json for scripts
app.listen(port, ()=>{
  console.log('Server is up on port'+port)
})