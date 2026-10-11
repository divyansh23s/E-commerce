import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middleware = [thunk, logger];

// Redux DevTools is optional. Passing `undefined` as an enhancer to compose()
// makes Redux try to call it when the browser extension is not installed.
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
