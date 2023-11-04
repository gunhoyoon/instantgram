import { useState, useEffect } from "react";

const useDebounce = (value: string, delay: number = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);

    // 입력이 들어와서 useEffect 가 실행이 되면, 해당 함수에 설정된 delay 초 후에
    // setTimeout 의 안에 있는 setDebounced 함수를 통해 debounced 의 값을 업데이트 시키고,
    // 이후 return 문을 통해 clearTimeout 함수를 사용해 이전에 설정했던 타이머를 제거함
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};
// 결국 debounced 의 값을 즉각적으로 업데이트 시키는게 아니라 설정해준 ms 가 지난 후에 업데이트를 시키고,
// debounced 를 리턴해주는 함수를 만들어주게 되는 것이다.

export default useDebounce;

// setTimeout ,clearTimeout
// setTimeout은 id값을 반환함.
// 해당 값을 clearTimeout 에 넣어줌으로 타이머를 취소 시킬 수 있음.
// 또 setTimeout 의 고유 id값을 반환함으로써
// 이후 중첩될 setTimeout 함수의 id값이 겹치지않게 보장된다.
