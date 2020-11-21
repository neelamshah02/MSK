import { useState, useCallback, useContext } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import ApiServiceContext from '../contexts/ApiServiceContext';

export type CallbackFunctionType = (response: AxiosResponse) => void;

export type PostFunc = {
  (apiUrl: string, body: any, callbackFunction?: CallbackFunctionType): void;
};

export type ErrorCallbackFunc = {
  (error: AxiosError): void;
};

export type PostData = {
  (errorCallback?: ErrorCallbackFunc): {
    error: string;
    loading: boolean;
    results: any;
    post: PostFunc;
  };
};

const useManuallyPost: PostData = errorCallback => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const { apiService } = useContext(ApiServiceContext);

  const post: PostFunc = useCallback(
    (apiUrl: string, body: any, callbackFunction?: CallbackFunctionType) => {
      setLoading(true);
      apiService
        .post(apiUrl, body)
        .then((response: AxiosResponse) => {
          setResults(response.data);
          setLoading(false);
          setError('');
          if (callbackFunction) callbackFunction(response);
        })
        .catch((axiosError: AxiosError) => {
          setError(error.toString());
          setLoading(false);
          if (errorCallback) errorCallback(axiosError);
        });
    },
    [setError, setLoading, setResults, errorCallback, apiService]
  );

  return { error, loading, results, post };
};

export default useManuallyPost;
