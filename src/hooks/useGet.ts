import axios from "axios";
import { useEffect, useState } from "react";

function useGet<DataType>(url: string, initialState: DataType | null = null) {
  const [data, setData] = useState(initialState);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.get<DataType>(url);
        setData(response.data);
      } catch (e: unknown) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useGet;
