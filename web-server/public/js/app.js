const formLocation = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

console.log('Client side javascript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//   console.log(response.json())
// })

const getWeather = (address) =>{
  messageOne.textContent='Loading, please wait...'
  messageTwo.textContent=''
  if (!address){
    console.log("Please provide a location")
    return
  }

  const weatherUrl = `/weather?address=${address}`
  
  fetch(weatherUrl).then((response)=>{
    // response.json().then((data)=>{
    //   console.log(data)
    // })
    response.json().then((res)=>{
      if (res.error){
        console.log(res.error)
        messageOne.textContent="Error"+res.error
      } else {
        messageOne.textContent=res.location
        console.log(res.location)
        messageTwo.textContent=res.forcast
        console.log(res.forcast)
      }
  
    })
  })
}

formLocation.addEventListener('submit',(e)=>{
  e.preventDefault()
  const search = document.querySelector('input')
  const address = search.value
  getWeather(address)
})