/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

export const ASYNC_ACTION_SEPARATOR = "--->";

export function asyncAction(type) {
  if (!(typeof type === "string")) {
    throw new Error("Expected an array of three string types.");
  }

  return {
    REQUEST: `${type}${ASYNC_ACTION_SEPARATOR}REQUEST`,
    SUCCESS: `${type}${ASYNC_ACTION_SEPARATOR}SUCCESS`,
    FAILURE: `${type}${ASYNC_ACTION_SEPARATOR}FAILURE`,
    ALWAYS: `${type}${ASYNC_ACTION_SEPARATOR}ALWAYS`,
    NAME: type,
  };
}
