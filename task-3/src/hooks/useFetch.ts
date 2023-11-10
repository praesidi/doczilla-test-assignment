import { useEffect, useState } from 'react';

export interface ITask {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  date: string;
  status: boolean;
}

export default function useFetch(url: string) {
  const [data, setData] = useState<ITask[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    async function getTasks() {
      try {
        const response = await fetch(url);
        console.log(response);
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        let errorMessage = 'Failed to fetch data from the server';
        if (error instanceof Error) {
          errorMessage = error.message;
          setError(errorMessage);
          setIsLoading(false);
        }
        console.log(errorMessage);
      }
    }
    getTasks();
  }, [url]);

  return { data, isLoading, error };
}
