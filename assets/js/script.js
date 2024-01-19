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
    return { equation: `${num1} x ${num2}`, product: product };
}

// Check if the answer entered is correct
function checkAnswer() {
    // Get the user's input
    let input = document.getElementById("input").value;
    // Convert it to a number
    input = Number(input);
    // Compare it with the correct answer
    if (input === result.product) {
        // If correct, show a positive feedback
        document.getElementById("feedback").innerHTML = "Correct!";
    } else {
        // If incorrect, show a negative feedback
        document.getElementById("feedback").innerHTML = "Wrong!";
    }
}

// Generate a multiplication equation
let result = createMultiplicationEquation();
// Display the equation on the card
document.getElementById("equation").innerHTML = result.equation;
// Add an event listener to the input element
document.getElementById("input").addEventListener("change", checkAnswer);
