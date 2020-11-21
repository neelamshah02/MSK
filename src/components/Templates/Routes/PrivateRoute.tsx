import React, { useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SystemState } from '../../../types';
import userManager from '../../../services/auth/userManager';

interface PrivateRouteProps extends RouteProps {
  forwardProps?: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component, ...rest }) => {
  const { oidc } = useSelector((state: SystemState) => state);
  useEffect(() => {
    if (!oidc.user || oidc.user.expired) {
      userManager.signinRedirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Route {...rest} component={component} />;
};

export default PrivateRoute;
