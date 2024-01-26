import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useFetchProducts = () => {
  const [productsData, setProductsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get('https://fakestoreapiserver.reactbd.com/amazonproducts')
          .then((res) => {
            setLoading(false);
            setProductsData(res.data);
          });
      } catch (err) {
        setErr(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return [productsData, loading, err];
};

export default useFetchProducts;
