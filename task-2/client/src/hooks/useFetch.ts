import { useEffect, useState } from 'react';
import { IStudent } from '../types';

export default function useFetch(url: string, refetch: boolean) {
  const [data, setData] = useState<IStudent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | string>('');

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      try {
        const response = await fetch(url);
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
        setIsLoading(false);
      }
    }
    getData();
  }, [url, refetch]);

  return { data, isLoading, error };
}
