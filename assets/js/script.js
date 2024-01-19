// Returns a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Creates a multiplication equation with two numbers between 1 and 12
  function createMultiplicationEquation() {
    // Get two random numbers between 1 and 12
    let num1 = getRandomInt(1, 12);
    let num2 = getRandomInt(1, 12);
    // Calculate the product
    let product = num1 * num2;
    // Return the equation and the product as an object
    return {equation: `${num1} x ${num2}`, product: product};
  }
  

let result = createMultiplicationEquation();
console.log(result.equation); // This will show the equation without the answer
console.log(result.product); // This will show the answer for verification
  