import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { error } from 'config';
import Error from './error';
import Loader from './loader';

import Auth from './auth/Auth';
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/auth/:recordId/:meetingId" component={Auth} />

        <ProtectedRoute path="/:recordId/:meetingId" component={Loader} />

        <Route render={() => <Error code={error['NOT_FOUND']} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
