import { createContext } from 'react';

interface ErrorContextType {
  error: string;
  setErrorCallback: (errorText: string) => void;
}

const ErrorContext = createContext({
  error: '',
  setErrorCallback: () => {}
} as ErrorContextType);

export default ErrorContext;
