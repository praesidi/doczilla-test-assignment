import { useEffect, useState } from 'react';
import { ITask } from '../types';

export default function useFetch(parameters: string) {
  const [data, setData] = useState<ITask[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const url = '/api/todos';

  useEffect(() => {
    setIsLoading(true);
    async function getTasks() {
      try {
        let response;
        if (parameters !== '' && parameters !== ' ') {
          response = await fetch(`${url}${parameters}`);
        } else {
          response = await fetch(url);
        }
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        let errorMessage = 'Failed to fetch data from the server';
        if (error instanceof Error) {
          errorMessage = error.message;
          setError(errorMessage);
        }
        console.log(errorMessage);
      }
    }
    getTasks();
  }, [url, parameters]);

  return { data, isLoading, error };
}
