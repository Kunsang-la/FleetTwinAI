import { useState, useEffect, useRef } from 'react';
import { fetchVehicleData } from '../api/digitalTwinapi';

export const useVehicleData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);
  
  const timerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const result = await fetchVehicleData();
        if (isMounted) {
          setData(result);
          setConnected(true);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setConnected(false);
          setError('Backend Offline');
          setLoading(false);
        }
      }
      
      if (isMounted) {
        timerRef.current = setTimeout(loadData, 1000);
      }
    };

    loadData();

    return () => {
      isMounted = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { data, loading, error, connected };
};
