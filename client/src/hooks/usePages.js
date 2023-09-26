import { useState, useEffect } from "react";

function usePages(data) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (data) {
      const result = data.pages.reduce((prev, next) => [...prev, ...next]);
      setPages(result);
    }
  }, [data]);

  return { pages, setPages };
}

export default usePages;
