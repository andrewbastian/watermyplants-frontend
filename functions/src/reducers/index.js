import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { authReducer as auth } from "./auth";
import { plantReducer as plants } from "./plants";
/*import { uiReducer as notifications } from "./uiReducer";*/

export default (history) =>
    combineReducers({
        router: connectRouter(history),
        auth,
        plants,
    });
