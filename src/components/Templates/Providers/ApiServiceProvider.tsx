import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SystemState } from '../../../types';
import ApiServiceContext from '../../../services/contexts/ApiServiceContext';
import ApiService from '../../../services/ApiService';

const ApiServiceProvider: React.FC = ({ children }) => {
  const {
    oidc: { user }
  } = useSelector((state: SystemState) => state);
  const token = user?.access_token ?? '';
  const apiService = useMemo(() => new ApiService(token), [token]);

  return <ApiServiceContext.Provider value={{ apiService }}>{children}</ApiServiceContext.Provider>;
};

export default ApiServiceProvider;
