"use client";
import { createStore } from "redux";

// 리덕스에서 스토어를 생성해주는 함수, 단 하나의 스토어만 생성한다.

type Todo = {
  id: number;
  text: string;
};

const initialState = {
  counter: 0,
  text: "",
  list: [],
};

// 리덕스에서 관리 할 상태 정의

const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_INPUT = "CHANGE_INPUT";

const ADD_TO_LIST = "ADD_TO_LIST";

// 액션 타입 정의 , 주로 대문자로 작성

function increase() {
  return {
    type: INCREASE,
  };
}

const decrease = () => ({
  type: DECREASE,
});

// 작성이 간단하기에 화살표 함수로 쓰는 것을 추천한다고 하지만 문법적인 실수를 하지 않게 조심해야할듯

const changeInput = (text: string) => ({
  type: CHANGE_INPUT,
  text,
});

const addTodoList = (item: Todo) => ({
  type: ADD_TO_LIST,
  item,
});

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case CHANGE_INPUT:
      return {
        ...state,
        text: action.text,
      };
    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item),
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

console.log(store.getState());
// store 의 현재 상태 확인

const listener = () => {
  const state = store.getState();
  console.log(state);
};

const unsubsrcribe = store.subscribe(listener);
console.log(unsubsrcribe, "unsubsrcribe");

store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeInput("하이요"));
store.dispatch(changeInput("나를 통해서만 텍스트를 바꿀 수 있다."));
store.dispatch(addTodoList({ id: 1, text: "와우" }));
