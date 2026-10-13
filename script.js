const music = document.getElementById("bgMusic");

// Store quiz answers without collecting a name
const quizAnswers = {};
let answersSaved = false;

/* Start Quiz */
function startQuiz() {
  if (music) {
    music.play().catch(error => {
      console.log("Music playback blocked:", error);
    });
  }

  const doll = document.getElementById("welcomeDoll");
  if (doll) doll.style.display = "none";

  show("q1");
}

/* Move Between Screens */
function next(id) {
  if (id === "final" && !answersSaved) {
    answersSaved = true;
    saveQuizAnswers();
  }

  show(id);
}

/* Show Screen */
function show(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (target) {
    target.classList.add("active");
  }
}

/* Record Selected Answers */
document.addEventListener("click", function (event) {
  const button = event.target.closest("button");

  if (!button) return;

  const screen = button.closest(".screen");

  if (!screen || !/^q[1-6]$/.test(screen.id)) return;

  quizAnswers[screen.id] = button.textContent.trim();
}, true);

/* Floating Hearts */
setInterval(() => {
  const container = document.querySelector(".background-hearts");
  if (!container) return;

  const heart = document.createElement("span");

  heart.innerHTML = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 15 + 10 + "px";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";

  container.appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}, 400);

/* Fireworks */
function showFireworks() {
  show("fireworks");

  for (let i = 0; i < 30; i++) {
    const spark = document.createElement("span");

    spark.style.position = "absolute";
    spark.style.left = Math.random() * 100 + "vw";
    spark.style.top = Math.random() * 100 + "vh";
    spark.style.fontSize = "20px";
    spark.style.animation = "fadeOut 2s forwards";

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 2000);
  }
}

/* Back Button */
function back(id) {
  show(id);
}

/* Moving No Buttons */
const noButtons = document.querySelectorAll(".noBtn");

noButtons.forEach(button => {
  button.addEventListener("mouseover", moveNo);
  button.addEventListener("touchstart", moveNo);
});

function moveNo(event) {
  const button = event.target;

  const x = Math.random() * 180 - 90;
  const y = Math.random() * 90 - 45;

  button.style.transform = `translate(${x}px, ${y}px)`;
}

/* Change Photos */
const photos = [
  "love.jpg",
  "love2.jpg",
  "love3.jpg",
  "love4.jpg",
  "love5.jpg",
  "love6.jpg"
];

let currentPhoto = 0;

const memoryPhoto = document.getElementById("memoryPhoto");

if (memoryPhoto) {
  memoryPhoto.addEventListener("click", () => {
    memoryPhoto.classList.add("zoom");

    setTimeout(() => {
      memoryPhoto.classList.remove("zoom");
    }, 300);

    currentPhoto++;

    if (currentPhoto >= photos.length) {
      currentPhoto = 0;
    }

    memoryPhoto.src = photos[currentPhoto];
  });
}

/* Firebase Configuration */
const firebaseConfig = {
  apiKey: "AIzaSyDBIAR73pwdqYCG9yKWkvT5rjSHxUSYqB4",
  authDomain: "love-me-5dcc4.firebaseapp.com",
  projectId: "love-me-5dcc4",
  storageBucket: "love-me-5dcc4.firebasestorage.app",
  messagingSenderId: "227866563200",
  appId: "1:227866563200:web:a67e409dae832556e80c65a"
};

/* Initialize Firebase */
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

/* Save Quiz Answers */
async function saveQuizAnswers() {
  try {
    await firebase.auth().signInAnonymously();

    await db.collection("quizResponses").add({
      answers: { ...quizAnswers },
      createdAt:
      
