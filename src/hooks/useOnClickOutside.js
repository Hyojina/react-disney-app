import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // 안을 클릭했다면 return
      // - ref를 등록한 다음에만 클릭이 일어나게(즉, null인 경우에는 아무 동작이 일어나지 않도록)
      // - 또는, 이벤트 타겟이 ref의 내부에 있으면
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // 밖을 클릭했다면 handler 호출
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
