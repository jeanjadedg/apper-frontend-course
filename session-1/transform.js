function transform(nums) {
  const squaredNums = nums.map(num => num*num)
  return squaredNums.sort((a,b) => a-b)
  
}

const nums = [4,9,5,3,8]
const sortedSquaredNums = transform(nums)
console.log(sortedSquaredNums)
