import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = <T>(url: string) => {
  const [response, setResponse] = useState<T | null>(null);

  useEffect(() => {
    setResponse(null);
    const fun = async () => {
      const test = await axios.get<T>(url);
      setResponse(test.data);
    };
    void fun();
  }, [url]);

  return response;
};

export default useAxios;