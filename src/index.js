import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import App from "./App";

import configureStore, { history } from "./configureStore";
const store = configureStore();

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App history={history} />
            </Provider>
        </AppContainer>,
        document.getElementById("root")
    );
};

render();
if (module.hot) {
    module.hot.accept("./App", () => {
        render();
    });
}
