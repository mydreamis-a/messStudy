// 02 28 목

const socketio = require("socket.io");
const express = require("express");
const { log } = require("console");
const fs = require("fs");
const app = express();
const PORT = 5000;
const seats = [
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const server = app.listen(PORT, () => {
  log("서버 연결 완료");
});

app.get("/", (req, res) => {
  log("메인");
});

app.get("/reserve", (req, res) => {
  fs.readFile("4_exercise.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.get("/seats", ())

const io = socketio(server);
io.sockets.on("connection", (socket) => {
  socket.on("reserve", (data) => {
    seats[data.y][data.x] = 2;
    io.sockets.emit("reserve", data);
  });
});
