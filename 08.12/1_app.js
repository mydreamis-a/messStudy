// 08 12 금

// JWT 토큰: Access Token, Refresh Token

// 로그인 검증 시 Access Token만 사용하는 방식
// 1. 이용자가 로그인을 시도하면
// 2. 서버는 이용자 확인 후 JWT 토큰 인증 정보를 payload에 할당하고 생성한다. (입장권)
// 3. 생성한 토큰을 클라이언트에 반환해줌으로써 클라이언트가 갖고 있게 된다.
// 4. 클라이언트에서 권한을 인증 요청할 때 Access Token을 전달한다.
// 5. 서버는 인코딩 되어 있는 payload의 값을 디코딩하여 사용자의 권한을 확인하고 데이터를 반환한다.
// 6. 토큰이 정상적인지 확인하고
// 7. 날짜가 지난 토큰일 경우 다시 로그인하게 함로써 토큰을 재발급 받게 한다.

// Refresh Token
// Access Token만 사용할 경우 다른 사람이 악의적으로 토큰을 취득했을 때
// 토큰의 유효 기간이 만료되기 전까지는 막을 수 없는 등 인증 보안에 취약할 수 있다.
// 그렇다고 Access Token의 유효 기간을 짧게 설정하면 이용자가 계속 해서 로그인을 해야 하는 상황이 발생한다.
// 따라서 Access Token의 유효 기간이 만료되었을 때 갱신해주는 역할의 Refresh Token으로 유효 기간을 길게 설정해주는데
// 보통 Access Token이 30분일 경우, Refresh Token은 하루 정도로 설정한다.

// 해커가 Access Token을 얻었을 때는 로그인이 이미 되어 있는 상태가 막기가 힘들기 때문에
// Access Token의 유효 기간을 짧게 설정하고 Refresh Token을 길게 설정함으로써
// 이용자가 로그인을 자주 해야 하는 불편함을 보완해주면서도
// refresh Token을 통해 Access Token을 갱신시키는 역할을

// Access Token + Refresh Token 사용 방식
// 1. 이용자가 로그인을 시도하면
// 2. 서버는 이용자 확인 후 JWT 토큰 인증 정보를 payload에 할당하고 생성한다. (입장권) Refresh Token도 생성 후 서버에 저장한다.
// 3. 생성한 토큰을 클라이언트에 반환해줌으로써 클라이언트가 갖고 있게 된다.
// 4. 클라이언트에서 권한을 인증 요청할 때 Access Token을 전달한다.
// 5. 서버는 인코딩 되어 있는 payload의 값을 디코딩하여 사용자의 권한을 확인하고 데이터를 반환한다.
// 6. 토큰이 정상적인지 확인하고
// 7. 날짜가 지난 토큰일 경우 다시 로그인하게 함로써 토큰을 재발급 받게 한다.
// (만료된 Access Token과 Refresh Token을 헤더에 실어서 서버에게 보낸다.)
// 8. 서버는 Access Token과 Refresh Token을 확인하고 Refresh Token이 만료되지 않았으면 새로운 Access Token을 발급해서 클라이언트에 전달한다.

// ㅜ dotenv, express, cookie-parser, jsonwebtoken, fs
const cookie = require("cookie-parser");
const dot = require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const { log } = require("console");
const fs = require("fs");
const app = express();
const PORT = 5555;

app.listen(PORT, () => {
  log("localhost:", PORT);
});

// ㅜ body 객체를 사용하기 위해
app.use(express.urlencoded({ extended: false }));

// ㅜ 헤더에 쿠키를 추가하기 위해
app.use(cookie());

const user = {
  id: "J",
  pw: "J",
};

app.get("/", (req, res) => {
  //
  fs.readFile("view/2_login.html", "utf-8", (err, data) => {
    //
    log(err);
    res.send(data);
  });
});

app.post("/login", (req, res) => {
  //
  const { userId, userPw } = req.body;
  if (userId === user.id && userPw === user.pw) {
    //
    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "5m",
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );

    // ㅜ 쿠키의 이름과 유효 시간(1일)을 매개 변수로 전달
    res.cookie("refresh", refreshToken, { maxAge: 24 * 60 * 60 * 1000 });
    //
    fs.readFile("view/2_join.html", "utf-8", (err, data) => {
      res.send(accessToken + data);
    });
    //
  } else return res.send("아이디 혹은 비밀번호 불일치!");
});

app.post("/refresh", (req, res) => {
  //
  // ㅜ req.cookies?.refresh 키 값이 없어도 크래쉬 방지
  if (req.cookies?.refresh) {
    //
    const refreshToken = req.cookies.refresh;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decode) => {
      //
      if (err) {
        res.send("다시 로그인 해주세요.");

        // ㅜ 정상적인 토큰이면 다시 Access Token 발급
      } else {
        const accessToken = jwt.sign(
          {
            id: user.id,
          },
          process.env.ACCESS_TOKEN_KEY,
          {
            expiresIn: "10m",
          }
        );
        //
        res.send(accessToken);
      }
    });
    //
  } else {
    res.send(accessToken);
  }
});
