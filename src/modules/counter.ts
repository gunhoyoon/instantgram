interface Action {
  type: string;
  diff: any;
}

// 액션 타입 생성 / 오타 방지 / 이름 중복 방지

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// 액션 생성함수
// export const setDiff = (diff: any) => ({ type: SET_DIFF, diff });
export const increase = (n: number) => ({ type: INCREASE, payload: n });
export const decrease = (n: number) => ({ type: DECREASE, payload: n });

// 초기 상태
const initialState = {
  number: 0,
  // diff: 1,
};

// 리듀서
export default function counter(state = initialState, action: any) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        number: state.number + action.payload || 1,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - action.payload || 1,
      };
    default:
      return state;
  }
}
