import { Action, InitType } from "@/model/type/todos";

// 액션 타입
const ADD_TODO = "ADD_TODO";

const REMOVE_TODO = "REMOVE_TODO";
const MODIFY_TODO = "MODIFY_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

// 액션 생성함수 = 액션만 뽑아주는 역할

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

const initialState: InitType[] = [];

// 리듀서
let nextId = 0;
export default function todos(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat({
        id: ++nextId, // 정해져있는
        text: action?.payload?.text,
        done: false, // 정해져있는 사용자의 입력이 따로 필요없거나
      });
    // return state.concat(action.payload);
    // 액션에서 어떠한 연산 X , 페이로드는 필요한 것만 ,

    case MODIFY_TODO:
      // 수정할 원소 찾기
      // 원소 텍스트 변경
      // 반영

      // const modifyTarget = state.find((item) => item.id === action.payload.id);

      const modifyTargetIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      // 내가 수정할 요소 선택

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
        ...state[modifyTargetIndex], // 스테이트에서 내가 바꿀 인덱스 찾아서 복사함
        text: action.payload.text, // 그 찾은 친구 텍스트를 액션으로 넘겨받은 텍스트로 바꿔줄거임
      };

      const newState = [...state]; // 전체 스테이트 복사해서 새로운 변수에 담음
      newState.splice(modifyTargetIndex, 1, modifiedItem); // 선택한 요소 한개 텍스트 받아온 애랑 바꿔치기 할거임

      // 기존 객체를 변경하는게 아니라 새로운 객체를 만들어 내부 속성을 변경해주고 있음

      return newState;

    // 추가가 아니라 기존에 데이터를 수정만 함

    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload.id);

    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo
      );
    default:
      return state;
  }
}
