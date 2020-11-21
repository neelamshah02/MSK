import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
  authority: process.env.REACT_APP_EXTERNALAUTHURL!,
  client_id: 'msk',
  redirect_uri: `${window.location.origin + window.location.pathname}#/callback`,
  silent_redirect_uri: `${window.location.origin + window.location.pathname}#/silent`,
  post_logout_redirect_uri: `${window.location.origin + window.location.pathname}#/logout`,
  response_type: 'code',
  client_secret: '9n9MoON3dRWtHiJEovj2yuskreg1dmO41ldG1nwfPwyH3dWXMC',
  scope: 'apsGateway openid',
  automaticSilentRenew: false,
  validateSubOnSilentRenew: true,
  monitorAnonymousSession: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  revokeAccessTokenOnSignout: true
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
