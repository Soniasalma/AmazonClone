import axios from 'axios';
import { useEffect, useState } from 'react';

const useLocationInfo = () => {
  const [geoInfo, setGeoInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const cashedCountry = localStorage.getItem('userCountry');
    if (cashedCountry) {
      setGeoInfo(cashedCountry);
      setLoading(false);
    } else {
      axios
        .get('https://ipapi.co/json/')
        .then((response) => {
          const { country_name } = response.data;
          localStorage.setItem('userCountry', country_name);
          setLoading(false);
          //console.log(country_name);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, []);
  return [geoInfo, loading, error];
};
export default useLocationInfo;
