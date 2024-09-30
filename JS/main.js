// * HTML Elements

// ? SignUp elements
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signupError = document.getElementById("signupError");
var signupBtn = document.getElementById("signupBtn");

// ? login elements
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var loginError = document.getElementById("loginError");
var loginBtn = document.getElementById("loginBtn");

// ? welcome elements
var welcomeMsg = document.getElementById("username");
var logoutBtn = document.getElementById("logoutBtn");

// * App Variables
var signupArray = [];
if (localStorage.getItem("users") == null) {
  signupArray = [];
} else {
  signupArray = JSON.parse(localStorage.getItem("users"));
}

// * functions

// ! SIGN UP FUNCTIONS
function emptySignupInputs() {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function emailExist() {
  for (var i = 0; i < signupArray.length; i++) {
    if (signupArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return false;
    }
  }
}

function signup() {
  if (emptySignupInputs() == false) {
    signupError.innerHTML = `<span class="text-danger m-3">All inputs are required</span>`;
    return false;
  }

  var signup = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  if (emailExist() == false) {
    signupError.innerHTML = `<span class="text-danger m-3">Email already exist</span>`;
  } else {
    signupArray.push(signup);
    localStorage.setItem("users", JSON.stringify(signupArray));
    signupError.innerHTML = `<span class="text-success m-3">Sign up successfully</span>`;
  }
}

// ! Login FUNCTIONS
function emptyLoginInputs() {
  if (loginEmail.value == "" || loginPassword.value == "") {
    return false;
  } else {
    return true;
  }
}

function login() {
  if (emptyLoginInputs() == false) {
    loginError.innerHTML = `<span class="text-danger m-3">All inputs are required</span>`;
    return false;
  }
  var email = loginEmail.value;
  var password = loginPassword.value;
  for (var i = 0; i < signupArray.length; i++) {
    if (
      signupArray[i].email.toLowerCase() == email.toLowerCase() &&
      signupArray[i].password.toLowerCase() == password.toLowerCase()
    ) {
      localStorage.setItem("sessionUserName", signupArray[i].name);
      window.location = "home.html";
      return;
    }
    loginError.innerHTML = `<span class="text-danger m-3">Incorrect Email or Password</span>`;
  }
}

// ! Home FUNCTIONS
if (welcomeMsg) {
  var username = localStorage.getItem("sessionUserName");
  if (username) {
    welcomeMsg.innerHTML = `Welcome, ${username}`;
  } else {
    window.location = "index.html";
  }
}

function logout() {
  localStorage.removeItem("sessionUserName");
}

// * event listeners

// ! SIGN UP events
if (loginBtn) {
  loginBtn.addEventListener("click", login);
}

if (signupBtn) {
  signupBtn.addEventListener("click", signup);
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
