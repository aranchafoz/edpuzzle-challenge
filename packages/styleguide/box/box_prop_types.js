const DISPLAYS = {
  BLOCK: "block",
  INLINE: "inline",
  INLINE_BLOCK: "inline-block",
  FLEX: "flex",
  INLINE_FLEX: "inline-flex",
  TABLE: "table",
  TABLE_HEAD: "table-head",
  TABLE_BODY: "table-body",
  TABLE_ROW: "table-row",
  TABLE_CELL: "table-cell",
  NONE: "none",
};

const FONT_FAMILIES = {
  SANS: "sans",
};

const FONT_SIZES = {
  DISPLAY: "display",
  BIG_TITLE: "big-title",
  MED_TITLE: "med-title",
  TITLE: "title",
  SUBTITLE: "subtitle",
  BIG_BODY: "big-body",
  BODY: "body",
  CAPTION: "caption",
  SMOL: "smol",
};

const FONT_WEIGHTS = {
  BOLD: "bold",
  NORMAL: "normal",
  LIGHT: "light",
};

const FONT_STYLES = {
  NORMAL: "normal",
  ITALIC: "italic",
};

const TEXT_ALIGN = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
  JUSTIFIED: "justified",
  END: "end",
  START: "start",
};

const LETTER_SPACINGS = {
  WIDEST: "widest",
  WIDE: "wide",
  NORMAL: "normal",
  TIGHT: "tight",
};

const LINE_HEIGHTS = {
  LOOSE: "loose",
  RELAXED: "relaxed",
  NORMAL: "normal",
  SNUG: "snug",
  TIGHT: "tight",
  NONE: "none",
};

const TEXT_DECORATION = {
  UNDERLINE: "underline",
  THROUGH: "line-through",
  NONE: "none",
};

const WHITE_SPACE = {
  NORMAL: "normal",
  NOWRAP: "nowrap",
  PRE: "pre",
  PRE_LINE: "pre-line",
  PRE_WRAP: "pre-wrap",
};

const WORD_BREAK = {
  NORMAL: "normal",
  WORDS: "words",
  ALL: "all",
};

const FLEX_GROW = {
  0: "0",
  1: "1",
  2: "2",
};

const FLEX_SHRINK = {
  0: "0",
  1: "1",
};

const OVERFLOW = {
  VISIBLE: "visible",
  HIDDEN: "hidden",
  SCROLL: "scroll",
  AUTO: "auto",
};

const OVERSCROLL = {
  NONE: "none",
  CONTAIN: "contain",
  AUTO: "auto",
};

const FLEX_DIRECTION = {
  ROW: "row",
  ROW_REVERSE: "row-reverse",
  COLUMN: "column",
  COLUMN_REVERSE: "column-reverse",
};

const FLEX_WRAP = {
  NOWRAP: "nowrap",
  WRAP: "wrap",
  WRAP_REVERSE: "wrap-reverse",
};

const JUSTIFY_CONTENT = {
  FLEX_START: "flex-start",
  CENTER: "center",
  FLEX_END: "flex-end",
  SPACE_BETWEEN: "space-between",
  SPACE_AROUND: "space-around",
  SPACE_EVENLY: "space-evenly",
  STRETCH: "stretch",
};

const JUSTIFY_ITEMS = {
  FLEX_START: "flex-start",
  CENTER: "center",
  FLEX_END: "flex-end",
  STRETCH: "stretch",
};

const JUSTIFY_SELF = {
  FLEX_START: "flex-start",
  CENTER: "center",
  FLEX_END: "flex-end",
  STRETCH: "stretch",
};

const ALIGN_CONTENT = {
  FLEX_START: "flex-start",
  CENTER: "center",
  FLEX_END: "flex-end",
  SPACE_BETWEEN: "space-between",
  SPACE_AROUND: "space-around",
  SPACE_EVENLY: "space-evenly",
  STRETCH: "stretch",
};

