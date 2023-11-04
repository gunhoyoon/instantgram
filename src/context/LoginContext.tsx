"use client";
import React, { useContext } from "react";
import { createContext } from "react";

type Props = {
  children: React.ReactNode;
};

type LoginStateType = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginStateContext = createContext<LoginStateType>({
  isLogin: false,
  setIsLogin: () => {},
});
//<LoginStateType | undefined>  해당 타입은 초기값이 확실하게 있는데 undefined 가 나올 수가 없는 타입. 차라리 null은 몰라도

export default function LoginContext({ children }: Props) {
  const [isLogin, setIsLogin] = React.useState(false);
  return (
    <LoginStateContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginStateContext.Provider>
  );
}

export const useLoginStateContext = () => useContext(LoginStateContext);

// creact context가 뭔지
//  왜 초기값을 useState , value , setFunction 으로 사용하는지
// useContext 는 뭔지
// export const useLoginStateContext = () => useContext(LoginStateContext); 왜 이렇게 써야하는지
//블로그 보고 정리
// useContext , context api
// context api 내려주는 값 변화
// context api 와 props의 렌더링 차이
