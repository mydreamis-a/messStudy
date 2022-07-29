// 07 27 수
// 영화관 좌석 예약

// socket.io, express, fs, nodemon 모듈 설치

const socketio = require("socket.io");
const express = require("express");
const { log } = require("console");
const fs = require("fs");

let temp1 = [
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

let temp2 = [
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

let temp3 = [
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

const seatsArr = [temp1, temp2, temp3];
let seats = new Array();
let index = 0;

// ㅜ 웹 서버 생성
const PORT = 3100;
const app = express();
const server = app.listen(PORT, () => {
  log(PORT, "번 포트 실행");
});

// ㅜ socket.io 생성 및 실행
const io = socketio(server);

app.get("/", (req, res) => {
  fs.readFile("2_page.html", (err, data) => {
    res.send(data.toString());
  });
});

app.get("/seats/:idx", (req, res) => {
  index = req.params.idx;
  seats = seatsArr[index];
  res.send(seats);
});

io.sockets.on("connection", (socket) => {
  socket.on("reserve", (data) => {
    seatsArr[data.selectCount][data.y][data.x] = 2;
    io.sockets.emit("reserve", data);
  });
});
