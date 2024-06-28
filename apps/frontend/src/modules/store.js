import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { asyncMiddleware } from "./middleware/async_middleware";
import { rootReducer } from "./root_reducer";

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

export function startStore() {
  const middlewareEnhancer = applyMiddleware(asyncMiddleware);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, composedEnhancers);

  return { store };
}
