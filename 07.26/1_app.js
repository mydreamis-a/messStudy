// 07 26 화

// npm init -y: package.json 파일 생성
// script start 구문 추가

// socket.io
// 실시간 웹을 위한 자바스크립트 라이브러리
// 웹 클라이언트와 서버 간의 실시간 양방향 통신을 가능하게 해 주는 NODE.JS 모듈
// 웹 소켓 프로토콜을 지원해주는 네트워킹 라이브러리 (웹 소켓과 클라이언트 간의 양방향 통신)

// 가상 화폐 거래소 같은 데이터 전송이 많은 경우 표준 웹 소켓을 사용하는 것이 좋다.
// 실제 업비트나 바이낸스 소켓 API를 사용하면 데이터가 정말 많이 들어온다.

// 비동기 이벤트 방식으로 실시간으로 간단하게 데이터를 요청하고 받을 수 있다.
// 고객센터의 웹 채팅도 socket.io 라이브러리를 사용해서 페이지를 새로고침 하지 않아도 실시간으로 응답이 가능하다.

// socket.io 많이 사용하는 메서드
// on: 이벤트에 매칭해서 소켓 이벤트 연결
// emit: 소켓 이벤트 발생

// express, fs, socket.io, nodemon 모듈 설치

const socketio = require("socket.io");
const express = require("express");
const { log } = require("console");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  fs.readFile("2_page.html", (err, data) => {
    res.end(data);
  });
});

const server = app.listen(PORT, () => {
  log(PORT, "빈 포트 사용 중");
});

let userId = new Array();
const io = socketio(server);
// ㅗ 소켓 서버를 생성 및 실행 (매개 변수는 express server)

// connection => 클라이언트가 웸 소켓 서버에 접속할 때 발생
// on 함수로 connection 이벤트에 매칭해서 소켓 이벤트 연결
io.sockets.on("connection", (socket) => {
  log("유저가 접속함");
  userId.push(socket.id);
  log(userId);
  socket.on("hi", (data) => {
    log(data, "에서 보낸 웹 소켓 hi 이벤트가 실행됨");
    // socket.emit("hi", "웹 소켓에서 클라이언트로 보냄 (자기 자신에게 발생)");
    // io.sockets.emit("hi", "모든 대상에게 발생");
    // socket.broadcast.emit("hi", "자기 자신을 제외한 모든 대상에게 발생 (방송)");
    io.sockets.to(data.id).emit("hi", data.msg); // 비밀 대화
  });
});

// HTML 상단에 추가: <script src="/socket.io/socket.io.js"></script>
// socket.io 모듈은 내부적으로 "루트/socket.io" 경로에 socket.io.js 파일을 자동으로 등록해준다.
// 결과적으로 http://localhost:PORT/socket.io/socket.io.js에 접근하면 JS를 불러오게 된다.
