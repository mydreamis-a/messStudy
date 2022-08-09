// 08 09 화
// JWT (JSON Web Token)
// 웹 표준으로 두 개체의 JSON 객체를 사용해서 정보를 안정성 있게 전달해준다.

// 사용할 정보를 자체적으로 가지고 있다.
// JWT로 발급한 토큰은 기본 정보로서 (유저 정보 프로필)
// 토큰이 정상적으로 검증된 토큰인지에 대해 signature(서명)을 포함하고 있다.
// 웹 서버는 HTTP의 헤더에 넣어서 혹은 URL의 params 파라미터로도 전달이 가능하다.
// 주로 로그인이 정상적인지에 대한 회원 인증 권한에서 사용한다.

// 유저가 로그인 요청을 하면 서버는 유저의 정보를 가지고
// 정상적인 유저일 때 토큰을 발급해서 전달해준다. (입장권)
// 유저가 서버에 요청할 때마다 JWT를 포함해서 전달하면
// 서버는 클라이언트의 요청을 받을 때마다 해당 토큰을 확인하여
// 유저가 요청한 작업을 응답해준다.
// 따라서 서버는 유저의 세션을 유지할 필요가 없고 로그인 되었는지를 확인할 필요가 없다.
// 요청했을 때만 토큰을 확인해서 처리하기 때문에 서버의 자원을 아낄 수 있다.

// JWT를 사용하는 이유
// 안정성과 함께 정보를 주고 받을 수 있다.
// JWT를 생성하면 JWT의 라이브러리가 자동으로 인코딩과 해싱 작업을 해준다.
// HMAC: 해싱 기법을 적용하여 메세지의 위변조를 방지하는 기법
// SHA256: 임의의 길이의 메세지를 256비트의 축약된 메세지로 만들어내는 해시 알고리즘

// JWT의 구조
// ㅜ 토큰의 정보
header = {
  alg: "알고리즘",
  typ: "타입",
};

// ㅜ 전달할 데이터
payload = {
  sub: "토큰의 제목",
  name: "유저 이름",
  lat: "토큰이 발급된 시간으로부터 얼마나 지났는지",
};

// signature = HMASHA256(BASE64URL(header) + BASE64URL(payload));

// ㅜ express, fs, body-parser, jsonwebtoken, dotenv, nodemon
const jwt = require("jsonwebtoken");
const { log } = require("console");
const app = require("express")();
const dot = require("dotenv");
const fs = require("fs");
const PORT = 3333;
dot.config();

app.listen(PORT, () => {
  log("localhost:", PORT);
});

app.get("/", (req, res) => {
  fs.readFile("2_index.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

// ㅜ 로그인 시에 토큰 발급
app.post("/login", (req, res) => {
  const name = "서현진 배우님";

  // ㅜ 데이터 유출을 막기 위해 .env 파일을 사용함으로써
  // ㅜ 애플리케이션이 실행될 때 특정 값을 넘길 변수를 처음부터 저장해놓는다.
  const key = process.env.KEY;

  // ㅜ JWT 토큰 생성하는 함수
  const token = jwt.sign(
    {
      type: "JWT",
      name: name,
    },
    key,
    {
      expiresIn: "5m",
      issuer: "J",
    }
  );

  const data = {
    msg: "토큰 내용",
    token,
  };

  res.send(JSON.stringify(data));
});
