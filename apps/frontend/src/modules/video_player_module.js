import _ from "lodash";
import { combineReducers } from "redux";
import { asyncAction } from "./middleware/async_action_creator";

/* ====================================================== */
/*                         Module                         */
/* ====================================================== */

export const MODULE_NAME = "video_player";

/* ====================================================== */
/*                        Actions                         */
/* ====================================================== */

export const FETCH_VIDEO = asyncAction(`${MODULE_NAME}/FETCH_VIDEO`);
export function fetchVideo({ id } = {}) {
  return {
    type: FETCH_VIDEO,
    fn: async ({ fetch }) => fetch(`/api/v1/videos/${id}`),
    meta: { id },
  };
}

export const FETCH_VIEWS_PAGE = asyncAction(`${MODULE_NAME}/FETCH_VIEWS_PAGE`);
export function fetchViewsPage({
  videoId,
  pageToken = "",
  pageSize = 10,
} = {}) {
  return {
    type: FETCH_VIEWS_PAGE,
    fn: ({ fetch }) => fetch(`/api/v1/videos/${videoId}/views`),
    meta: { videoId, pageToken, pageSize },
  };
}

export const TRACK_VIEW = asyncAction(`${MODULE_NAME}/TRACK_VIEW`);
export function trackView({ videoId } = {}) {
  return {
    type: TRACK_VIEW,
    fn: ({ fetch }) =>
      fetch(`/api/v1/videos/${videoId}/views`, { method: "POST" }),
    meta: { videoId },
  };
}

export const FETCH_VIDEO_VIEWS_COUNTER = asyncAction(
  `${MODULE_NAME}/FETCH_VIDEO_VIEWS_COUNTER`
);
export function fetchVideoViewsCounter({ videoId } = {}) {
  return {
    type: FETCH_VIDEO_VIEWS_COUNTER,
    fn: ({ fetch }) => fetch(`/api/v1/videos/${videoId}/views_counter`),
    meta: { videoId },
  };
}

/* ====================================================== */
/*                        Reducers                        */
/* ====================================================== */

export function video(state = {}, { type, payload, meta }) {
  switch (type) {
    case FETCH_VIDEO.SUCCESS:
      return payload.data;
    default:
      return state;
  }
}

export function views(state = [], { type, payload, meta }) {
  switch (type) {
    case FETCH_VIEWS_PAGE.SUCCESS:
      if (!meta.pageToken) return payload.data;
      return [...state, ...payload.data];
    case TRACK_VIEW.REQUEST:
      return [
        {
          id: "something random",
          videoId: "some video id",
          occurredOn: Date.now(),
        },
        ...state,
      ];
    case TRACK_VIEW.FAILURE:
      const [_optimisticView, ...rest] = state;
      return rest;
    default:
      return state;
  }
}

export function viewsCounter(state = 0, { type, payload, meta }) {
  switch (type) {
    case FETCH_VIDEO_VIEWS_COUNTER.SUCCESS:
      return payload.data.counter;
    case TRACK_VIEW.REQUEST:
      return state + 1;
    case TRACK_VIEW.FAILURE:
      return state - 1;
    default:
      return state;
  }
}

export default combineReducers({
  video,
  views,
  viewsCounter,
});

/* ====================================================== */
/*                       Selectors                        */
/* ====================================================== */

export const getViewsList = (state) =>
  state[MODULE_NAME] ? state[MODULE_NAME].views : [];

export const getViewsCounter = (state) =>
  state[MODULE_NAME] ? state[MODULE_NAME].viewsCounter : 0;

export const getVideo = (state) =>
  state[MODULE_NAME] ? state[MODULE_NAME].video : {};
