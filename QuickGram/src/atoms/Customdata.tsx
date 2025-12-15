import { useState } from 'react';
import axios from 'axios';

const customdata = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const fetchData =  async(url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url);
      setData(response?.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default customdata;
