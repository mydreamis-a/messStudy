// 08 08 월

// 쿠키나 세션을 사용하는 이유는 데이터나 인증(권한)을 유지하기 위해서
// 쿠키는 PC에 남아있는 반면 세션은 웹을 종료 시 삭제된다.

// 쿠키
// 웹 사이트를 방문 시에 사용자의 컴퓨터에 기록되는 데이터
// 클라이언트 상태 정보를 PC에 저장함으로써 재사용이 가능하다.\
// ex. 웹 페이지 팝업 창의 오늘은 보지 않기 기능, 자동 로그인 기능

// 쿠키의 특징
// 쿠키 하나당 4KB까지 저장 가능하며
// 하나의 도메인당 20개의 쿠기를 가질 수 있고
// 클라이언트에 총 300개까지 저장할 수 있다.

// 이름, 값, 유효 기간, 경로 정보로 구성되어 있다.
// url의 /루트 경로에서 사용하는 쿠키와 /user 경로에서 사용하는 쿠키를 따로 관리할 수 있다.
// 키 값과 값이 존재하며 유효기간은 DATE 객체로 언제까지 유지할 지를 설정한다.

// 쿠키의 구조는 객체처럼 키와 값이 문자열로 저장되어 있어
// 키 값으로 접근해서 쿠키의 값을 가져올 수 있다.

// 쿠키의 경로 (path)
// 도메인 하위로 하위 쿠기 경로를 지정할 수 있다.
// (쿠기 갯수가 적을 경우에는 대부분 루트만 사용)

// 만료일 (expires)
// GMT 시각 (문자열)
// 쿠키는 삭제하는 기능이 없기 때문에 이전 만료일을 지정해줌으로써 만료시켜준다.
// 개인 정보 및 보안 문제를 위해 민감한 데이터는 절대 1년을 넘기면 안 되며
// 1~3개월 정도로 가능한 짧게 설정하는 것을 추천한다.

// ㅜ 쿠키 생성 함수
const createCookie = (name, value, time) => {
  const date = new Date();
  // ㅜ 생성한 시간으로부터 time의 일수가 지난 시간
  date.setTime(date.getTime() + time * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + value + ";expires" + date.toUTCString() + ";path=/";
};

// ㅜ name에 일치하는 쿠키의 값을 가져오는 함수
const getCookie = (name) => {
  const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
};

// ㅜ 쿠키의 유무를 확인하는 함수
const isActiveCookie = (key) => {
  return getCookie(key) != null ? true : false;
};

// ㅜ 쿠키를 만료시키는 함수
const isDeleteCookie = (key) => {
  document.cookie = key + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};
