import { useState, useCallback, useContext } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import ApiServiceContext from '../contexts/ApiServiceContext';

type GetFunc = {
  (apiUrl: string): void;
};

type ErrorOverrideFunc = {
  (error: AxiosError): void;
};

type GetData = {
  (errorOverride?: ErrorOverrideFunc): {
    error: string;
    loading: boolean;
    results: any;
    get: GetFunc;
  };
};

const useManuallyGet: GetData = errorOverride => {
  const [error, setError] = useState('' as string);
  const [loading, setLoading] = useState(false as boolean);
  const [results, setResults] = useState([] as any);
  const { apiService } = useContext(ApiServiceContext);

  const get: GetFunc = useCallback(
    (apiUrl: string) => {
      setLoading(true);
      apiService
        .get(apiUrl)
        .then((response: AxiosResponse) => {
          setResults(response.data);
          setLoading(false);
          setError('');
        })
        .catch((axiosError: AxiosError) => {
          if (errorOverride) {
            errorOverride(axiosError);
          } else {
            setError(error.toString());
            setLoading(false);
          }
        });
    },
    [errorOverride]
  );

  return { error, loading, results, get };
};

export default useManuallyGet;
