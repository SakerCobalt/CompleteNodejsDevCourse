require('../task-manager/src/db/mongoose')
const Task = require('../task-manager/src/models/task')

// Task.findByIdAndDelete("61f5636db9d6ed3fe82b4fe9").then((task)=>{
//   return Task.countDocuments({completed:false})
// }).then((unfinishedTasks)=>{
//   console.log(unfinishedTasks)
// }).catch((e)=>{
//   console.log(e)
// })

const deleteTaskAndCount = async (id)=>{
  await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({completed:false})
  return count
}

deleteTaskAndCount("61f65c186c97883ab0ccc403").then((count)=>{
  console.log(count)
}).catch((e)=>{
  console.log(e)
})