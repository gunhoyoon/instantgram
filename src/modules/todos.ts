// 액션 타입
const ADD_TODO = "ADD_TODO";

const REMOVE_TODO = "REMOVE_TODO";
const MODIFY_TODO = "MODIFY_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

// 액션 생성함수 = 액션만 뽑아주는 역할
let nextId = 1;
export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: {
    text,
  },
});

export const modifyTodo = (id: number, text: string) => ({
  type: MODIFY_TODO,
  payload: {
    id,
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
      return state.concat({
        id: ++nextId,
        text: action.payload.text,
        done: false,
      });
    // return state.concat(action.payload);

    // 추가됨
    case MODIFY_TODO:
      console.log(action, "action");
      // 수정할 원소 찾기
      // 원소 텍스트 변경
      // 반영

      // const modifyTarget = state.find((item) => item.id === action.payload.id);

      const modifyTargetIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (!state[modifyTargetIndex]) {
        return state;
      }
      // if (state[modifyTargetIndex]) {
      //   const deepCopy = JSON.parse(JSON.stringify(state[modifyTargetIndex]));
      //   deepCopy.text = action.payload.text;
      //   // 스플라이스 메서드로 기존 원소와 교체
      //   // state.splice(modifyTargetIndex, 1, deepCopy.text);
      //   // return state;
      // }
      const modifiedItem = {
        ...state[modifyTargetIndex],
        text: action.payload.text,
      };
      // 수정의 대상이 되는 객체를 찾아 얕은 복사를 하고 text의 값을 action.payload.text 로 바꾼걸 {새로운 객체로 감쌈}
      const newState = [...state];
      newState.splice(modifyTargetIndex, 1, modifiedItem);

      return newState;

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
