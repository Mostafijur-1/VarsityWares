import { useState, useEffect } from "react";

const useFetchFilters = (type) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/${type}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok for ${type}`);
        }
        const result = await response.json();
        setData(result.payload);
      } catch (error) {
        setError(`Error fetching ${type}`);
        console.error(`Error fetching ${type}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return {
    [`${type}`]: data,
    [`${type}Loading`]: loading,
    [`${type}Error`]: error,
  };
};

export default useFetchFilters;