const ALIGN_ITEMS = {
  FLEX_START: "flex-start",
  CENTER: "center",
  FLEX_END: "flex-end",
  BASELINE: "baseline",
  STRETCH: "stretch",
};

const ALIGN_SELF = {
  FLEX_START: "flex-start",
  CENTER: "center",
  FLEX_END: "flex-end",
  STRETCH: "stretch",
};

const ORDER = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "11",
  12: "12",
  FIRST: "first",
  LAST: "last",
};

const POSITION = {
  ABSOLUTE: "absolute",
  FIXED: "fixed",
  RELATIVE: "relative",
  STATIC: "static",
};

const POSITION_COORDINATES = {
  0: "0",
  1: "1",
  "05": "05",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
};

const Z_INDEX = {
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  AUTO: "auto",
};

const VISIBILITY = {
  VISIBLE: "visible",
  HIDDEN: "hidden",
  COLLAPSE: "collapse",
};

const BORDER_WIDTH = {
  0: "0",
  1: "1",
  2: "2",
  4: "4",
};

const BORDER_STYLE = {
  NONE: "none",
  SOLID: "solid",
  DOTTED: "dotted",
  DASHED: "dashed",
  DOUBLE: "double",
  GROOVE: "groove",
  RIDGE: "ridge",
  INSET: "inset",
  OUTSET: "outset",
};

const BORDER_RADIUS = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  round: "round",
};

const ELEVATION = {
  OVERLAY: "overlay",
  RAISED: "raised",
  LIFTED: "lifted",
  OVERFLOW_BOTTOM: "overflow-bottom",
  NONE: "none",
};

const CURSOR = {
  AUTO: "auto",
  DEFAULT: "default",
  POINTER: "pointer",
  MOVE: "move",
  TEXT: "text",
  WAIT: "wait",
  HELP: "help",
  NONE: "none",
  PROGRESS: "progress",
  CROSSHAIR: "crosshair",
  CELL: "cell",
  CONTEXT_MENU: "context-menu",
  ALIAS: "alias",
  COPY: "copy",
  NODROP: "nodrop",
  NOT_ALLOWED: "not-allowed",
  ALL_SCROLL: "all-scroll",
  ZOOM_IN: "zoom-in",
  ZOOM_OUT: "zoom-out",
  E_RESIZE: "e-resize",
  NE_RESIZE: "ne-resize",
  NW_RESIZE: "nw-resize",
  N_RESIZE: "n-resize",
  SE_RESIZE: "se-resize",
  SW_RESIZE: "sw-resize",
  S_RESIZE: "s-resize",
  W_RESIZE: "w-resize",
};

const POINTER_EVENTS = {
  AUTO: "auto",
  NONE: "none",
  ALL: "all",
};

const OPACITY = {
  0: "0",
  "05": "05",
  1: "1",
};

const USER_SELECT = {
  NONE: "none",
  TEXT: "text",
  ALL: "all",
  AUTO: "auto",
  CONTAIN: "contain",
};

export {
  DISPLAYS,
  FONT_FAMILIES,
  FONT_SIZES,
  FONT_WEIGHTS,
  FONT_STYLES,
  TEXT_ALIGN,
  LETTER_SPACINGS,
  LINE_HEIGHTS,
  TEXT_DECORATION,
  WHITE_SPACE,
  WORD_BREAK,
  FLEX_GROW,
  FLEX_SHRINK,
  OVERFLOW,
  OVERSCROLL,
  FLEX_DIRECTION,
  FLEX_WRAP,
  JUSTIFY_CONTENT,
  JUSTIFY_ITEMS,
  JUSTIFY_SELF,
  ALIGN_CONTENT,
  ALIGN_ITEMS,
  ALIGN_SELF,
  ORDER,
  POSITION,
  POSITION_COORDINATES,
  Z_INDEX,
  VISIBILITY,
  BORDER_WIDTH,
  BORDER_STYLE,
  BORDER_RADIUS,
  ELEVATION,
  CURSOR,
  POINTER_EVENTS,
  OPACITY,
  USER_SELECT,
};
