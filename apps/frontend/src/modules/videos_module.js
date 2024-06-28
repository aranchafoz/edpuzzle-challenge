import _ from "lodash";
import { combineReducers } from "redux";
import { asyncAction } from "./middleware/async_action_creator";

/* ====================================================== */
/*                         Module                         */
/* ====================================================== */

export const MODULE_NAME = "videos";

/* ====================================================== */
/*                        Actions                         */
/* ====================================================== */

export const FETCH_VIDEOS_PAGE = asyncAction(
  `${MODULE_NAME}/FETCH_VIDEOS_PAGE`
);
export function fetchVideosPage({ pageToken = "", pageSize = 10 } = {}) {
  return {
    type: FETCH_VIDEOS_PAGE,
    fn: ({ fetch }) => fetch("/api/v1/videos"),
    meta: { pageToken, pageSize },
  };
}

/* ====================================================== */
/*                        Reducers                        */
/* ====================================================== */

export function videos(state = [], { type, payload, meta }) {
  switch (type) {
    case FETCH_VIDEOS_PAGE.SUCCESS:
      return [...state, ...payload.data];
    default:
      return state;
  }
}

export default combineReducers({
  videos,
});

/* ====================================================== */
/*                       Selectors                        */
/* ====================================================== */

export const getVideoList = (state) =>
  state[MODULE_NAME] ? state[MODULE_NAME].videos : [];
