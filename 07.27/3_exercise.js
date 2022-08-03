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
]
const selectedSeats = new Array();
const fridaySeats = seats.slice();
const saturdaySeats = seats.slice();
const sundaySeats = seats.slice();

const server = app.listen(PORT, () => {
  log("서버 연결 완료");
});

// ㅜ 좌석 예매 페이지
app.get("/", (req, res) => {
  fs.readFile("4_exercise.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

// ㅜ 요일별 좌석 데이터
app.get("/show_all_seats/:day", (req, res) => {
  log(req.params.day)
  switch (req.params.day) {
    case "FRI":
      selectedSeats = fridaySeats.slice();
      break;
    case "SAT":
      selectedSeats = saturdaySeats.slice();
      break;
    case "SUN":
      selectedSeats = sundaySeats.slice();
      break;
    default:
      break;
  }
  res.send(selectedSeats);
});

const io = socketio(server);
io.on("connection", (socket) => {
  socket.on("reservation_request", (data) => {
    selectedSeats[data.row][data.column] = 2;
    io.emit("reservation_complete", data);
  });
});
