let email = document.getElementById("email");
let username = document.getElementById("username");
let password = document.getElementById("password");
let userArray = [];

const toSubmit = () => {
  let user = {
    id: Date.now(),
    username: username.value,
    email: email.value,
    password: password.value,
  };
  userArray = JSON.parse(localStorage.getItem("userData"));

  let findIndex = userArray.findIndex((e) => {
    return (
      e.username.toLowerCase() === username.value.toLowerCase() ||
      e.password === password.value ||
      e.email == email.value
    );
  });

  if (findIndex == -1) {
    userArray.push(user);
    localStorage.setItem("userData", JSON.stringify(userArray));
    alert("User created successfully");
    window.location.href = "../login/login.html";
  }

  if (findIndex >= 0) {
    username.value = "";
    email.value = "";
    password.value = "";
    alert("user is already exsisted, please go to the login page");
  }
};
