/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import PatientListPage from './containers/PatientPage';
import RegisterPage from './containers/RegisterPage';

export default () => (
  <App>
    <Switch>
      <Route path="/register" component={RegisterPage} />
      <Route path="/" component={PatientListPage} active />
    </Switch>
  </App>
);
