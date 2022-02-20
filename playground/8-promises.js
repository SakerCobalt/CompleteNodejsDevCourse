//Typically the promises are created in the libraries we will use
// const doWorkPromise = new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//     // resolve([1,4,7])  //The Promise will stop when it gets to the first resolve/reject function
//     reject('This is my error!')
//   },2000)
// })

// doWorkPromise.then((result)=>{
//   console.log('Success',result)
// }).catch((error)=>{
//   console.log('Error:',error)
// })

const add = (a,b)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(a+b)
    },1000)
  })
}

//works, but the nested promises get complex and confusing
// add(1,2).then((sum)=>{
//   console.log(sum)
//   add(sum,5).then((sum2)=>{
//     console.log(sum2)
//   }).catch((e)=>{
//     console.log(e)
//   })
// }).catch((e)=>{
//   console.log(e)
// })

//Promise chaining
add(1,1).then((sum)=>{
  console.log(sum)
  return add(sum, 4)
}).then((sum2)=>{
  console.log(sum2)
  return add(sum2,4)
}).then((sum3)=>{
  console.log(sum3)
}).catch((e)=>{
  console.log(e)
})