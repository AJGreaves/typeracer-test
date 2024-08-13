const easyTexts = [
    "The cat sat on the mat.",
    "A quick brown fox jumps over the lazy dog.",
    "She sells seashells by the seashore."
];

const mediumTexts = [
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "A journey of a thousand miles begins with a single step."
];

const hardTexts = [
    "It was the best of times, it was the worst of times.",
    "In the beginning God created the heavens and the earth.",
    "The quick brown fox jumps over the lazy dog multiple times."
];

let startTime;
let endTime;
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const sampleTextElem = document.getElementById('sample-text');
const userInputElem = document.getElementById('user-input');
const timeElem = document.getElementById('time');
const wpmElem = document.getElementById('wpm');

function getRandomText(texts) {
    return texts[Math.floor(Math.random() * texts.length)];
}

function updateSampleText() {
    const difficulty = document.getElementById('difficulty').value;
    let texts;

    if (difficulty === 'easy') {
        texts = easyTexts;
    } else if (difficulty === 'medium') {
        texts = mediumTexts;
    } else if (difficulty === 'hard') {
        texts = hardTexts;
    }

    const randomText = getRandomText(texts);
    sampleTextElem.innerText = randomText;
}

function startTest() {
    startTime = new Date();
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function stopTest() {
    endTime = new Date();
    const testTime = (endTime - startTime) / 1000; // time in seconds
    timeElem.innerText = testTime.toFixed(2);

    const sampleText = sampleTextElem.innerText;
    const userText = userInputElem.value;
    const wpm = calculateWPM(sampleText, userText, testTime);
    wpmElem.innerText = wpm;

    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function calculateWPM(sampleText, userText, testTime) {
    const sampleWords = sampleText.split(' ');
    const userWords = userText.split(' ');
    let correctWords = 0;

    for (let i = 0; i < userWords.length; i++) {
        if (userWords[i] === sampleWords[i]) {
            correctWords++;
        }
    }

    const minutes = testTime / 60;
    const wpm = correctWords / minutes;
    return Math.round(wpm);
}

document.getElementById('difficulty').addEventListener('change', updateSampleText);
startBtn.addEventListener('click', startTest);
stopBtn.addEventListener('click', stopTest);