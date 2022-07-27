// 02 27 수

const socketio = require("socket.io");
const express = require("express");
const { log } = require("console");
const fs = require("fs");
const app = express();
const PORT = 3000;
const server = app.listen(PORT, () => {
  log("서버 연결 완료");
});

app.get("/", (req, res) => {});

app.get("/reserve", (req, res) => {
  fs.readFile("4_exercise.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

const io = socketio(server);
io.socketio.on();
