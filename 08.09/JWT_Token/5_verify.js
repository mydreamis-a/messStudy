const dot = require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const { log } = require("console");
const router = express.Router();
const secretKey = process.env.SECRETKEY;

// ㅜ use 함수로 요청 URL을 설정함
router.post("/", (req, res) => {
  const token = req.session.token;

  // ㅜ 토큰을 해석하는 함수
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) log("정상적이지 않은 토큰");
    log(decoded);

    // ㅜ decoded: 해석된 객체
    res.send(decoded);
  });
});

module.exports = router;
