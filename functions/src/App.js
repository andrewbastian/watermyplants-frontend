import React from 'react';
import { Switch, Route  } from 'react-router-dom';
import { ConnectedRouter  } from 'connected-react-router';

import Homepage from './components/Homepage';

import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

import Dashboard from './components/Dashboard';
import AddPlant from './components/AddPlant';


const App = ({ history  }) => (
      <ConnectedRouter history={history}>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute path="/account" component={Profile} />
            <PrivateRoute path="/plant/add" component={AddPlant} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </ConnectedRouter>
);

export default App;
