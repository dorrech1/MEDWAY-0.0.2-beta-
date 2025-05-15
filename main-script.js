const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let playerY = (canvas.height - paddleHeight) / 2;
let aiY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, '#61dafb');
    }
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX + ballRadius > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, '#282c34');
    drawNet();
    drawRect(0, playerY, paddleWidth, paddleHeight, '#61dafb');
    drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, '#61dafb');
    drawCircle(ballX, ballY, ballRadius, '#61dafb');
}

function gameLoop() {
    moveBall();
    draw();
}

setInterval(gameLoop, 1000 / 60);

var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log("Signed in as:", user.email);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Error", error);
    });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  if (password === confirmPassword) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log("Signed in as:", user.email);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Error", error);
      });
  } else {
    console.error("Passwords do not match");
  }
});
