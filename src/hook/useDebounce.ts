import { useState, useEffect } from "react";

const useDebounce = (value: string, delay: number = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    // 입력이 들어와서 useEffect 가 실행이 되면, 해당 함수에 설정된 delay 초 후에
    // setTimeout 의 안에 있는 setDebounced 함수를 통해 debounced 의 값을 업데이트 시키고,
    //
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};

export default useDebounce;
