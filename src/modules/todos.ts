// 액션 타입
const ADD_TODO = "ADD_TODO";

const REMOVE_TODO = "REMOVE_TODO";
const MODIFY_TODO = "MODIFY_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

// 액션 생성함수
let nextId = 1;
export const addTodo = (text: string, done: boolean) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextId,
    text,
    done,
  },
});

export const modifyTodo = (text: string) => ({
  type: MODIFY_TODO,
  payload: {
    text,
  },
});

export const removeTodo = (id: number) => ({
  type: REMOVE_TODO,
  payload: { id },
});

export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  payload: { id },
});

// 초기 상태

const initialState = [
  {
    id: 1,
    text: "리덕스를 정복하자",
    done: false,
  },
];

// 리듀서

export default function todos(state = initialState, action: any) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.payload);

    // 추가됨
    case MODIFY_TODO:
      return {
        ...state,
        text: action.payload.text,
      };

    // 추가가 아니라 기존에 데이터를 수정만 함

    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload.id);

    case TOGGLE_TODO:
      console.log(action, "action");
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo
      );
    default:
      return state;
  }
}
