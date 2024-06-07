const quotes = [
    'The quick brown fox jumps over the lazy dog.',
    'A journey of a thousand miles begins with a single step.',
    'To be or not to be, that is the question.',
    'All that glitters is not gold.',
    'A picture is worth a thousand words.'
];

const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const speedElement = document.getElementById('speed');
const startButton = document.getElementById('startButton');

let startTime;
let interval;

startButton.addEventListener('click', startGame);

function startGame() {
    const quote = getRandomQuote();
    quoteDisplayElement.innerText = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    quoteInputElement.value = null;
    speedElement.innerText = '';
    startButton.disabled = true;
    startTimer();
}

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');

    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    });

    if (correct) stopTimer();
});

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function startTimer() {
    timerElement.innerText = '0:00';
    startTime = new Date();
    interval = setInterval(() => {
        timerElement.innerText = getTimerTime();
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    const wordsTyped = quoteInputElement.value.split(' ').length;
    const wpm = Math.round((wordsTyped / elapsedTime) * 60);
    alert(`You completed the quote in ${elapsedTime} seconds with a speed of ${wpm} WPM!`);
    speedElement.innerText = `Speed: ${wpm} WPM`;
    startButton.disabled = false;
}

function getTimerTime() {
    const totalSeconds = Math.floor((new Date() - startTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
