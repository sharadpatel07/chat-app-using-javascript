let output = document.getElementById("main");
let heading = document.getElementById("heading");
let html = "";
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
heading.innerHTML = `hello , ${currentUser.username}`;
let userData = JSON.parse(localStorage.getItem("userData"));
let chatArray = JSON.parse(localStorage.getItem("chatArray"));
const showList = () => {
  let index = userData.findIndex((e) => {
    return e.id == currentUser.id;
  });

  let newuserData = userData;
  newuserData.splice(index, 1);
  html = "";

  userData.forEach((element) => {
    html += `
      <div id="chat">
        <div id="name">${element.username}</div>
        <div id = "${element.username}"></div>
        <button onclick="toChat(${element.id})">chat</button>
      </div>
    `;
    //  Read(element.id);
  });
  output.innerHTML = html;
};

const toChat = (id) => {
  let index = userData.findIndex((e) => {
    return e.id == id;
  });
  chatArray.forEach((e) => {
    e.message.forEach((item) => {
      if (e.participents.senderId === currentUser.id) {
        if (item.name == userData[index].username && item.isread == false) {
          item.isread = true;
          localStorage.setItem("chatArray", JSON.stringify(chatArray));
        }
      }
    });
  });

  let url = new URL("http://127.0.0.1:3000/chat/chat.html");
  url.searchParams.append("id", id);
  window.location.href = url;
};
showList();

function read() {
  
    chatArray.forEach((ele) => {
      ele.message.forEach((item) => {
        console.log(item);
        if (ele.participents.senderId === currentUser.id) {
          if (item.isread == false) {
            document.getElementById(item.name).innerHTML = "unread";
          }
        }
      });
    });

}

read();

const logout = () => {
  window.location.href = "../login/login.html";
};
