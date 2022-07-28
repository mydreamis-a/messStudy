// 07 28 목
// 채팅방 만들기

// express, socket.io, fs, nodemon

// npm 버전의 업데이트 내역을 확인할 수있는 주소
// https://www.npmjs.com/

const socketio = require("socket.io");
const express = require("express");
const { log } = require("console");
const fs = require("fs");

// ㅜ 서버의 몸체가 되는 객체 생성
const app = express();
const PORT = 3000;
const server = app.listen(PORT, () => {
  log("대기 상태");
});

// ㅜ socketio 생성 및 실행
const io = socketio(server);

app.get("/", (req, res) => {
  fs.readFile("2_page.html", "utf-8", (err, data) => {
    log(err);
    res.send(data);
  });
});

io.on("connection", (socket) => {
  log(socket);
  log("클라이언트 접속");
  socket.on("joinRoom", (room, name) => {
    // ㅜ 해당 방으로 접속시켜주는 함수
    socket.join(room);
    io.to(room).emit("joinRoom", room, name);
  });

  socket.on("leaveRoom", (room, name) => {
    // ㅜ 해당 방에서 떠나게 해주는 함수
    socket.leave(room);
    io.to(room).emit("leaveRoom", room, name);
  });
  socket.on("chat", (room, name, msg) => {
    io.to(room).emit("chat", name, msg);
  });
});

// 접속 중인 모든 클라이언트에게 메세지 전송
// io.emit("이벤트명", 데이터)

// 메세지를 전송한 클라이언트에게 메세지 전송
// socket.emit("이벤트명", 데이터)

// 자기를 제외한 모두에게 공지
// socket.broadcast.emit("이벤트명", 데이터)

// 특정 클라이언트에게 메세지 전송
// io.to(아이디).emit("이벤트명", 데이터)

// 클라이언트의 접속과 조료
// io.on("connection", (socket) => {})
// io.on("disconnect", (socket) => {})
