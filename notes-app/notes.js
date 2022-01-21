const { default: chalk } = require('chalk')
const fs = require('fs')

const addNote = (title,body) =>{
  const notes = loadNotes()

  // const duplicateNotes = notes.filter((note)=> note.title === title)
  const duplicateNote = notes.find((note)=> note.title===title)

  if (!duplicateNote){
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse(`${title}, ${body} was successfully added`))
  } else {
    console.log(chalk.red.inverse('Note title taken'))
  }
}

const saveNotes = (notes)=>{
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json',dataJSON)
}

const removeNote = (title)=>{
  const notes = loadNotes()

  const notesToSave = notes.filter((note)=> note.title !== title)

  if (notesToSave.length === notes.length){
    console.log(chalk.red.inverse(`The note ${title} does not exist.`))
  } else {
    saveNotes(notesToSave)
    console.log(chalk.green.inverse(`The note ${title} was removed.`))
  }
}

const listNotes = () =>{
  const notes = loadNotes()
  console.log(chalk.bgBlack.inverse('Your notes:'))
  notes.forEach((note)=>{
    console.log(note.title)
  })
}

const loadNotes = ()=>{
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e){
    return []
  }
}

const readNote = (title)=>{
  const notes = loadNotes()
  const requestedNote = notes.find((note)=>note.title===title)
  const noteTitle= requestedNote.title
  const noteBody = requestedNote.body
  const msg = `Note: ${noteTitle}  Body: ${noteBody}`
  console.log(msg)
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote:removeNote,
  listNotes:listNotes,
  readNote:readNote
}