import { createStore } from 'redux';
import { loadUser } from 'redux-oidc';
import userManager from '../services/auth/userManager';
import rootReducer from './reducers/rootReducer';

userManager.clearStaleState();
const store = createStore(rootReducer);
loadUser(store, userManager);

export default store;
