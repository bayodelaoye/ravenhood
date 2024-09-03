import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import portfolioReducer from "./portfolio";
import watchlistReducer from "./watchlist";
import navStocksReducer from "./navStocksRedux";
import transactionReducer from "./transactions";
import stockReducer from "./stock";

const rootReducer = combineReducers({
  session: sessionReducer,
  portfolios: portfolioReducer,
  watchlist: watchlistReducer,
  navStocks: navStocksReducer,
  transactions: transactionReducer,
  stocks: stockReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
