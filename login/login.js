let email = document.getElementById('email');
let username = document.getElementById('username');
let password = document.getElementById('password');
let userData = [];
const toLogin = () => {
    userData = JSON.parse(localStorage.getItem('userData'));

    let findIndex = userData.findIndex((e)=>{
        return e.username == username.value && e.email === email.value && e.password === password.value;
    })
    
    localStorage.setItem('currentUser' , '');

    if (findIndex >= 0) {
        console.log(findIndex);
        localStorage.setItem('currentUser' , JSON.stringify(userData[findIndex]))
        window.location.href = '../home/home.html';
    }

    if (findIndex == -1) {
        alert('user is not define please sign up')
    }
}