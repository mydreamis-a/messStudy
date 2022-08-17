// 08 16 화

// ㅜ express, dotenv, fs, jsonwebtoken, express-session, mysql2
const session = require("express-session");
const dot = require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const fs = require("fs");
const { log } = console;
const app = express();
const PORT = 7777;

// bcrypt
// 처음부터 단방향으로 암호화시켜 주는 함수 (4등분의 값)
// Algorithm: 알고리즘은 bcrypt ("$2a$")
// cost factor: 키 스트레칭의 횟수, 2^n 단위
// salt: 128 비트, 22자 base64로 인코딩
// hash: 솔트 기법과 키 스트레칭을 한 해시 값

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    //
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// ㅜ mysql 로컬 DB 연결 및 생성
const client = mysql.createConnection({
  //
  user: "root",
  password: "1234",
  database: "test0816",
  //
  // ㅜ 다중 쿼리문 사용 옵션
  multipleStatements: true,
});

// ㅜ 서버 객체 생성
app.listen(PORT, () => {
  //
  log("localhost:", PORT);
});

app.get("/", (req, res) => {
  //
  fs.readFile("view/2_login.html", "utf-8", (err, data) => {
    //
    res.send(data);
  });
});

app.get("/join", (req, res) => {
  //
  fs.readFile("view/3_join.html", "utf-8", (err, data) => {
    //
    res.send(data);
  });
});

// const sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), password VARCHAR(255), refresh VARCHAR(255))";
// ㅗ AUTO_INCREMENT PRIMARY KEY: 컬럼 값을 추가하지 않아도 자동으로 증가하는 숫자

// client.query(sql);

app.post("/join", (req, res) => {
  //
  // ㅜ req.body 객체의 키 값을 변수에 할당
  const { userId, userPw } = req.body;

  bcrypt.hash(userPw, 10, (err, data) => {
    //
    const sql = "INSERT INTO users (user_id, password)VALUES(?, ?)";

    client.query(sql, [userId, data], () => {
      //
      res.redirect("/");
    });
  });
});

app.post("/login", (req, res) => {
  //
  const { userId, userPw } = req.body;

  // ㅜ users 테이블에서 user_id 값으로 검색
  const sql = "SELECT * FROM users WHERE user_id=?";
  client.query(sql, [userId, userPw], (err, result) => {
    //
    // ㅜ 쿼리문이 실행되지 않을 때
    if (err) res.send("DB 연결 확인 필요");
    else {
      // ㅜ 로그인 성공 시 토큰 발급
      if (result[0]) {
        //
        bcrypt.compare(userPw, result[0]?.password, (err, same) => {
          if (same) {
            const accessToken = jwt.sign(
              {
                // ㅜ 유저 정보
                userId: result[0].user_id,
              },
              process.env.ACCESS_TOKEN,
              {
                expiresIn: "5s",
              }
            );

            const refreshToken = jwt.sign(
              {
                userId: result[0].user_id,
              },
              process.env.REFRESH_TOKEN,
              {
                expiresIn: "1m",
              }
            );

            // ㅜ user 테이블의 user_id 값으로 검색해서 refresh 값을 수정
            const sql = "UPDATE users SET refresh=? WHERE user_id=?";
            client.query(sql, [refreshToken, userId]);
            //
            req.session.access_token = accessToken;
            req.session.refresh_token = refreshToken;
            //
            res.send({ accessToken, refreshToken });
          }
          //
          else res.send("비밀 번호 오류");
        });
      }
      // ㅜ 아이디가 없거나 비밀번호가 다를 때
      else res.send("계정이 없습니다.");
    }
  });
});

// 미들웨어란
// 로그인이 된 상태에서 동작하는 페이지 같은 경우, 로그인의 유지 여부를 확인하고 요청을 보내야 한다.
// 따라서 클라이언트에게 온 요청의 목적에 맞게 응답을 처리해주려면 거쳐야 하는 중간 단계의 함수로서
// 요청의 응답에 도달하기 위해서는 미들 웨어를 통과해야 한다. (엑세스 권한)

// ㅜ req 객체 (요청), res 객체 (응답), next() 함수 이용
const middleware = (req, res, next) => {
  //
  const { access_token, refresh_token } = req.session;
  //
  jwt.verify(access_token, process.env.ACCESS_TOKEN, (err, acc_decoded) => {
    //
    if (err) {
      jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, ref_decoded) => {
        //
        // ㅜ refresh_token이 만료되었을 때
        if (err) res.send("다시 로그인 해주세요.");
        else {
          //
          const sql = "SELECT * FROM users WHERE user_id=?";
          client.query(sql, [ref_decoded.userId], (err, result) => {
            //
            if (err) res.send("DB 연결 확인 필요");
            else {
              //
              if (result[0].refresh === refresh_token) {
                //
                const accessToken = jwt.sign(
                  {
                    userId: ref_decoded.userId,
                  },
                  process.env.ACCESS_TOKEN,
                  {
                    expiresIn: "5s",
                  }
                );
                req.session.access_token = accessToken;
                //
                // ㅜ 다음 콜백으로 이동해서 요청 및 응답의 동작을 한다.
                next();
              }
              // ㅜ 서버와 PC의 refresh_token 값이 다를 때
              else res.send("다시 로그인 해주세요.");
            }
          });
        }
      });
    }
    //
    else {
      next();
    }
  });
};

app.get("/check", middleware, (req, res) => {
  res.send("로그인 되어 있습니다.");
});
