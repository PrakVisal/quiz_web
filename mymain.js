const questions = [
    {
        question: `តើរាត្រីចាប់ផ្ដើមស្លៀកខោជើងរឹបតាំងពីសតវត្សទីប៉ុន្មាន?`,
        answer: [
            { text: '១៩', correct: false },
            { text: '២១', correct: true },
            { text: '២០', correct: false },
            { text: '២២', correct: false },
        ]
    },
    {
        question: `តើនរេន្រ្ទសាប់​​ក្ដប៉ុន្មានដងក្នុងមួយថ្ងៃ?`,
        answer: [
            { text: 'មួយដង', correct: false },
            { text: 'ប្រាំដង', correct: true },
            { text: 'បីដង', correct: false },
            { text: 'អត់ផង', correct: false, }
        ]
    },
    {
        question: `តើគីមទីមានច្រមុះវៀចទៅខាងណា?`,
        answer: [
            { text: 'ក្រោយ', correct: false },
            { text: 'ស្ដាំ', correct: false },
            { text: 'ឆ្វេង', correct: true },
            { text: 'មុខ', correct: false, }
        ]
    },
    {
        question: `តើធារិទ្ធមើលរឿងសិចមួយថ្ងៃប៉ុន្មានដង?`,
        answer: [

            { text: '២', correct: false },
            { text: '៥', correct: false },
            { text: 'មើល!តិច', correct: false },
            { text: '៣', correct: true },

        ]
    },
]
const questionsElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-button');
const nextButton = document.getElementById('next');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}
function resetAll() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function showQuestion() {
    resetAll();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    questionsElement.innerHTML = questionNumber + '. ' + currentQuestion.question;

    currentQuestion.answer.forEach(answers => {
        const buttons = document.createElement('button');
        buttons.innerHTML = answers.text;
        buttons.classList.add('btn');
        answerButtons.appendChild(buttons);

        if (answers.correct) {
            buttons.dataset.correct = answers.correct;
        }
        buttons.addEventListener('click', selectAnswer);
    });
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
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
function showScore() {
    resetAll();
    questionsElement.innerText = `You scored ${score} out of ${questions.length} questions`;
    nextButton.innerHTML = 'Play again';
    nextButton.style.display = 'block';
}
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz();