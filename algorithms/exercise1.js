/*
Given an array and an element, find the index of that element in the array. If it does not exist in the array, return -1. 
If there are multiple occurrences of that element in the array, return the index of first occurence

Test Case 1: [1,2,1,3,2,4,2,3,3,1,3,3], 3
Expected Output: 3

Test Case 2:[1,2,3,4], 5
Expected Output: -1

*/

const findIndex = (array, number) => {
  for (const index in array) {
    if (array[index] === number) return +index;
  }
  return -1;
};

const array1 = [1, 2, 1, 3, 2, 4, 2, 3, 3, 1, 3, 3];
const number1 = 3;

const array2 = [1, 2, 3, 4];
const number2 = 5;

console.log(findIndex(array1, number1));
console.log("Expected Output: 3\n");

console.log(findIndex(array2, number2));
console.log("Expected Output: -1");
