// 08 17 수

// crypto
// 암호화

// 비밀 번호를 저장하는 방식
// 단방향은 복호화 해도 원래의 값을 알 수 없고 양방향은 알 수 있다.

// 대부분의 사이트에서 비밀 번호를 분실하면
// 원래의 비밀 번호를 알려주는 게 아니라 변경하게끔 한다.

// 복호화
// 암호문을 편문으로 변환 하는 과정

// 부호화 (인코딩)
// 데이터를 부호화 되기 전의 사람이 읽을 수 있는 형태로 되돌려 놓는 것

// 단방향의 비교 검증 방법
// DB에 저장된 암호와 로그인 시 입력 받은 비밀 번호를 단방향으로 암호화하여
// 암호화된 문자열로만 비교함으로써 기존의 비밀 번호를 저장하지 않는다.

// 단방향 암호화는 해쉬 알고리즘을 사용해서 고정된 길이의 문자열로 암호화시킨다.

// 알고리즘: md5, sha1, sha256, sha512...
// sha-512 알고리즘은 국가 안보국(NSA)이 설계한 암호 해쉬 함수로
// sha512sms 512비트(64바이트) 해시 값을 만들어주는데
// 일반적으로 128자리 길이의 16진수로 랜더링된다.

const { log } = console;

const crypto = require("crypto");
const pw = "SHJ";

// ㅜ 단순 해싱으로 비밀 번호 해싱
let hashAlgor = crypto.createHash("sha512");

// ㅜ 매개 변수의 값을 선택된 알고리즘으로 해싱
let hashing = hashAlgor.update(pw);

// ㅜ 인코딩할 알고리즘인 매개 변수 base64와 digest 함수로 해싱된 객체를 문자열로 반환
let hasString = hashing.digest("base64");
// log(hasString);

// 해쉬 알고리즘만 사용할 경우에 같은 값에 대해선 암호화된 문자열이 동일하다.
// 따라서 해커의 복호화를 방해하기 위해서 단방향 암호화 salt 기법을 사용한다.
// 비밀 번호에 추가 문자열을 덧붙여서 암호화 하면 같은 비밀 번호라도 해쉬 출력 값이 같지 않다.
// salt 값은 항상 비밀 번호에 추가해서 사용해야 하기 때문에 잘 보관해야 한다. (.env)

// ㅜ 크립트의 랜덤 바이트 생성 함수
// ㅜ 첫 번째 매개 변수는 바이트의 사이즈
crypto.randomBytes(32, (err, byte) => {
  //
  if (err) {
    // log(err);
  }
  //
  else {
    // log(byte);
  }
});

// randomBytes 함수로 DB에 salt 값을 저장한 후
// 모든 비밀 번호가 고유의 salt 값을 갖도록 할 수도 있다.

// 키 스트레칭으로 salt 값과 비밀 번호를 함수에 넣는 과정을 반복시킬 수도 있다.
// 계산량을 늘려서 값 출력을 임의적으로 느리게 하는 방법

// 암호화 모듈: pdkdf, scrypto, bcrypto

// pbkdf
// 해시 함수의 컨테이너 역할로서 해시 함수에 salt를 적용하고
// 해시 함수의 반복 횟수를 지정해서 암호화 할 수 있으며
// ISO 표준에 적합하고 NIST에서 승인된 알고리즘

// scrypt
// 많은 메모리와 CPU 소모되기 때문에 역효과로 부하가 발생할 수 있다.
// 오프라인 공격에 강력하지만 자원을 많이 사용하기 때문에 위험하다.
// OpenSSL 1.1 이상을 제공하는 시스템에서만 사용 가능하다.
// 주어진 자원에서 공격자가 사용할 수 있는 병렬 처리 양이 한정되어 있다.

