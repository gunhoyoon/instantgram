import { Middleware } from "redux";

const myLogger: Middleware = (store) => (next) => (action) => {
  console.log(action); // 액션 출력
  const result = next(action); // 다음 미들웨어가 있다면 미들웨어, 없다면 리듀서에게 액션을 전달함
  // next(action) 이 반환하는 값이 없다면 undefined
  console.log(store.getState()); // 업데이트 된 이후의 상태가져오기
  return result; // 여기서 반환하는 값은 dispatch(action) 의 결과물이 됩니다.
};

export default myLogger;
