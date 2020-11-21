import React from 'react';
import styled from 'styled-components';

interface CallbackProps {}

const Login: React.FC<CallbackProps> = () => {
  return (
    <Container>
      <h2>LoggInn</h2>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  width: 80%;
`;

export default Login;
