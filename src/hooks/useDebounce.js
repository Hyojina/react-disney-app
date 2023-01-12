import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 특정한 시간이 지난 후 호출하고 싶을 때, setTimeout
    // setTimeout은 할당만 해도 실행이 됩니다!!!
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // return에서 clearTimeout을 안해주면?
    // 딜레이만 있을 뿐, 검색어 한글자마다 계속 요청감
    return () => {
      clearTimeout(handler);
    };

    // 값이 바뀌거나 딜레이타임이 변할 때 다시 실행
  }, [value, delay]);

  return debouncedValue;
};
