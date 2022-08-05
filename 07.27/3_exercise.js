const socketio = require("socket.io");
const express = require("express");
const { log } = require("console");
const fs = require("fs");
const app = express();
const PORT = 5000;
const server = app.listen(PORT, () => {
  log("서버 연결 완료");
});

// ㅜ 사용할 수 있는 좌석에 대한 고정 데이터
const seats = [
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let fridaySeats = new Array();
let saturdaySeats = new Array();
let sundaySeats = new Array();

const byDaySeats = {
  "FRI": fridaySeats,
  "SAT": saturdaySeats,
  "SUN": sundaySeats
}

// ㅜ 배열 안의 배열을 요일별 좌석 예매 현황으로 사용하기 위해 깊은 복사 진행하기
seats.forEach((el) => {
  fridaySeats.push(el.slice());
  saturdaySeats.push(el.slice());
  sundaySeats.push(el.slice());
});

// ㅜ 요일별 좌석 데이터 보내주기
app.get("/show_all_seats/:day", (req, res) => {
  const day = req.params.day;
  res.send(byDaySeats[day]);
});

// ㅜ 예매 요청된 좌석에 대해 데이터 처리해주고 현재 좌석 현황에 대해 다른 유저들에게도 공유하기
const io = socketio(server);
io.on("connection", (socket) => {
  socket.on("reservation_request", (data) => {
    const seats = byDaySeats[data.optionsDay];
    seats[data.row][data.column] = 2;
    io.emit("reservation_complete", data);
  });
});

