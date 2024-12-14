import { io } from "socket.io-client";

(async () => {
  const res = await fetch("http://localhost:3000/");
  const resJson = await res.json();
  console.log(resJson);

  const div = document.createElement("div");
  div.innerText = resJson.message;

  document.body.appendChild(div);
})();

const socket = io("http://localhost:3000");

const form = document.getElementById("form");
const input = document.getElementById("input") as HTMLInputElement;
const root = document.getElementById("root");

const renderMsg = (msg: string, isSender: boolean) => {
  const div = document.createElement("div");
  div.innerText = msg;
  if (isSender) {
    div.style.textAlign = "right";
    div.style.background = "gray";
  }

  root.appendChild(div);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    renderMsg(input.value, true);
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  renderMsg(msg, false);
});
