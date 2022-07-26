const socketio = require("socket.io");
const express = require("express");
const { log } = require("console");
const fs = require("fs");
// ㅜ 서버 객체
const app = express();
// ㅜ 사용할 포트 변수에 할당해놓는다. (바인딩)
const PORT = 3000;

// const server = express().listen(PORT, () => {});
const server = app.listen(PORT, () => {
  log(PORT, "성공");
});

// ㅜ socketio 생성 및 실행
const io = socketio(server);
app.get("/", (req, res) => {
  fs.readFile("3_page.html", (err, data) => {
    res.end(data);
  });
});

// ㅜ 클라이언트가 접속하고 종료했을 때
io.sockets.on("connection", (socket) => {
  // 클라이언트에서 웹 소켓에 연결되어 있는 message 이벤트를 실행시켜준다?
  socket.on("message", (data) => {
    io.sockets.emit("message", data);
    // socket.emit("message", data);
  });
});
// io.sockets.on("disconnect", () => {});
