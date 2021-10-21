import { useState, useEffect } from 'react';

export default function useSelect(name) {
  let baseUrl = 'https://open-api.myhelsinki.fi/v1/';
  if (name === 'activities') {
    baseUrl = `${baseUrl}${name}/?limit=50`;
  } else {
    baseUrl = `${baseUrl}${name}/?limit=50&start=500`;
  }

  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const response = await fetch(baseUrl);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [baseUrl]);
  return { data, loading, error };
}
