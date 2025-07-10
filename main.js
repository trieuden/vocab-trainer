let data = {};
let keys = [];
let currentWord = "";
let correctCount = 0;
let wrongCount = 0;
let isRecording = false;
let recognition = null;
let showVoc = false;
let isReverse = false;

const fileInput = document.getElementById("fileInput");
const fileNameDisplay = document.getElementById("fileNameDisplay");
const advanceToggle = document.getElementById("advanceToggle");

advanceToggle.addEventListener("change", () => {
    isReverse = advanceToggle.checked;
    pickRandomWord();
});

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        fileNameDisplay.textContent = file.name;
        readFile(file);
    }
});

function normalize(text) {
    return text
        .replace(/\([^)]*\)/g, "")
        .replace(/\/[^/]*\//g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
}

function readFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const lines = e.target.result.split("\n");
        data = {};
        lines.forEach((line) => {
            const [key, value] = line.split(":");
            if (key && value) data[key.trim()] = value.trim();
        });
        keys = Object.keys(data);
        if (keys.length > 0) pickRandomWord();
        else alert("File không hợp lệ. Định dạng: từ: nghĩa");
    };
    reader.readAsText(file);
}

function pickRandomWord() {
    currentWord = keys[Math.floor(Math.random() * keys.length)];
    const displayWord = isReverse ? data[currentWord].split("/")[0] : currentWord;
    document.getElementById("word").textContent = displayWord;
    document.getElementById("answer").value = "";
    document.getElementById("result").textContent = "";
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Shift") showResult();
    if (event.key === "Control") speakWord();
    if (event.key === "Enter") {
        event.preventDefault();
        checkAnswer();
    }
});

function checkAnswer() {
    const userInput = normalize(document.getElementById("answer").value);

    let correctAnswers;
    if (isReverse) {
        correctAnswers = normalize(currentWord);
        if (userInput === correctAnswers) {
            if (!showVoc) correctCount++;
            showVoc = false;
            updateStats();
            pickRandomWord();
        } else {
            document.getElementById("result").textContent = "Sai rồi! Bớt ngu lại con chó.";
        }
    } else {
        correctAnswers = data[currentWord]
            .toLowerCase()
            .split("/")
            .map((x) => normalize(x));

        if (correctAnswers.includes(userInput)) {
            if (!showVoc) correctCount++;
            showVoc = false;
            updateStats();
            pickRandomWord();
        } else {
            document.getElementById("result").textContent = "Sai rồi! Bớt ngu lại con chó.";
        }
    }
}

function showResult() {
    if (!showVoc) wrongCount++;
    showVoc = true;

    if (isReverse) {
        document.getElementById("answer").value = normalize(currentWord);
        document.getElementById("result").textContent = `Từ đúng là: "${normalize(currentWord)}"`;
    } else {
        const meaning = data[currentWord].split("/")[0];
        document.getElementById("answer").value = meaning;
        document.getElementById("result").textContent = `Nhớ kĩ cho tao: "${data[currentWord]}"`;
    }

    updateStats();
}

function updateStats() {
    document.getElementById("correctCount").textContent = correctCount;
    document.getElementById("wrongCount").textContent = wrongCount;
}

function speakWord() {
    if ("speechSynthesis" in window) {
        const textToSpeak = isReverse ? data[currentWord].split("/")[0] : currentWord;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = isReverse ? "vi-VN" : "en-US";
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    } else {
        alert("Trình duyệt không hỗ trợ phát âm.");
    }
}

function toggleVoiceRecognition() {
    if (!recognition) {
        alert("Trình duyệt không hỗ trợ nhận diện giọng nói.");
        return;
    }
    isRecording ? stopRecording() : startRecording();
}

function startRecording() {
    isRecording = true;
    const voiceBtn = document.getElementById("voiceBtn");
    voiceBtn.classList.add("bg-red-600", "animate-pulse");
    voiceBtn.textContent = "🔴 Đang nghe...";
    recognition.start();
}

function stopRecording() {
    isRecording = false;
    const voiceBtn = document.getElementById("voiceBtn");
    voiceBtn.classList.remove("bg-red-600", "animate-pulse");
    voiceBtn.textContent = "🎤 Nói";
    recognition.stop();
}

// Tooltip logic
const helpIcon = document.getElementById("helpIcon");
const tooltip = document.getElementById("tooltip");
let tooltipTimeout;

helpIcon.addEventListener("click", () => {
    tooltip.classList.remove("hidden");
    clearTimeout(tooltipTimeout);
    tooltipTimeout = setTimeout(() => {
        tooltip.classList.add("hidden");
    }, 2000);
});

// SpeechRecognition init
if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript;
        transcript = transcript.replace(/\.$/, "");
        document.getElementById("answer").value = transcript;
        stopRecording();
    };

    recognition.onerror = recognition.onend = () => stopRecording();
}

// Load default vocab
fetch("vocabulary_list.txt")
    .then((res) => res.text())
    .then((text) => {
        const lines = text.split("\n");
        lines.forEach((line) => {
            const [key, value] = line.split(":");
            if (key && value) data[key.trim()] = value.trim();
        });
        keys = Object.keys(data);
        pickRandomWord();
    });
