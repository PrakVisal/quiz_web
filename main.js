const questions = [
    {
        question: `What is my fucking real name?`,
        answer: [
            { text: 'Ah Songha', correct: false },
            { text: 'Visal', correct: true },
            { text: 'Ah Smos', correct: false },
            { text: 'Mab', correct: false, }
        ]
    },
    {
        question: `Guess how old am I?`,
        answer: [

            { text: '17', correct: false },
            { text: '25', correct: false },
            { text: '19', correct: false },
            { text: '20', correct: true },

        ]
    },
    {
        question: `What is my girlfriend's name?`,
        answer: [

            { text: 'Rose`', correct: false },
            { text: 'Jennie', correct: false },
            { text: 'Soda', correct: false },
            { text: 'hg ot ss pg', correct: true },

        ]
    },

]
const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-button');
const nextButton = document.getElementById('next');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    //declare the value of questions to show on screen
    let questionNumber = currentQuestionIndex + 1;
    //give text number to questions
    questionElement.innerHTML = questionNumber + '. ' + currentQuestion.question;
    //get dynamic questions

    currentQuestion.answer.forEach(answers => {
        //looping to show all answer buttons
        const buttons = document.createElement("button");
        //create element button give to html
        buttons.innerHTML = answers.text;
        //give answers text in button
        buttons.classList.add('btn');
        //add class name to button for accessing CSS
        answerButton.appendChild(buttons);
        //add all buttons to main Class answer-button
        if (answers.correct) {
            buttons.dataset.correct = answers.correct;
            //give button to has value true or false at first we already setted
        }
        buttons.addEventListener('click', selectAnswer);
    });
}
function resetState() {
    nextButton.style.display = 'none';
    while (answerButton.firstChild) {
        //This process continues until there are no more child nodes left in answerButton.
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    //give value on we clicked
    isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        //add to CSS class
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButton.children).forEach(button => {
        //loop for each check all data till found 'true'
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} questions!`;
    nextButton.innerHTML = 'Play again';
    nextButton.style.display = 'block';
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz(); 