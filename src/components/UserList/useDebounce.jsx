import { useEffect, useState } from "react";

function UseDebounce(value, delay) {
  const [data, SetData] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      SetData(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return data;
}

export default UseDebounce;
