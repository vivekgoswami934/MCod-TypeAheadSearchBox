import { useEffect, useState, useCallback } from "react";

const useFetch = (
  query,
  transformData,
  promise,
  debounceWait,
  autoComplete
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchData = useCallback(
    debounce(async (query, transformData, signal) => {
      try {
          console.log("fetching data...");
        const response = await promise(query, signal);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        console.log(data);
        setData(transformData(data));
      } catch (e) {
        console.log(e);
        if (!signal.aborted) setError(e);
      }
    }, debounceWait),
    []
  );

  useEffect(() => {
    if (!query || !autoComplete) {
      setData(null);
      setError(null);
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;

    fetchData(query, transformData, signal);

    return () => {
      controller.abort();
    };
  }, [query, transformData, fetchData, autoComplete]);

  return [data, setData, error];
};

export default useFetch;
