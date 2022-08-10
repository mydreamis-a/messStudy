const dot = require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const secretKey = process.env.SECRETKEY;

router.post("/login", (req, res) => {
  const name = "서현진";
  const token = jwt.sign(
    {
      type: "JWT",
      name: name,
    },
    secretKey,
    {
      expiresIn: "5m",
      issuer: "J",
    }
  );

  req.session.token = token;
  const temp = {
    msg: "토큰 발급 완료",
    token,
  };
  fs.readFile("view/5_userView.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

module.exports = router;
