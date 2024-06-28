import _ from "lodash";
import {
  asyncAction,
  ASYNC_ACTION_SEPARATOR,
} from "./middleware/async_action_creator";

export const DEFAULT_NAMESPACE = "_no_namespace_";

/* ====================================================== */
/*                         Module                         */
/* ====================================================== */

export const MODULE_NAME = "asyncMetadata";

/* ====================================================== */
/*                        Reducers                        */
/* ====================================================== */

export default function asyncMetadataReducer(
  state = {},
  { type, payload, meta = {} }
) {
  if (!type) return state;
  const parsedType = type.split(ASYNC_ACTION_SEPARATOR);
  if (parsedType.length < 2) {
    return state;
  }

  const actionType = asyncAction(parsedType[0]);
  const namespace = _getNamespace({ requestId: meta.requestId });

  switch (type) {
    case actionType.REQUEST:
      return {
        ...state,
        [actionType.NAME]: {
          ...state[actionType.NAME],
          [namespace]: {
            isLoading: true,
            isLoaded: false,
            error: "",
            errorCode: "",
            errorData: undefined,
            status: null,
            actionPromise: meta.actionPromise,
          },
        },
      };
    case actionType.SUCCESS:
      return {
        ...state,
        [actionType.NAME]: {
          ...state[actionType.NAME],
          [namespace]: {
            isLoading: false,
            isLoaded: true,
            error: "",
            errorCode: "",
            errorData: undefined,
            status: meta.status,
            actionPromise: meta.actionPromise,
          },
        },
      };
    case actionType.FAILURE:
      return {
        ...state,
        [actionType.NAME]: {
          ...state[actionType.NAME],
          [namespace]: {
            isLoading: false,
            isLoaded: false,
            error: payload.message,
            errorCode: payload.code,
            errorData: payload.data,
            status: payload.status,
            actionPromise: meta.actionPromise,
          },
        },
      };
    default:
      return state;
  }
}

/* ====================================================== */
/*                       Selectors                        */
/* ====================================================== */

export const getRequestStatus = (state, { action = {}, actionType, requestId = "" }) => {
  const moduleState = state[MODULE_NAME];

  let _actionType = actionType;
  let _requestId = requestId;

  if (_.has(action, "type")) {
    _actionType = action.type;
    _requestId = action.meta.requestId;
  }

  if (!moduleState[_actionType.NAME]) return defaultRequestStatus;
  return (
    moduleState[_actionType.NAME][_getNamespace({ requestId: _requestId })] ||
    defaultRequestStatus
  );
};

export const getAllNamespacedRequestStatus = (state, { actionType }) =>
  state[MODULE_NAME][actionType.NAME] || {};

export const getIsSomeRequestLoading = (state, { actionType }) =>
  _getIsSomeRequestLoading(state, { actionType });

export const getIsSomeActionLoading = (state, { actionTypes }) =>
  _.some(actionTypes, (actionType) =>
    _getIsSomeRequestLoading(state, { actionType })
  );

const _getIsSomeRequestLoading = (state, { actionType }) => {
  const moduleState = state[MODULE_NAME];

  if (!moduleState[actionType.NAME]) return false;
  return _.some(moduleState[actionType.NAME], (request) => request.isLoading);
};

/* ====================================================== */
/*                        Helpers                         */
/* ====================================================== */

const defaultRequestStatus = {
  isLoading: false,
  isLoaded: false,
  error: "",
  errorCode: "",
  status: null,
  actionPromise: undefined,
};

function _getNamespace({ requestId = "" }) {
  return requestId || DEFAULT_NAMESPACE;
}

/* ====================================================== */
/*                      Test Helpers                      */
/* ====================================================== */

export function stateForNotDispatchedAction({ actionType, requestId }) {
  return stateForAction({
    actionState: defaultRequestStatus,
    actionType,
    requestId,
  });
}

export function stateForLoadingAction({
  actionType,
  requestId,
  isLoading = true,
  actionPromise,
}) {
  return stateForAction({
    actionState: { isLoading, actionPromise },
    actionType,
    requestId,
  });
}

export function stateForLoadedAction({ actionType, requestId }) {
  return stateForAction({
    actionState: { isLoaded: true, error: undefined },
    actionType,
    requestId,
  });
}

export function stateForAction({ actionState, actionType, requestId }) {
  return {
    [MODULE_NAME]: {
      [actionType.NAME]: {
        [_getNamespace({ requestId })]: actionState,
      },
    },
  };
}
