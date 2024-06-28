import { getRequestStatus } from "../async_metadata_module";

/* ====================================================== */
/*                        Middleware                      */
/* ====================================================== */

export const asyncMiddleware =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    const { type, fn, meta = {} } = action;

    // Normal action: pass it on
    if (!fn) return next(action);

    if (!type.REQUEST || !type.SUCCESS || !type.FAILURE || !type.ALWAYS) {
      throw new Error("Expected action type created with apiAction(...)");
    }
    if (typeof fn !== "function") {
      throw new Error("Expected fn to be a function.");
    }

    const requestStatus = getRequestStatus(getState(), {
      actionType: type,
      requestId: meta.requestId,
    });

    if (requestStatus.isLoading) return requestStatus.actionPromise;

    const actionPromise = fn({ fetch, getState }).then(async (response) => {
      const body = await response.json();
      return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body,
      };
    });

    const extendedMeta = { ...meta, actionPromise };
    dispatch(requestAction({ type: type.REQUEST, meta: extendedMeta }));

    return new Promise((resolve, reject) => {
      actionPromise
        .then((response) => {
          if (response.body.error) {
            dispatch(
              httpFailureAction({
                type: type.FAILURE,
                err: response.body.error,
                meta: {
                  status: response.status,
                  headers: response.headers,
                  ...extendedMeta,
                },
              })
            );
            return;
          }
          dispatch(
            successAction({
              type: type.SUCCESS,
              response: response.body,
              meta: {
                status: response.status,
                headers: response.headers,
                ...extendedMeta,
              },
            })
          );
          return resolve(response);
        })
        .catch((err) => {
          // It's a Runtime error of our client side code
          dispatch(
            runtimeFailureAction({
              type: type.FAILURE,
              err,
              meta: extendedMeta,
            })
          );
          return reject(err);
        });
    });
  };

/* ====================================================== */
/*                         Helpers                        */
/* ====================================================== */

export function requestAction({ type, meta }) {
  return { type, meta };
}

export function successAction({ type, response = {}, meta }) {
  return {
    type,
    payload: response,
    meta,
  };
}

export function httpFailureAction({ type, err, meta }) {
  return {
    type,
    error: true,
    payload: err,
    meta: {
      ...meta,
      isDeveloperError: false,
      status: err.status,
    },
  };
}

export function runtimeFailureAction({ type, err, meta }) {
  return {
    type,
    error: true,
    payload: {
      type: err.name,
      error: err.message,
      errorCode: err.errorCode || err.message,
      stack: err.stack,
    },
    meta: { ...meta, isDeveloperError: true },
  };
}
