// ㅜ express, fs, jsonwebtoken, express-session, session-file-store, nodemon
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const jwt = require("jsonwebtoken");
const { log } = require("console");
const app = require("express")();
const fs = require("fs");
const PORT = 4321;

app.listen(PORT, () => {
  log("localhost:", PORT);
});

app.use(
  session({
    // ㅜ 세션을 발급할 때 사용되는 키 (노출 주의)
    secret: "SHJ",
    // ㅜ 세션을 저장하고 불러올 때 다시 저장할 지의 여부
    resave: false,
    // ㅜ 세션을 저장할 때 초기화의 여부
    saveUninitialized: true,
    // ㅜ 저장소를 만들 지의 여부
    // ㅜ 저장된 세션의 정보를 파일로 보기 위해 (session-file-store)
    store: new FileStore(),
  })
);

app.get("/", (req, res) => {
  if (!req.session.key) {
    req.session.key = "SHJdfdfddddd";
  }
  res.send(`key: ${req.session.key}`);
});

app.get("/shop", (req, res) => {
  res.send(`shop- ${req.session.key}`);
});
