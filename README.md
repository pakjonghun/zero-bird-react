## 제로초 인프런 강좌를 듣고 따라하기 했습니다.

### version

next : 9,
node : 14,
next-redux-wrapper : 6

### 작업순서

- 1118 : SSR SPA CSR NEXT 사용 이유 개념 정리, next로 프론트 서버 띄워봄
- 1119 : anyd styled-components 이용 쉽게 디자인함, 기타 eslint 설치
- 1120 : antd 이용 loginForm, userForm 추가(라이브러리가 react 방식이 아니라 다시 그린다면 간섭이 안일어나게!!)
- 1121 : signup page 추가(antd 사용법 연습, 커스텀 훅 복습)
- 1122 : redux 적용 액션 적용한 로그인 로그아웃(redux, react-redux, next-redux-wrapper,redux-devtools-extention)
- 1125 : 포스트 Add 기능 추가(redux)
- 1126 : 댓글 기능 작성중(80%), antd 에 너무 매달리지 말자. 공식문서 보고 빠르게 작성!
- 1127 : 댓글기능 작성(완료), 포스트 이미지 css(80%)
- 1128 : redux-saga 설치 및 이해 연습(sagas 만 작성)
- 12.1 : redus-saga trace 툴 적용, saga reducer 리팩토링
- 12.2 : immer 도입(처음엔 어색했는데 이거 편하다. \_ 보다 더 간결하다.)
- 12.3
  - redux-toolkit 슬라이스가 너무 인상적이었다. 아직 적용은 안했따 immer create action 이랑 다 미리 적용 해놔서 더 수정할 것이 너무 많았기 때문에다. 처음부터 tool-kit 을 적용 했어야 했는데...
  - 그리고 react-virtualize 는 버전충돌로 설치가 안되었다. 이건.. 해결방뻡을 찾아야 할듯 하다.
  - 스크롤 이벤트가 2번 연속 실행이 되서 이벤트를 붙일때 useLayoutEffect 를 사용해서 해결했다.
