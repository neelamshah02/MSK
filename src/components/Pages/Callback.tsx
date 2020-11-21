import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Loader } from '@sdir/sds';
import { CallbackComponent } from 'redux-oidc';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import userManager from '../../services/auth/userManager';

const Callback: React.FC<RouteComponentProps> = ({ history }) => {
  const onSuccess = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={onSuccess}
      errorCallback={error => {
        console.error(error);
      }}
    >
      <Container>
        <Loader />
      </Container>
    </CallbackComponent>
  );
};

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  width: 80%;
`;

export default withRouter(Callback);
