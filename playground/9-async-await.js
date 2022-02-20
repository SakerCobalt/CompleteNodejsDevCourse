//async functions always return a promise
const add = (a,b)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if (a< 0 || b<0){
        reject('Numbers must be non-negative')
      }
      resolve(a+b)
    },1000)
  })
}

const doWork = async ()=>{
  // throw new Error('Something went wrong.')
  const sum = await add(1,99) //replaces the .then call to get the promise
  const sum2 = await add(sum,50)
  const sum3 = await add(sum2,-3)
  return sum3
}

doWork().then((result)=>{
  console.log(result)
}).catch((e)=>{
  console.log('Error',e)
})