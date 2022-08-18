const Sequelize = require("sequelize");

// ㅜ sequelize 모듈을 확장한 user 클래스
class User extends Sequelize.Model {
  //
  // ㅜ init 함수에서 테이블 설정
  static init(sequelize) {
    //
    // ㅜ 테이블 컬럼에 대한 설정
    return super.init(
      {
        //
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
          //
          // ㅜ 고유 키: 반드시 입력해야 할 필요는 없다. (primarykey 기본 키와의 차이점)
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNullL: false,
        },
        msg: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      // ㅜ 테이블 자체의 설정
      {
        // ㅜ init 함수의 매개 변수를 연결시켜주는 옵션
        sequelize,
        //
        // ㅜ 생성 시간과 수정 시간의 자동 입력 여부 (createdAt, updateAt)
        timestamps: true,
        //
        // ㅜ 테이블명과 컬럼명에 대하여 카멜 표기법에서 스네이크 표기법으로 변경 여부
        underscored: false,
        //
        // ㅜ 모델의 이름 설정
        modelName: "User",
        //
        // ㅜ 실제 DB에 등록되는 이름, 보통 모델 이름의 소문자 및 복수형으로 사용
        tableName: "users",
        //
        // ㅜ 삭제 시간에 대한 deleteAt 컬럼의 추가 여부 (컬럼이 삭제되지 않음)
        paranoid: false,
        //
        // ㅜ 한글 입력이 가능한 설정 (이모티콘: "utf8md4, utf8md4_general_ci")
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // ㅜ 다른 모델과의 관계 (mysql의 JOIN 기능)
  static associate(db) {}
}

module.exports = User;
