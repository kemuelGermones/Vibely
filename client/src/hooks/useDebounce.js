import { useEffect, useState } from "react";

function useDebounce(value) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
}

export default useDebounce;
