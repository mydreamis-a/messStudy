// ㅜ express, fs, jsonwebtoken, express-session, session-file-store, nodemon
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const createToken = require("./4_createToken");
const verifyToken = require("./6_verifyToken");
const readHtml = require("./view/2_readHtml");
const express = require("express");
const { log } = require("console");
const app = express();
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

// ㅜ 루트로 절대 경로 설정
app.use(express.static(__dirname));

// ㅜ 모든 요청에서 사용 (앞에 URL이 있을 경우에는 해당 URL의 요청이 있을 때 사용 가능)
app.use(readHtml);
app.use(createToken);

// ㅜ 라우터 실행
app.use("/userView", verifyToken);