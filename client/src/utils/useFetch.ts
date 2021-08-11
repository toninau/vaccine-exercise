//https://usehooks-typescript.com/react-hook/use-fetch
import { Reducer, useEffect, useReducer } from 'react';

interface State<T> {
  data?: T
  error?: Error
}

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

const initialState = {
  error: undefined,
  data: undefined,
};

const fetchReducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case 'loading':
      return { ...initialState };
    case 'fetched':
      return { ...initialState, data: action.payload };
    case 'error':
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

const useFetch = <T>(url: string): State<T> => {
  const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'loading' });
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = (await response.json()) as T;
        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        dispatch({ type: 'error', payload: error as Error });
      }
    };
    void fetchData();
  }, [url]);

  return state;
};

export default useFetch;