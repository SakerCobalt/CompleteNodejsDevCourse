const fs = require('fs')

// const book = {
//   title:'Ego is the Enemy',
//   author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book)
// const parsedData = JSON.parse(bookJSON)
// fs.writeFileSync('1-JSON.json',bookJSON)

// const dataBuffer = fs.readFileSync('./1-JSON.json')
// console.log(dataBuffer)
// console.log(dataBuffer.toString())
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)
// console.log(data.title)

const dataBuffer = fs.readFileSync('./1-JSON.json')
let dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
data.name = "Weston"
data.age = 45
console.log(data)
dataJSON = JSON.stringify(data)
fs.writeFileSync('1-JSON.json',dataJSON)