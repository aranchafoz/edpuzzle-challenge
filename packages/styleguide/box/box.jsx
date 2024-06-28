import React from "react";
import PropTypes from "prop-types";

import { extractBoxProps, calculateStyles } from "./box_styles";
import {
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
  POSITION,
  VISIBILITY,
  BORDER_STYLE,
  CURSOR,
  POINTER_EVENTS,
  ORDER,
  Z_INDEX,
  POSITION_COORDINATES,
  BORDER_WIDTH,
  BORDER_RADIUS,
  ELEVATION,
  OPACITY,
  USER_SELECT,
} from "./box_prop_types";

/* ====================================================== */
/*                       Components                       */
/* ====================================================== */

import { useBreakpoint, useTextDirection } from "../styleguide_provider";

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

const Box = React.forwardRef(({ as: T, children, ...props }, ref) => {
  const breakpoint = useBreakpoint();
  const textDirection = useTextDirection();

  const {
    shouldRender,
    className: calculatedClassName,
    style,
    otherNonBoxProps,
  } = React.useMemo(() => {
    return calculateStyles(props, { breakpoint, textDirection });
  }, [props, breakpoint, textDirection]);

  if (!shouldRender) return null;

  return (
    <T
      className={calculatedClassName}
      style={style}
      ref={ref}
      {...otherNonBoxProps}
    >
      {children}
    </T>
  );
});

Box.displayName = "Box";

Box.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  children: PropTypes.node,

  // TEXT
  fontFamily: PropTypes.oneOf(Object.values(FONT_FAMILIES)),
  fontSize: PropTypes.oneOf(Object.values(FONT_SIZES)),
  fontWeight: PropTypes.oneOf(Object.values(FONT_WEIGHTS)),
  fontStyle: PropTypes.oneOf(Object.values(FONT_STYLES)),
  color: PropTypes.string,
  letterSpacing: PropTypes.oneOf(Object.values(LETTER_SPACINGS)),
  lineHeight: PropTypes.oneOf(Object.values(LINE_HEIGHTS)),
  lines: PropTypes.number,
  textAlign: PropTypes.oneOf(Object.values(TEXT_ALIGN)),
  textDecoration: PropTypes.oneOf(Object.values(TEXT_DECORATION)),
  whiteSpace: PropTypes.oneOf(Object.values(WHITE_SPACE)),
  wordBreak: PropTypes.oneOf(Object.values(WORD_BREAK)),
  userSelect: PropTypes.oneOf(Object.values(USER_SELECT)),

  // COLORS
  bg: PropTypes.string,
  fill: PropTypes.string,

  // LAYOUT
  w: PropTypes.string,
  maxW: PropTypes.string,
  minW: PropTypes.string,
  h: PropTypes.string,
  maxH: PropTypes.string,
  minH: PropTypes.string,
  display: PropTypes.oneOf(Object.values(DISPLAYS)),
  overflow: PropTypes.oneOf(Object.values(OVERFLOW)),
  overflowX: PropTypes.oneOf(Object.values(OVERFLOW)),
  overflowY: PropTypes.oneOf(Object.values(OVERFLOW)),
  overscroll: PropTypes.oneOf(Object.values(OVERSCROLL)),
  overscrollX: PropTypes.oneOf(Object.values(OVERSCROLL)),
  overscrollY: PropTypes.oneOf(Object.values(OVERSCROLL)),

  // FLEX
  flexDirection: PropTypes.oneOf(Object.values(FLEX_DIRECTION)),
  flexWrap: PropTypes.oneOf(Object.values(FLEX_WRAP)),
  flexGrow: PropTypes.oneOf(Object.values(FLEX_GROW)),
  flexShrink: PropTypes.oneOf(Object.values(FLEX_SHRINK)),
  flexBasis: PropTypes.string,
  justifyContent: PropTypes.oneOf(Object.values(JUSTIFY_CONTENT)),
  justifyItems: PropTypes.oneOf(Object.values(JUSTIFY_ITEMS)),
  justifySelf: PropTypes.oneOf(Object.values(JUSTIFY_SELF)),
  alignContent: PropTypes.oneOf(Object.values(ALIGN_CONTENT)),
  alignItems: PropTypes.oneOf(Object.values(ALIGN_ITEMS)),
  alignSelf: PropTypes.oneOf(Object.values(ALIGN_SELF)),
  order: PropTypes.oneOf(Object.values(ORDER)),
  flexGap: PropTypes.string,
  flexGapH: PropTypes.string,
  flexGapV: PropTypes.string,

  // MARGIN
  m: PropTypes.string,
  mt: PropTypes.string,
  me: PropTypes.string,
  mb: PropTypes.string,
  ms: PropTypes.string,
  mh: PropTypes.string,
  mv: PropTypes.string,

  // PADDING
  p: PropTypes.string,
  pt: PropTypes.string,
  pe: PropTypes.string,
  pb: PropTypes.string,
  ps: PropTypes.string,
  ph: PropTypes.string,
  pv: PropTypes.string,

  // POSITION
  position: PropTypes.oneOf(Object.values(POSITION)),
  zIndex: PropTypes.oneOf(Object.values(Z_INDEX)),
  top: PropTypes.oneOf(Object.values(POSITION_COORDINATES)),
  end: PropTypes.oneOf(Object.values(POSITION_COORDINATES)),
  bottom: PropTypes.oneOf(Object.values(POSITION_COORDINATES)),
  start: PropTypes.oneOf(Object.values(POSITION_COORDINATES)),

  // VISIBILITY
  visibility: PropTypes.oneOf(Object.values(VISIBILITY)),

  // BORDER
  borderWidth: PropTypes.oneOf(Object.values(BORDER_WIDTH)),
  borderTopWidth: PropTypes.oneOf(Object.values(BORDER_WIDTH)),
  borderEndWidth: PropTypes.oneOf(Object.values(BORDER_WIDTH)),
  borderBottomWidth: PropTypes.oneOf(Object.values(BORDER_WIDTH)),
  borderStartWidth: PropTypes.oneOf(Object.values(BORDER_WIDTH)),
  borderStyle: PropTypes.oneOf(Object.values(BORDER_STYLE)),
  borderColor: PropTypes.string,
  borderRadius: PropTypes.oneOf(Object.values(BORDER_RADIUS)),
  borderTopStartRadius: PropTypes.oneOf(Object.values(BORDER_RADIUS)),
  borderTopEndRadius: PropTypes.oneOf(Object.values(BORDER_RADIUS)),
  borderBottomStartRadius: PropTypes.oneOf(Object.values(BORDER_RADIUS)),
  borderBottomEndRadius: PropTypes.oneOf(Object.values(BORDER_RADIUS)),

  // ELEVATION
  elevation: PropTypes.oneOf(Object.values(ELEVATION)),

  // EVENTS
  cursor: PropTypes.oneOf(Object.values(CURSOR)),
  pointerEvents: PropTypes.oneOf(Object.values(POINTER_EVENTS)),

  // OPACITY
  opacity: PropTypes.oneOf(Object.values(OPACITY)),
};

