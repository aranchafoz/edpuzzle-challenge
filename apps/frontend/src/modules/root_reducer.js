import { combineReducers } from "redux";

/* ====================================================== */
/*                    Custom Reducers                     */
/* ====================================================== */

import asyncMetadataReducer, {
  MODULE_NAME as asyncMetadata,
} from "./async_metadata_module";
import videosReducer, { MODULE_NAME as videos } from "./videos_module";
import videoPlayerReducer, {
  MODULE_NAME as videoPlayer,
} from "./video_player_module";

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

export const rootReducer = combineReducers({
  [videos]: videosReducer,
  [videoPlayer]: videoPlayerReducer,
  [asyncMetadata]: asyncMetadataReducer,
});
