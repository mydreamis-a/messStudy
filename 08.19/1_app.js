// 08 19 금

// 관계형 DB
// swquelize 및 FOREIGN KEY 사용

// 시퀄라이즈는 ORM (object relational mapping) 라이브러리로
// 객체와 DB를 매핑하여 JS 코드만으로 SQL 제어가 가능하다.
// (가독성, 재사용 및 유지 보수)

// MVC 패턴 (model view controller)
// 웹에서 가장 기본적인 디자인 패턴
// 시퀄라이즈 모델, 보여줄 파일, app.js, 라우터

// path
// 기본 경로를 다룰 수 있게 도와주는 내장 모듈

// ㅜ express, ejs, path, sequelize, mysql2
// ㅜ mysql2 모듈은 설치는 필수이지만 가져오지는 않아도 된다.
// ㅜ 다른 파일에서 객체 가져올 때 폴더 경로만 적으면 index 파일이 해당된다.
const { sequelize, User, Post } = require("./model/6_index");
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const { log } = console;
const app = express();
const PORT = 3000;

// ㅜ 연산자를 사용하기 위해서
const { Op } = require("sequelize");

app.listen(PORT, () => {
  log("localhost:", PORT);
});

// ㅜ path.join('a', 'b') => a/b
// ㅜ 매개 변수로 받은 문자열을 주소처럼 합쳐서 문자열 형태로 반환
// ㅜ 키 값 views 키 값에 렌더링할 파일들을 모아둔 폴더의 주소 저장 (기본 값은 views)
// ㅜ __dirname: 현재 파일의 경로
app.set("views", path.join(__dirname, "view"));

// ㅜ html의 뷰 엔진을 ejs 랜더링 방식으로 변경
app.engine("html", ejs.renderFile);

// ㅜ html 랜더링 시에 뷰 엔진 설정 사용
app.set("view engine", "html");

// ㅜ app.set으로 저장한 값 확인
// log(app);

app.use(express.urlencoded({ extended: true }));

sequelize
  // ㅜ sync: DB 동기화 시 필요한 테이블 생성 후 매핑 (비동기)
  // ㅜ force: 첫 연결 시 테이블 값의 강제 초기화 여부
  .sync({ force: false })
  //
  .then(() => {
    log("DB 연결");
  })
  .catch((err) => log(err));

app.get("/", (req, res) => {
  //
  res.render("2_create");
});

app.post("/create", (req, res) => {
  //
  const { name, age, msg } = req.body;
  //
  // ㅜ JS 구문으로 객체를 전달해서 SQL의 해당 테이블에 컬럼 추가
  const create = User.create({
    name: name,
    age: age,
    msg: msg,
  });
});

app.get("/user", (req, res) => {
  //
  // ㅜ 전체 유저 조회 (빈 객체로 조건 없이)
  // ㅜ findAll(검색할 옵션)
  // ㅜ 비동기 처리
  User.findAll({})
    //
    .then((e) => {
      res.render("3_post", { data: e });
    })
    .catch(() => {
      res.render("err");
    });
});

app.post("/create_post", (req, res) => {
  const { name, text } = req.body;
  //
  User.findOne({
    where: { name: name },
    //
  }).then((e) => {
    Post.create({
      msg: text,
      //
      // ㅜ foreignKey: user_id
      user_id: e.id,
    });
  });
});

app.get("/view/:name", (req, res) => {
  User.findOne({
    //
    where: { name: req.params.name },
    include: [{ model: Post }],
    //
  }).then((e) => {
    e.dataValues.posts = e.dataValues.posts.map((i) => i.dataValues);
    //
    const posts = e.dataValues;
    res.render("4_view", { data: posts });
  });
});

app.post("/view_update", (req, res) => {
  const { id, msg, text } = req.body;
  //
  Post.update({ msg: text }, { where: { id, msg } });
});

app.get("/del/:id", (req, res) => {
  //
  Post.destroy({ where: { id: req.params.id } }).then(() => {
    res.redirect("/user");
  });
});

// attributes: 원하는 컬럼
// where: 검색 조건 설정
// order: 생성 순서 정렬, DESC, ASC
// limit: 조회 개수
// offset: 스킵 개수

// Op.gt (greater than, 초과),
// Op.gte (greater than or equal to, 이상),
// Op.lt (less than, 미만),
// Op.lte (less than or equal to, 이하),
// Op.ne (not equal, 같지 않음),
// Op.or (or, 또는),
// Op.in (in, 배열 요소 중 하나),
// Op.notIn (not in, 배열 요소와 모두 다름) 등이 있다.
