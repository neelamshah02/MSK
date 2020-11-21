/* eslint-disable no-shadow */
import { useState, useEffect, useContext } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import ApiServiceContext from '../contexts/ApiServiceContext';

type ErrorOverrideFunc = {
  (error: AxiosError): void;
};

type SuccessCallbackFunc = {
  (data: any): void;
};

type UseGetArgs = {
  apiUrl: string;
  successCallback?: SuccessCallbackFunc;
  errorOverride?: ErrorOverrideFunc;
  extraDependencies?: any[];
};

type GetData = {
  (args: UseGetArgs): {
    error: string;
    loading: boolean;
    results: any;
  };
};

const useGet: GetData = ({ apiUrl, successCallback, errorOverride, extraDependencies = [] }) => {
  const [error, setError] = useState('' as string);

  const [loading, setLoading] = useState(true as boolean);
  const [results, setResults] = useState([] as any);
  const { apiService } = useContext(ApiServiceContext);

  useEffect(() => {
    apiService
      .get(apiUrl)
      .then((response: AxiosResponse) => {
        error && setError('');
        setResults(response.data);
        successCallback?.(response.data);
      })
      .catch((error: AxiosError) => {
        errorOverride ? errorOverride(error) : setError(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, errorOverride, successCallback, ...extraDependencies]);

  return { error, loading, results };
};

export default useGet;
