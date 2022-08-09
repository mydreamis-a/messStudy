// ㅜ express, fs, ejs, socket.io, nodemon
const socketio = require("socket.io");
const express = require("express");
const { log } = require("console");
const ejs = require("ejs");
const fs = require("fs");
const app = express();
const PORT = 4411;
const server = app.listen(PORT, () => {
  log("localhost:", PORT);
});

// ㅜ 소켓 생성 및 실행
const io = socketio(server);
app.get("/", (req, res) => {
  // ㅜ html 파일을 읽고 인코딩한 다음 반환해준다.
  //   fs.readFile("2_shop.html", "utf-8", (err, data) => {
  //     res.send(ejs.render(data, {}));
  const page = fs.readFileSync("2_shop.html", "utf-8");
  res.send(ejs.render(page, { products }));
});

// ㅜ __dirname: 현재 프로젝트의 경로
// ㅜ use 함수에 함수를 전달해서 server의 절대 경로를 설정하고 그 이름을 정의해주기
app.use("/img", express.static(__dirname + "/image"));

// ㅜ 객체로 만들기 위한 생성자 함수
let index = 0;
function Product(name, price, image, count) {
  this.name = name;
  this.price = price;
  this.image = image;
  this.count = count;
  this.index = index++;
}

// ㅜ 동적 할당으로 생성자 함수 사용
const products = new Array();
products.push(new Product("서현진 배우님1", 100, "서현진 배우님.jpeg", 10));
products.push(new Product("서현진 배우님2", 100, "서현진 배우님.jpeg", 10));
products.push(new Product("서현진 배우님3", 100, "서현진 배우님.jpeg", 10));
products.push(new Product("서현진 배우님4", 100, "서현진 배우님.jpeg", 10));
products.push(new Product("서현진 배우님5", 100, "서현진 배우님.jpeg", 10));

io.on("connection", (socket) => {
  socket.on("cart", (idx) => {
    products[idx].count--;

    const count = products[idx].count;
    io.emit("count", { idx, count });
  });

  socket.on("return", (idx) => {
    products[idx].count++;

    const count = products[idx].count;
    io.emit("count", { idx, count });
  });
});

// 08 09 11 수정
