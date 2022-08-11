// ㅜ express, fs, body-parser, jsonwebtoken, dotenv, express-session, session-file-store, nodemon
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const bodyParser = require("body-parser");
const dot = require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const { log } = require("console");
const fs = require("fs");
const app = express();
const PORT = 1234;

app.listen(PORT, () => {
  log("localhost:", PORT);
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

app.use("/img", express.static(__dirname + "/image"));
app.use(express.static(__dirname));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  const page = fs.readFileSync("5_login_andToken.html", "utf-8");
  res.send(page);
});

app.post("/login", (req, res) => {
  const token = jwt.sign(
    {
      type: "JWT",
      id: req.body.userId,
      pw: req.body.userPw,
    },
    process.env.KEY,
    {
      expiresIn: "5m",
      issuer: "J",
    }
  );
  req.session.user = token;
  res.send(req.session.user);
});
