import { useMemo } from "react";

function usePages(value) {
  const pages = useMemo(() => {
    if (value) {
      return value.pages.reduce((prev, next) => [...prev, ...next]);
    }
    return new Array();
  }, [value]);

  return pages;
}

export default usePages;
