const Sql = require("sequelize");

// ㅜ User 클래스에 시퀄라이즈 모듈 안의 모델 객체의 기능을 상속시켜주기 위해서
class User extends Sql.Model {
  //
  // ㅜ static init 메서드의 매개 변수
  // ㅜ 1. 컬럼의 종류, 타입, 속성을 포함하여 테이블 생성 및 구성(매핑)
  // ㅜ 2. 객체로 전달할 테이블 자체에 대한 설정 값
  static init(sequelize) {
    //
    // ㅜ 상속 받은 부모의 함수 사용
    return super.init(
      {
        name: {
          //
          // ㅜ 시퀄라이즈 모듈 안에 있는 데이터 타입 사용
          type: Sql.STRING(20),
          allowNull: false,
          //
          // ㅜ 기본 키로의 설정 여부 (중복 불가)
          // ㅜ 반드시 필요 (기본은 id)
          // primaryKey: true,
          //
          // ㅜ 고유 키로의 사용 여부 (중복 불가, 주민 번호, 전화 번호)
          unique: true,
        },
        age: {
          type: Sql.INTEGER,
          allowNull: false,
        },
        msg: {
          type: Sql.TEXT,
          allowNull: true,
        },
        // ㅜ 생성 시간 필요 시 (또는 timestamps 사용)
        //   createde_at: {
        //     type: Sql.DATE,
        //     allowNull: false,
        //     //
        //     // ㅜ 기본 값 설정
        //     defaultValue: Sql.NOW,
        //   },
      },
      {
        sequelize,
        // ㅜ created_at, updated_at 기록
        timestamps: true,
        //
        // ㅜ 기본적으로 적용되는 카멜 표기법에서 스네이크 표기법으로의 변경 여부
        underscored: false,
        //
        // ㅜ 관계형 구성 시에도 사용
        modelName: "User",
        //
        // ㅜ 보통 모델 이름의 소문자 및 복수형으로 사용
        tableName: "users",
        //
        // ㅜ deleted_at 컬럼 생성 여부 (로우 값 존재)
        // ㅜ 로우를 조회하는 명령을 내렸을 경우 deletedAt의 값이 null인 로우를 조회한다.
        paranoid: false,
        //
        // ㅜ 한글 입력이 가능한 설정 (이모티콘: utf8md4, utf8md4_general_ci)
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // ㅜ 다른 모델과의 관계에 대해서 (mysql의 JOIN 기능)
  static associate(db) {
    // ㅜ 외래 키 사용 (foreignkey)
    // ㅜ 테이블의 1:N 관계 정의 (hasMany, belongsTo)
    // ㅜ hasMany (연결할 테이블, {연결할 테이블의 foreignKdy, foreignKey와 연결할 User 테이블의 sourceKey})
    db.User.hasMany(db.Post, { foreignKey: "user_id", sourceKey: "id" });
  }
}
module.exports = User;

// 간단히 User가 많은 댓글을 가질 수 있으니 User.hasMany가 되는 것이고,
// Comment는 한 User에 속할 수 있으니 Comment.belongsTo가 되는 것이다.
// 둘이 소통하는 키는 foreignKey인 commenter이며, User의 sourceKey는 곧 Commenter의 targetKey가 된다
// (hasMany에서는 sourceKey, belongsTo에서는 targetKey). foreignKey를 따로 지정하지 않는다면
// 이름이 모델명+기본 키인 컬럼이 모델에 생성된다. 즉, 예를 들어 위 예제에서 commenter를 foreignKey로
// 직접 넣어주지 않았다면 모델명인 user과 기본 키인 id가 합쳐진 UserId가 foreignKey로 생성된다.

// 1:1 관계 (hasOne, belongsTo)
// 1:1 관계에서는 hasMany 대신 hasOne을 사용한다. foriegnKey, sourceKey, targetKey의 사용법은 1:N 관계와 같다.
// 1:1 관계라고 하더라도 belongsTo와 hasOne이 반대이면 안된다. belongsTo를 사용하는 Info 모델에 UserId 컬럼을 추가되기 때문이다.

// N:M 관계 (belongsToMany)
// 시퀄라이즈에는 N:M 관계를 belongsToMany 메서드로 표현한다.
// 이 경우엔 어느 한 테이블이 어느 다른 테이블에 종속되는 관계가 아니다.
// 이 경우에, 예를 들어 Post 모델과 Hash 모델이 있다고 할 때, 다음과 같이 표현할 수 있다.
// N:M 관계의 특성상 새로운 모델이 다음과 같이 생성되며,
// through 속성에 그 이름을 적으면 된다. 새로 생성된 PostHash 모델에는 게시글과 해시태그의 아이디가 저장된다.
// Post
// db.Post.belongsToMany(db.Hash, { through: 'PostHash' });
// Hash
// db.Hash.belongsToMany(db.Post, { through: 'PostHash' })

// 시퀄라이즈에서 사용할 수 있는 데이터 타입
// https://pjt3591oo.github.io/sequelizejs_translate/build/html/CoreConcepts/DateTypes.html
