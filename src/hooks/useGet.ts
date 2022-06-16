import axios from "axios";
import { useEffect, useState } from "react";

function useGet<DataType>(url: string, initialState: DataType | null = null) {
  const [data, setData] = useState(initialState);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return { data, isLoading };
}

export default useGet;
