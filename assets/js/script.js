// Declare a global variable for the score and initialize it to zero
var score = 0;

// Declare global variable to access the answer on-demand instead of re-doing the calculation
var answer;

// Get the score number element
var score_element = document.getElementById('score_number');
score_element.innerHTML = 0; // Set to 0 default

var assisted = false; // Need to see when someone used the show answer - if they did, score should not increase

// Timer variable
let timer;

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
    changeLoadingBarColor("green");
    toggleDisabledSubmit(false);
    // Generate a new multiplication equation
    result = createMultiplicationEquation();
    // Display the equation on the card
    document.getElementById("equation").innerHTML = result.equation;
    // Clear the input and feedback elements
    document.getElementById("input").value = "";
    document.getElementById("feedback").innerHTML = "";
    // Reset assisted variable
    assisted = false;
    // Start the timer
    startTimer();
}

function changeLoadingBarColor(color){
    let timeLeftBar = document.getElementById("time-left-bar");
    timeLeftBar.style.backgroundColor = color;
}

// Creates a timer that lasts 10 seconds - if time runs out, go to next question
function startTimer() {
    let timeLeft = 10;
    document.getElementById("time-left-text").textContent = timeLeft;
    let timeLeftBar = document.getElementById("time-left-bar");
    timeLeftBar.style.width = '100%'; // Start with full width
    clearTimeout(timer);
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 5) {
            changeLoadingBarColor("red")
        }
        document.getElementById("time-left-text").textContent = timeLeft;
        // Calculate and update progress bar width
        let widthPercent = (timeLeft / 10) * 100;
        timeLeftBar.style.width = widthPercent + '%';
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
            
        }
    }, 1000);
}

// Stops the timer
function stopTimer() {
    clearTimeout(timer);
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
    assisted = true; // User used assistance and we don't want score to be updated
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
        stopTimer();
        // If correct, show a positive feedback
        document.getElementById("feedback").innerHTML = "Correct!";
        toggleDisabledSubmit(true);
        // User did not use assistance so we can update the score
        if(assisted === false){
            score++;
            score_element.innerHTML = score;
        }
        
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

startTimer();