// Declare a global variable for the score and initialize it to zero
var score = 0;

// Declare global variable to access the answer on-demand instead of re-doing the calculation
var answer;

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
    // Update the answer
    answer = product;
    // Return the equation and the product as an object
    return { equation: `${num1} x ${num2} = `, product: product };
}

// Function to toggle the disabled attribute of the 'submit' button
function toggleDisabledSubmit(isDisabled) {
    document.getElementById("submit").disabled = isDisabled;
}

// This function generates a new equation and displays it on the card
function nextQuestion() {
    toggleDisabledSubmit(false);
    // Generate a new multiplication equation
    result = createMultiplicationEquation();
    // Display the equation on the card
    document.getElementById("equation").innerHTML = result.equation;
    // Clear the input and feedback elements
    document.getElementById("input").value = "";
    document.getElementById("feedback").innerHTML = "";
}

// Function to show the answer
function showAnswer() {
    let equation = document.getElementById("equation").innerHTML;
    var regex = /(.*) = /; // match any characters before the = sign and capture them in a group
    var match = equation.match(regex); // apply the regex to the equation
    if (match) { // if there is a match
        var result = match[1]; // get the first captured group
        // use eval to print the result 
        console.log(result); // print the result
        document.getElementById("input").value = eval(result.replace('x', '*')); // replace * with x to work with eval
    }
}

// Function to show the answer
function showAnswerSimple() {
    document.getElementById("input").value = answer;
}

// Check if the answer entered is correct
function checkAnswer() {
    // Only check if button is not yet disabled - if they don't have the answer correct yet
    if (document.getElementById("submit").disabled === true)
        return
    // Get the user's input
    let input = document.getElementById("input").value;
    // Convert it to a number
    input = Number(input);
    // Compare it with the correct answer
    if (input === result.product) {
        // If correct, show a positive feedback
        document.getElementById("feedback").innerHTML = "Correct!";
        toggleDisabledSubmit(true);
        score++;
        console.log(score);
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

