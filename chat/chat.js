let heading = document.getElementById("heading");
let message = document.getElementById("message");
let chatPart = document.getElementById("chat");
let userData = JSON.parse(localStorage.getItem("userData"));
let url = window.location.search;
let queryParam = new URLSearchParams(url);
let getId = parseInt(queryParam.get("id"));
let findIndex = userData.findIndex((e) => {
  return e.id === getId;
});
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let chatterUser = userData[findIndex];
heading.innerHTML = `hello ${currentUser.username}, you are chat with ${chatterUser.username}`;
chatArray = [];
let html = "";
chatArray = JSON.parse(localStorage.getItem("chatArray"));
const toSend = () => {
  let messageData = {
    participents: { recieverId: currentUser.id, senderId: getId },
    message: [
      {
        id: Date.now(),
        name: currentUser.username,
        message: message.value,
        isread: false,
      },
    ],
  };

  let messageOnly = {
    id: Date.now(),
    name: currentUser.username,
    message: message.value,
    isread: false,
  };
  let index = chatArray.findIndex((e) => {
    return (
      e.participents.recieverId == currentUser.id &&
      e.participents.senderId == getId
    );
  });

  console.log(index);

  if (index >= 0) {
    chatArray[index].message.push(messageOnly);
    localStorage.setItem("chatArray", JSON.stringify(chatArray));
  }

  if (index == -1) {
    chatArray.push(messageData);
    localStorage.setItem("chatArray", JSON.stringify(chatArray));
  }
  showChat();
};

const showChat = () => {
  let userChat = chatArray.filter((e) => {
    return (
      (e.participents.recieverId == currentUser.id &&
        e.participents.senderId == getId) ||
      (e.participents.recieverId == getId &&
        e.participents.senderId == currentUser.id)
    );
  });

  if (userChat.length == 0) {
    return;
  }

  if (userChat.length == 1) {
    let OnlyMessageArray = userChat[0].message;
    html = "";
    OnlyMessageArray.forEach((item) => {
      html += `
            <div id="chatPart">
                <label>name: ${item.name}</label>
                <label>message: ${item.message}</label>
            </div>
                `;
    });
    chatPart.innerHTML = html;
  } else {
    let OnlyMessageArray = userChat[0].message;
    OnlyMessageArray = OnlyMessageArray.concat(userChat[1].message);

    OnlyMessageArray = OnlyMessageArray.sort((a, b) => {
      return a.id - b.id;
    });

    html = "";
    OnlyMessageArray.forEach((item) => {
      html += `
            <div id="chatPart">
                <label>name: ${item.name}</label>
                <label>message: ${item.message}</label>
            </div>
                `;
    });
    chatPart.innerHTML = html;
  }
};

showChat();

const back = () => {
  window.location.href = "../home/home.html";
};
