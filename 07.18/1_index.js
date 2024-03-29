// 07 18 월

// NODE.JS란
// 2009년에 라이언 달 이라는 개발자가 처음 만들었고 지금까지 업데이트가 잘 되고 있다.

// 크롬 v8 자바스크립트 엔진으로 빌드된 자바스크립트 런타입으로
// 브라우저가 아니라 서버에서 자바스크립트가 동작하도록 도와주는 런타입 플랫폼이라고 할 수 있다.
// 자바스크립트를 사용해서 데이터베이스에 연결해 서버로 요청을 보내는 기능을 구현할 수 있다.
// node.js는 아파치 같은 웹 서버 자체가 아니라 서버의 로직들을 구현할 수 있게 만들어주는 것이다.

// node.js에 있는 라이브러리: npm (node package manager)

// 특징 3
// 자바스크립트로 백엔드 서버 로직을 개발할 수 있다.
// 구글에서 개발한 js 엔진을 사용하기 때문에 속도가 빠르다. (인터프리터 방식)
// 논 블로킹 방식으로 모든 API는 비동적으로 작동하며 호출 후 다른 API를 바로 불러 올 수 있다.
// (한 번 불러왔던 API를 요청하면 이벤트 루프가 확인해서 동작)

// 방대한 오픈 소스 생태계를 구축하기 위해 사용하며
// npm(node package manager)을 사용해서 패키지들을 다운 받을 수 있다.
// 리액트, 익스프레스, 코아 등 익숙한 패키지들은 모두 npm에 등록되어 있고
// 거의 대부분의 기능이 이미 나와있기 때문에 빠른 효과를 기대할 수 있다.

// 모듈 방식의 작업 (작은 기능들의 집합)
// 패키지는 클래스의 묶음이고, 패키지의 모임이 모듈이라고 할 수 있다.

// 자동 완성: ctrl + space bar

// node.js에서 모듈을 가져오는 방법 (require 함수 사용)

// ㅜ require (경로나 이름)
const http = require("http");

// ㅜ http 객체 안에 createServer 함수를 사용해서 서버를 만듬
// ㅜ 함수를 실행시키는데 변수에 담는다는 것은 반환값이 있다는 것
const server = http.createServer((req, res) => {
  // ㅜ req 요청값 (http에서 ok를 나타내는 번호가 200번)
  req.statusCode = 200;
  // http 상태 코드
  // 100번대: 정보 응답
  // 200번대: 성공 응답
  // 300번대: 리다이렉션 메세지, 요청한 URL이 변경되었을 때
  // 400번대: 클라이언트상의 오류
  // 500번대: 서버 오류 응답

  // ㅜ write 문자를 보내주는 함수
  res.write("123");
  res.end("456");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("port: ", PORT);
});

// server 객체의 준비가 되면 listen 함수로 해당 포트에 웹 서버를 대기시킨다.
// 웹 서버를 대기시키는 이유는 클라이언트에서 요청이 오면 웹 서버가 받아서 처리할 수 있기 때문이다.
// 매개 변수: (포트 번호, 호스트의 이름, 백로그, 콜백 함수)

// node.js 실행하는 법
// node 자바스크립트 파일의 경로 (node 07.18/1_\ index.js)
// ls: 경로 확인

// 코드 샌드박스, glitch 등등: 노드 서버를 바로 볼 수 있고 코딩을 바로 테스트해볼 수 있다.

// glitch 장점
// https 검증까지 되어 있는 웹 서버를 테스트로 사용해볼 수 있다.
// server.js에 서버 로직을 작성하고 preview 버튼을 통해 화면을 확인할 수 있고
// 다운로드 링크가 필요할 경우에는 preview in a new window 버튼을 통해
// 클라이언트 요청을 보내볼 웹 서버 주소로 접속이 가능하기 때문에 테스트에 용이하게 사용할 수 있다.

// 버전 관리하는 방법
// 서버 노드는 최신 버전인데 로컬 노드가 구 버전인 경우
// 최신 버전에는 기능이 있는데 구 버전에는 없는 경우 기능이 실행되지 않는다.
// nvm(node version manager) 사용

// https://github.com/coreybutler/nvm-windows/releases
// ㅗ nvm-setup.zip 설치

// ㅜ 이전 버전 확인
// https://nodejs.org/ko/download/releases/

// CMD 명령어
// nvm -v: nvm이 잘 설치 되어 있는 지 버전 확인
// nvm ls: nvm에 설치 되어 있는 버전 확인
// nvm install v해당 버전: node의 변경할 버전 설치
// nvm use v바꿀 버전: node의 설치된 버전을 적용
// state 오류가 발생할 때는 cmd를 관리자 권한으로 실행해야 한다.

// 07 19 19 수정
