// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import patient from './patient';
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
  patient,
  router,
  form: reduxFormReducer,
});

export default rootReducer;
