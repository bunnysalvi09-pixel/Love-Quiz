const music = document.getElementById("bgMusic");

function startQuiz() {
  music.play();
  show("q1");
}

function next(id) {
  show(id);
}

function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* Smooth Floating Hearts */
setInterval(() => {
  let heart = document.createElement("span");
  heart.innerHTML = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 15 + 10 + "px";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";
  document.querySelector(".background-hearts").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);

}, 400);

function showFireworks() {
  show("fireworks");

  for(let i=0;i<30;i++){
    let spark = document.createElement("span");
    spark.innerHTML = "";
    spark.style.position = "absolute";
    spark.style.left = Math.random()*100 + "vw";
    spark.style.top = Math.random()*100 + "vh";
    spark.style.fontSize = "20px";
    spark.style.animation = "fadeOut 2s forwards";
    document.body.appendChild(spark);

    setTimeout(()=> spark.remove(),2000);
  }
}

/*back button*/
function back(id) {
  show(id);
}


// Select all No buttons
const noButtons = document.querySelectorAll(".noBtn");

// Add event for hover (desktop) & touch (mobile)
noButtons.forEach(btn => {
  btn.addEventListener("mouseover", moveNo);
  btn.addEventListener("touchstart", moveNo);
});

function moveNo(event){
  const btn = event.target;
  // Random movement within card
  const x = Math.random() * 180 - 90; // move left/right
  const y = Math.random() * 90 - 45;  // move up/down
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

/*hide doll*/
function startQuiz(){
  music.play();
  // Hide doll after pressing start
  const doll = document.getElementById("welcomeDoll");
  if(doll) doll.style.display = "none";

  show("q1");
}

/*photo chnge*/
const photos = ["love.jpg", "love2.jpg", "love3.jpg", "love4.jpg", "love5.jpg", "love6.jpg"]; // add more if you want
let currentPhoto = 0;

const memoryPhoto = document.getElementById("memoryPhoto");

if(memoryPhoto){
  memoryPhoto.addEventListener("click", () => {
    // Zoom effect
    memoryPhoto.classList.add("zoom");
    setTimeout(() => memoryPhoto.classList.remove("zoom"), 300);

    // Change photo
    currentPhoto++;
    if(currentPhoto >= photos.length) currentPhoto = 0;
    memoryPhoto.src = photos[currentPhoto];
  });
}

