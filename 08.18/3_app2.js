// sequelize

// ㅜ 하위의 index.js 파일을 가져오려면 폴더 경로만 기재
const { sequelize, User } = require("./model/4_index");

// ㅜ 연산자를 사용하기 위해서
const { Op } = require("sequelize");

// ㅜ 첫 연결 시의 테이블 값 초기화 여부
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("연결");
  })
  .catch((err) => {
    console.log(err);
  });

// ㅜ 생성 쿼리문
// User.create({
//   name: "x",
//   age: 18,
//   msg: "x",
// });

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

// ㅜ 조회 쿼리문
async function select() {
  const user = await User.findAll({
    where: {
      age: { [Op.gte]: 18 },
      [Op.or]: [{ age: { [Op.gt]: 18 } }, { name: "x" }],
    },
    order: [["age", "DESC"]],
    //   limit: 1,
    //   offser: 1,
  });
  const temp = user.map((i) => i.dataValues);
  console.log(temp);
}

select();

// ㅜ 수정 쿼리문
User.update(
  {
    msg: "내용",
  },
  { where: { id: 1 } }
);

// ㅜ 삭제 쿼리문
User.destroy({
  where: { id: 1 },
});

// ㅜ 관계 쿼리문 join
