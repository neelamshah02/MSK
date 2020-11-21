import React from 'react';
import styled from 'styled-components';

interface ErrorMessageInterface {
  errorMsg: string;
}

const ErrorMessage: React.FC<ErrorMessageInterface> = ({ errorMsg }) => {
  return <Title>{errorMsg}</Title>;
};

const Title = styled.div`
  display: grid;
  font-size: 2rem;
  margin-top: 3rem;
  padding: 1rem 2rem;
  border: 1px solid ${({ theme }) => theme.colors.alert.errorDark};
  color: ${({ theme }) => theme.colors.error};
  background-color: ${({ theme }) => theme.colors.alert.errorLight};
  width: 80%;
`;

export default ErrorMessage;
