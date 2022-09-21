let a = [1, 2, 3, 5, 8];

console.log(a.length);

console.log(a[5]); // undefined

console.log("Loop for printing elements");
for (x in a) {
  console.log(x); // 0, 1, 2, 3, 4
}

console.log("Loop for adding elements in array");
let sum = 0;
for (x in a) {
  sum += a[x]; 
}
console.log(sum); // 19

const ReturnsSum = (array) => {
  let sum = 0;
  for (x in a) {
    sum += a[x];
  }
  return sum; // 19
};
console.log("Function for adding elements in array"); 
console.log(ReturnsSum(a)); 

a[8] = 55; 
console.log(a[8]); // 55

console.log(a.length); // 9

console.log(a); // [1, 2, 3, 5, 8, <1 empty item>, <2 empty item>, <3 empty item>, <4 empty item>, <5 empty item>]

console.log(ReturnsSum(a)); // 74