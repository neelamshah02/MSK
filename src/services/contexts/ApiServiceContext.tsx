import { createContext } from 'react';
import ApiService from '../ApiService';
import { ApiServiceInterface } from '../ApiService/ApiService';

interface ApiServiceContextInterface {
  apiService: ApiServiceInterface;
}

const ApiServiceContext = createContext<ApiServiceContextInterface>({
  apiService: new ApiService()
});

export default ApiServiceContext;
