
import {Container} from 'flux/utils';

import store from './BlogStore';
import actions from './BlogActions';

import App from "./App";

function getStores() {
  return [store];
}

function getState() {
  return store.getState().merge(actions).toObject();
}

export default Container.createFunctional(App, getStores, getState);
