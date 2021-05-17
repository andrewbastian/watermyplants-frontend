import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Homepage from "./components/Homepage";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

import Dashboard from "./components/Dashboard";
import PlantCard from "./components/PlantCard";
import AddPlant from "./components/AddPlant";

import AddPlantWater from "./components/AddPlantWater";

import EditPlant from "./components/EditPlant";
import EditWater from "./components/EditWater";

import SuccessSnackbar from "./components/Notifications";

const App = ({ history }) => (
    <ConnectedRouter history={history}>
        <div className="app">
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute path="/account" component={Profile} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/plant/add" component={AddPlant} />
                <PrivateRoute
                    exact
                    path="/plant/:id/water"
                    component={AddPlantWater}
                />
                <PrivateRoute exact path="/plant/:id" component={PlantCard} />
                <PrivateRoute
                    path="/plant/notifications"
                    component={<SuccessSnackbar />}
                />
                <PrivateRoute path="/plant/:id/edit" component={EditPlant} />
                <PrivateRoute
                    path="/plant/:id/water/edit"
                    component={EditWater}
                />
            </Switch>
        </div>
    </ConnectedRouter>
);

export default App;