Box.defaultProps = {
  as: "div",
  children: null,
  display: DISPLAYS.BLOCK,

  // TEXT
  fontFamily: FONT_FAMILIES.SANS,
  letterSpacing: LETTER_SPACINGS.NORMAL,
  lineHeight: LINE_HEIGHTS.NORMAL,
  textAlign: TEXT_ALIGN.LEFT,
  whiteSpace: null,
  wordBreak: null,
  fontSize: FONT_SIZES.BASE,
  fontWeight: FONT_WEIGHTS.NORMAL,
  fontStyle: FONT_STYLES.NORMAL,
  color: null,
  textDecoration: null,
  lines: null,
  userSelect: null,

  // COLORS
  bg: null,
  fill: null,

  // LAYOUT
  w: null,
  maxW: null,
  minW: null,
  h: null,
  maxH: null,
  minH: null,
  overflow: null,
  overflowX: null,
  overflowY: null,
  overscroll: null,
  overscrollX: null,
  overscrollY: null,

  // FLEX
  flexDirection: null,
  flexGap: null,
  flexGapH: null,
  flexGapV: null,
  flexWrap: null,
  flexGrow: null,
  flexShrink: null,
  flexBasis: null,
  justifyContent: null,
  justifyItems: null,
  justifySelf: null,
  alignContent: null,
  alignItems: null,
  alignSelf: null,
  order: null,

  // MARGIN
  m: null,
  mt: null,
  me: null,
  mb: null,
  ms: null,
  mh: null,
  mv: null,

  // PADDING
  p: null,
  pt: null,
  pe: null,
  pb: null,
  ps: null,
  ph: null,
  pv: null,

  // POSITION
  position: null,
  zIndex: null,
  top: null,
  start: null,
  bottom: null,
  end: null,

  // VISIBILITY
  visibility: null,

  // BORDER
  borderWidth: null,
  borderTopWidth: null,
  borderEndWidth: null,
  borderBottomWidth: null,
  borderStartWidth: null,
  borderStyle: null,
  borderColor: null,
  borderRadius: null,
  borderTopStartRadius: null,
  borderTopEndRadius: null,
  borderBottomStartRadius: null,
  borderBottomEndRadius: null,

  // ELEVATION
  elevation: null,

  // EVENTS
  cursor: null,
  pointerEvents: null,

  // OPACITY
  opacity: null,
};

/* ====================================================== */
/*                       Public API                       */
/* ====================================================== */

export { Box, extractBoxProps };
