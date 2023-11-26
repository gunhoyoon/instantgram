import { AnyAction, Dispatch } from "redux";

interface Action {
  type: string;
  diff: any;
}

// 액션 타입 생성 / 오타 방지 / 이름 중복 방지

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// 액션 생성함수
// export const setDiff = (diff: any) => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE }); // 반환값이 객체 ,  타입 자체는 함수
export const decrease = () => ({ type: DECREASE });

// thunk 함수

export const increaseAsync =
  (): ((dispatch: Dispatch<AnyAction>) => void) => (dispatch) => {
    setTimeout(() => {
      dispatch(increase());
    }, 1000);
  };
export const decreaseAsync =
  (): ((dispatch: Dispatch<AnyAction>) => void) => (dispatch) => {
    setTimeout(() => dispatch(decrease()), 1000);
  };

// 초기 상태
const initialState = 0;

// 리듀서
export default function counter(state = initialState, action: CounterAction) {
  switch (action.type) {
    case INCREASE:
      // setTimeout(() => {
      //   console.log("Delayed for 1 second.");
      // }, 1000);
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
