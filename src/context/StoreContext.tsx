"use client";
import rootReducer from "@/modules";
import { composeWithDevTools } from "redux-devtools-extension";
import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";
type Props = {
  children: React.ReactNode;
};

const myLogger =
  (extraParameter: any) => (store: any) => (next: any) => (action: any) => {
    console.log(action, "actionacio");
    console.log(store, "store");
    setTimeout(() => {
      console.log(extraParameter);
    }, 1000);
    const result = next(action);
    return result;
  };

// function middleware(store) {
//   // console.log(store);
//   return function (next) {
//     // console.log(next);
//     return function (action) {
//       // 실제로 처리하고 싶은 작업
//       console.log(action);
//       return next(action);
//     };
//   };
// }

const store = createStore(
  rootReducer,
  // composeWithDevTools()
  composeWithDevTools(applyMiddleware(thunk, myLogger("하이"), logger))
  // logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
); // 데브툴스 +  여러개의 미들 웨어를 등록한 모습

export default function StoreContext({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
