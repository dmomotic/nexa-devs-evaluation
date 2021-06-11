/*
Given an array of integers, return an array of non-duplicate / unique elements.
Test Case 1: [1,3,3,3,1,5]
Expected Output: [1,3,5]

Test Case 2:[]
Expected Output: []

Test Case 3:[1,1,1,1]
Expected Output:[1]
*/

const array1 = [1, 3, 3, 3, 1, 5];
const array2 = [ ];
const array3 = [1, 1, 1, 1];

const removeDuplicates = (array) => {
  const newArray = [];
  for (const number of array) {
    if (!newArray.includes(number)) newArray.push(number);
  }
  return newArray;
}

console.log(removeDuplicates(array1));
console.log("Expected Output: [1,3,5]\n");

console.log(removeDuplicates(array2));
console.log("Expected Output: [ ]\n");

console.log(removeDuplicates(array3));
console.log("Expected Output: [1]\n");