import React from 'react';
import styled from 'styled-components';
import { Loader } from '@sdir/sds';

const LoadingPage: React.FC = () => {
  return (
    <LoadingContainer>
      <Loader />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoadingPage;