// bcrypt
// 보안에 집착하기로 유명한 OpenBSD 뿐만 아니라
// .NET 및 자바를 포함한 모든 많은 플랫폼 언어에서도 사용할 수 있다.
// 반복 횟수를 늘려서 연산 속도를 늦출 수 있기 때문에
// 연산 능력이 증가해도 공객에 대비할 수 있다.
// 암호화된 String의 일부분을 salt로 사용하고 있기 때문에
// 그 데이터를 얻어온 후 pw와 같이 보내서 비교할 수 있다.

// crypto.randomBytes(32, (err, byte) => {
//   crypto.pbkdf2(
//     //
//     pw,
//     byte.toString("base64"),
//     // ㅗ인코딩 방식

//     // ㅜ 반복 횟수가 많을 수록 복호화의 난이도와 소요 시간이 증가한다.
//     99,
//     64,
//     // ㅗ 길이

//     "sha512",
//     // ㅗ 암호화 알고리즘 설정

//     (err, hashed) => {
//       log(hashed);
//     }
//   );
// });

// ㅜ salt 값 생성 함수
// ㅜ 시간 소요로 비동기 처리 (암호화)
const createSalt = () => {
  return new Promise((resolve, reject) => {
    //
    crypto.randomBytes(64, (err, byte) => {
      //
      if (err) reject(err);
      else resolve(byte.toString("base64"));
    });
  });
};

// ㅜ 비밀 번호 해싱 함수
const pwHashed = (userId, password) => {
  //
  return new Promise((resolve, reject) => {
    //
    const sql = "SELECT * FROM users WHERE user_id=?";
    client.query(sql, [userId], async (err, result) => {
      //
      if (result[0]?.salt) {
        //
        // ㅜ 해당 유저 객체 안의 salt 값
        const salt = await result[0].salt;
        //
        crypto.pbkdf2(password, salt, 999, 64, "sha512", (err, key) => {
          //
          if (key.toString("base64") === result[0].password) {
            resolve(key.toString("base64"));
          }
          //
          else reject("err");
        });
      }
      //
      else {
        reject("err");
      }
    });
  });
};

const createPwHashed = (passsword) => {
  //
  return new Promise(async (resolve, reject) => {
    //
    // ㅜ 랜덤 바이트 함수로 salt 생성
    const salt = await createSalt();
    crypto.pbkdf2(passsword, salt, 999, 64, "sha512", (err, key) => {
      //
      if (err) reject("err");
      else {
        //
        // ㅜ 비밀 번호마다 고유의 salt 값을 갖게 하고
        // ㅜ 암호화된 비밀 번호와 salt 값을 둘 다 DB에 저장
        resolve({ password: key.toString("base64"), salt });
      }
    });
  });
};

// ㅜ 암호화된 로그인
// ㅜ express, fs, mysql2
const express = require("express");
const mysql = require("mysql2");
const fs = require("fs");
const app = express();
const PORT = 4567;

app.listen(PORT, () => {
  log("localhost:", PORT);
});

app.use(express.urlencoded({ extended: false }));

const client = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "test0817",
  multipleStatements: true,
});

// const sql = `CREATE TABLE users
//     (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255),
//     password VARCHAR(255), salt VARCHAR(255))`;

// client.query(sql);

app.get("/", (req, res) => {
  const page = fs.readFileSync("view/3_join.html", "utf-8");
  res.send(page);
});

app.get("/login", (req, res) => {
  const page = fs.readFileSync("view/2_login.html", "utf-8");
  res.send(page);
});

app.post("/join", async (req, res) => {
  //
  const { password, salt } = await createPwHashed(req.body.user_pw);
  //
  const sql = "INSERT INTO users (user_id, password, salt) VALUES(?, ?, ?)";
  client.query(sql, [req.body.user_id, password, salt], () => {
    //
    res.redirect("/login");
  });
});

app.post("/login", (req, res) => {
  //
  const { user_id, user_pw } = req.body;
  pwHashed(user_id, user_pw)
    //
    .then((result) => {
      res.send(result + "로그인 완료!");
    })
    //
    .catch((err) => {
      res.send(err);
    });
});
