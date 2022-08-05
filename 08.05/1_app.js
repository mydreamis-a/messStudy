// 08 05 금
// 경매소 만들기

// 다음 수업 때 회원가입 및 로그인, 쿠키 세션 JWT 예정

// ㅜ express, ejs, socketio, fs, nodemon
// ㅜ 페이지 라우터 분리해서 보여주기 (/루트 경로 페이지, /shop 페이지)
const socketio = require("socket.io");
const express = require("express");
const { log } = require("console");
const ejs = require("ejs");
const fs = require("fs");
const app = express();
const PORT = 4400;
const server = app.listen(PORT, () => {
  log("연결 완료");
});

// ㅜ 소켓 생성 및 실행
const io = socketio(server);

// ㅜ __dirname: 현재 프로젝트의 경로
// ㅜ use 함수에 함수를 전달해서 server의 절대 경로를 설정하고 그 이름을 정의해주기
app.use("/src", express.static(__dirname + "/image"));
console.log(__dirname + "/image");

// ㅜ 상품의 번호
let counter = 0;

// ㅜ 객체로 만들기 위한 생성자 함수
function Product(name, image, price, count) {
  this.name = name;
  this.image = image;
  this.price = price;
  this.count = count;
  this.index = counter++;
}

// ㅜ 동적 할당으로 생성자 함수 사용
const products = [new Product("사과", "/", 2000, 20), new Product("수박", "/", 2000, 20), new Product("초코바", "/", 2000, 20), new Product("비타민", "/", 2000, 20), new Product("커피", "/", 2000, 20)];

app.get("/", (req, res) => {
  fs.readFile("2_page.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.get("/shop", (req, res) => {
  // ㅜ html 파일을 읽고 인코딩한 다음 반환해준다.
  const page = fs.readFileSync("3_shop.html", "utf-8");
  res.send(ejs.render(page, { products }));
});

let cart = new Array();
io.on("connection", (socket) => {
  function onReturn(index) {
    products[index].count++;
    // ㅜ delete: 배열의 값을 제거
    delete cart[index];

    let count = products[index].count;
    io.emit("count", { index, count });
  }

  socket.on("cart", (index) => {
    products[index].count--;
    cart[index] = {};
    cart[index].index = index;

    let count = products[index].count;
    io.emit("count", { index, count });
  });

  socket.on("buy", (index) => {
    delete cart[index];

    let count = products[index].count;
    io.emit("count", { index, count });
  });

  socket.on("return", (index) => {
    onReturn(index);
  });
});
