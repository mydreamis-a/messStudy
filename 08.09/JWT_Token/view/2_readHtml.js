// 08 10 수

// ㅜ express 라우터 설정
const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  fs.readFile("view/3_login.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

// ㅜ 설정한 라우터 내보내기
// ㅜ 모듈처럼 require 함수로 사용이 가능하다.
module.exports = router;
