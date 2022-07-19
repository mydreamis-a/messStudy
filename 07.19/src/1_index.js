// @ts-check
// 타입 체크: 최상단에 기재해야 함

// 07 19 화

// npm 설치 관련 formatting, Linting 설정
// node 프로젝트를 작업하다 보면 예상하지 못한 오류가 생겼을 때 찾아내기가 힘든데
// 런타임 코드를 이용자에게 전달하기 전에 문제를 잡아준다.

// Prettier - Code formatter 확장 프로그램 설치

// formatting을 해주는 Prettier 패키지 설치 명령어
// npm install --save-dev prettier
// --save-dev로 받은 패키지는 devDependencies에 작성된다. (개발 환경에서만 사용, 실제 구동에는 필요 없음)

// npm 패키지를 설치하면 package.json에 내용이 추가되는 데 그 역할은
// 메타 데이터를 비롯해서 현재 프로젝트가 사용하는 의존성 내용의 나열에 있다.

// node_modules 폴더
// .bin 폴더는 컴퓨터가 이해할 수 있는 컴퓨터의 언어가 담긴 텍스트 파일 (바이너리 파일)
// 나머지 폴더는 현재 프로젝트가 의존하고 패키지들

// node_modules 폴더는 git에 따로 업로드하지 않고
// package.json만 업로드한 후 npm i나 npm install로 설치 후 작업한다.

// package.json의 패키지 버전 앞에 ^ 기호는 버전이 정확하지 않아도 설치해주기 때문에
// package-lock.json 파일을 서로 공유해야 버전이 맞지 않는 문제를 해결할 수 있다.

// package-lock.json에는 실제로 설치된 패키지에 대한 내용이 기록되어 있기 때문에
// 팀 프로젝트 시 같이 업로드 해주는 것이 좋다.

// .prettierrc 파일 생성 (필수)
// {
//     "semi": true,
//     "singleQuote": false
// }
// rc: runtime configuration, run control, run commands, runcom, resource control..

// .vscode 폴더 생성 후 그 안에 settings.json 파일 생성 (필수)
// {
//     "[javascript]": {
//         "editor.formatOnSave": true,
//         "editor.defaultFormatter": "esbenp.prettier-vscode"
//     }
// }

// 개인이 사용하는 vscode의 설정이 아닌 프로젝트 단위로 설정해서 작업할 경우
// 병합 시의 충돌을 덜어준다. (단 폴더의 최상단에 있어야 한다.)

// package.json 파일 (필수)

// Linting
// ESLint 확장 프로그램 설치

// ESLint 패키지이자 플러그인 설치 명령어
// npm install --save-dev eslint
// package-lock.json 파일 안에 두 모듈 간의 연결에 대한 의존성이 생성된다. (서브 디펜던시)

// eslint 설정 파일로 .eslintrc.js 파일 생성
// module.exports = {
//     extends: ["airbnb-base", "prettier"],
//   };

// 유명한 air bnb의 설정을 사용하자.
// https://github.com/airbnb/javascript

// air bnb 패키지 설치 명령어
// npm install --save-dev eslint-plugin-import
// npm install --save-dev eslint-config-airbnb-base
// npm install --save-dev eslint-config-airbnb-base eslint-plugin-import (동시 다운)
// npm install --save-dev eslint-config-prettier

// prettier와의 충돌이 발생하면
// extends에 "prettier" 규칙도 같이 적용해주면 된다.

// node 전용 플러그인 설치 명령어
// npm install --save-dev eslint-plugin-node

// MySQL Workbench 다운로드
// https://shinysblog.tistory.com/20
// C:\Program Files\MySQL\MySQL Server 8.0\bin
// 내 PC - 속성 - 고급 시스템 설정 - 시스템 속성 - 고급 - 환경 변수 - 시스템 변수 - 변수 - Path - 편집 - 새로 만들기 - bin 폴더 경로 주소 붙여넣기 - 확인

// CMD 관리자 권한으로 실행
// mysql -u root (유저 이름) -p
// 설치 시 설정했던 password 입력

// 현재의 DB 리스트를 확인하는 명령어
// show databases;

// DB를 생성하는 명령어
// CREATE DATABASE (테이블 명) CHARACTER SET utf8;

// 사용할 DB를 선택하는 명령어
// use DB 명;

// 테이블의 컬럼을 추가하는 쿼리문
// INSERT INTO `DB 명`.`테이블 명` (`id`, `content`) VALUES ('1', '안녕');

// 테이블의 컬럼을 삭제하는 쿼리문
// DELETE FROM `DB 명`.`테이블 명` WHERE (`id` = '1');

// 테이블의 컬럼을 수정하는 쿼리문
// UPDATE `DB 명`.`테이블 명` SET `id` = '0', `content` = '안녕' WHERE (`id` = '1');

// MySQL - CRUD 명령어 (CRUD Commands)
// https://lgphone.tistory.com/85

// 07 19 19 수정
