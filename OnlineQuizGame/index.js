const prompt = require('prompt-sync')({sigint: true});

// Define the Question class
class Question {
    constructor(question, options, correctAnswerIndex) {
        this.question = question;
        this.options = options;
        this.correctAnswerIndex = correctAnswerIndex;
    }
}

// Define the Quiz class
class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.currentIndex = 0;
    }

    // Method to display a random quiz question along with multiple-choice answers
    displayQuestion() {
        const currentQuestion = this.questions[this.currentIndex];
        console.log(`Question: ${currentQuestion.question}`);
        currentQuestion.options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
        });
    }

    // Method to check user's answer and update score
    checkAnswer(userAnswer) {
        const currentQuestion = this.questions[this.currentIndex];
        if (userAnswer === currentQuestion.correctAnswerIndex + 1) {
            console.log("Correct answer!");
            this.score++;
        } else {
            console.log("Incorrect answer!");
        }
        this.currentIndex++;
    }

    // Method to start the quiz
    start() {
        console.log("Welcome to the Quiz Game!");
        console.log("Instructions: Enter the number of the correct answer.");
        console.log("-------------------------------------");

        // Display questions and get user input until all questions are answered
        while (this.currentIndex < this.questions.length) {
            this.displayQuestion();
            const userAnswer = parseInt(prompt("Enter your answer:"));
            if (!isNaN(userAnswer) && userAnswer >= 1 && userAnswer <= this.questions[this.currentIndex].options.length) {
                this.checkAnswer(userAnswer);
            } else {
                console.log("Invalid input. Please enter a number corresponding to the options.");
            }
        }

        // Display final score
        console.log("-------------------------------------");
        console.log("Quiz complete!");
        console.log(`Your final score is: ${this.score}/${this.questions.length}`);
    }
}

// Define some quiz questions
const questions = [
    new Question("What is the capital of France?", ["London", "Paris", "Berlin", "Madrid"], 1),
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], 1),
    new Question("Who is the author of 'Harry Potter' series?", ["J.K. Rowling", "Stephen King", "George R.R. Martin", "J.R.R. Tolkien"], 0),
    new Question("What is the tallest mammal?", ["Elephant", "Giraffe", "Whale", "Gorilla"], 1)
];

// Create a new Quiz instance and start the quiz
const quiz = new Quiz(questions);
quiz.start();
