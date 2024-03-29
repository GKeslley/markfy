import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (!response.ok) throw new Error(json.message);
      setData(json);
    } catch (err) {
      json = null;
      setError(err.message);
    } finally {
      setLoading(false);
      return { response, json };
    }
  }, []);

  return { request, data, error, loading, setError };
};

export default useFetch;
