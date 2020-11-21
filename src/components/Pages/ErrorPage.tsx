import React from 'react';
import styled from 'styled-components';

interface LoadingPageProps {
  message?: string;
}

const ErrorPage: React.FC<LoadingPageProps> = ({ message }) => {
  return (
    <MessageContainer>
      <ErrorMessage>Error:</ErrorMessage>
      {message && <ErrorMessage>{message}</ErrorMessage>}
    </MessageContainer>
  );
};

const ErrorMessage = styled.p``;
const MessageContainer = styled.div`
  width: 100%;
  min-height: 400px;
`;

export default ErrorPage;
