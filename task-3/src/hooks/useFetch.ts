import { useEffect, useState } from 'react';
import { ITask } from '../types';

export default function useFetch(searchQuery: string) {
  const [data, setData] = useState<ITask[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const url = '/api/todos';

  useEffect(() => {
    console.log('data is fetching');
    setIsLoading(true);
    async function getTasks() {
      try {
        let response;
        if (searchQuery !== '' && searchQuery !== ' ') {
          response = await fetch(`${url}/find?q=${searchQuery}`);
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
  }, [url, searchQuery]);

  return { data, isLoading, error };
}
