import { useMemo } from "react";

function usePages(data) {
  const pages = useMemo(() => {
    let result = [];
    if (data) {
      data.pages.forEach((page) => {
        result = result.concat(page);
      });
    }
    return result;
  }, [data]);

  return pages;
}

export default usePages;
