import React from "react";
import PropTypes from "prop-types";
import Dotdotdot from "react-dotdotdot";
import _ from "lodash";
import { Link, matchPath } from "react-router-dom";

/* ====================================================== */
/*                       Components                       */
/* ====================================================== */

import { Box } from "../box/box";
import { Loading } from "../loading/loading";
import {
  DISPLAYS,
  FONT_SIZES,
  FONT_WEIGHTS,
  LETTER_SPACINGS,
  LINE_HEIGHTS,
  WHITE_SPACE,
  OPACITY,
  OVERFLOW,
  POSITION,
  POSITION_COORDINATES,
  TEXT_ALIGN,
  VISIBILITY,
  Z_INDEX,
  FONT_STYLES,
} from "../box/box_prop_types";

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

const FLAVORS = {
  TEXT: "text",
  LINK: "link",
  UNDERLINED_LINK: "underlined-link",
  NEGATIVE_LINK: "negative-link",
};

const Text = React.forwardRef(
  (
    {
      as: T,
      flavor,
      display,
      loading,
      disabled,
      href,
      target,
      onClick,
      to,
      htmlFor,

      // TEXT
      color,
      fontSize,
      fontWeight,
      fontStyle,
      lines,
      textAlign,
      whiteSpace,

      // LAYOUT
      w,
      maxW,
      minW,
      h,
      maxH,
      minH,
      overflow,
      overflowX,
      overflowY,

      // MARGIN
      m,
      mt,
      me,
      mb,
      ms,
      mh,
      mv,

      // PADDING
      p,
      pt,
      pe,
      pb,
      ps,
      ph,
      pv,

      // POSITION
      position,
      zIndex,
      top,
      end,
      bottom,
      start,

      // VISIBILITY
      visibility,

      // OPACITY
      opacity,

      children,
    },
    ref
  ) => {
    const computedProps = {
      fontSize,
      fontWeight,
      fontStyle,
      lines,
      display,
      color,
      bg: "transparent",
      textAlign,
      whiteSpace,

      // LAYOUT
      w,
      maxW,
      minW,
      h,
      maxH,
      minH,
      overflow,
      overflowX,
      overflowY,

      // MARGIN
      m,
      mt,
      me,
      mb,
      ms,
      mh,
      mv,

      // PADDING
      p,
      pt,
      pe,
      pb,
      ps,
      ph,
      pv,

      // POSITION
      position,
      zIndex,
      top,
      end,
      bottom,
      start,

      // VISIBILITY
      visibility,

      // OPACITY
      opacity,
    };

    // Component Type Props
    // --------------------

    let visitedLink = false;

    if (T === Link) {
      const match = to && matchPath(window.location.pathname, { path: to });
      visitedLink = _.get(match, "isExact", false);
      if (!disabled && !loading) computedProps.to = to;
      if (color === "inherit") computedProps.inheritStyle = true;
    }
    if (T === "a") {
      computedProps.cursor = "pointer";
      computedProps.href = href;
      computedProps.target = target || "_blank";
      computedProps.rel = "noopener noreferrer";
    }
    if (T === "button") {
      computedProps.cursor = "pointer";
      computedProps.onClick = onClick;
    }
    if (T === "label") {
      computedProps.htmlFor = htmlFor;
    }

    // Flavor props
    // ------------

    computedProps.textAlign = computedProps.textAlign || "inherit";
    computedProps.color = computedProps.color || "martens";
    computedProps.p = computedProps.p || "0";
    computedProps.m = computedProps.m || "0";
    computedProps.borderWidth = computedProps.borderWidth || "0";
    computedProps.bg = computedProps.bg || "transparent";

    if (flavor === FLAVORS.TEXT) {
      computedProps.textDecoration = "none hover:none";
      if (disabled) {
        computedProps.textDecoration = "none";
        computedProps.cursor = "default";
      }
    }
    if (flavor === FLAVORS.LINK) {
      computedProps.cursor = "pointer";
      computedProps.textDecoration = "none hover:none focus:none";

      if (color === "martens")
        computedProps.color = "martens hover:pool focus:pool";
      if (color === "pool")
        computedProps.color = "pool hover:pool-deep focus:pool-deep";
      if (color === "coral")
        computedProps.color = "coral hover:coral-deep focus:coral-deep";
      if (color === "gunmetal-2")
        computedProps.color = "gunmetal-2 hover:martens focus:martens";

      if (visitedLink) {
        computedProps.cursor = "default";
        computedProps.textDecoration = "underline";
      }
      if (disabled) {
        computedProps.color = "gunmetal-4";
        computedProps.cursor = "default";
      }
    }
    if (flavor === FLAVORS.UNDERLINED_LINK) {
      computedProps.color = computedProps.color || "martens";
      computedProps.cursor = "pointer";
      computedProps.textDecoration =
        "underline hover:underline focus:underline";

      if (color === "martens")
        computedProps.color = "martens hover:pool focus:pool";
      if (color === "pool")
        computedProps.color = "pool hover:pool-deep focus:pool-deep";
      if (color === "coral")
        computedProps.color = "coral hover:coral-deep focus:coral-deep";
      if (color === "gunmetal-2")
        computedProps.color = "gunmetal-2 hover:martens focus:martens";
      if (color === "white")
        computedProps.color = "white hover:pool-light focus:pool-light";

      if (visitedLink) {
        computedProps.cursor = "default";
        computedProps.textDecoration = "underline";
      }
      if (disabled) {
        computedProps.color = "gunmetal-4";
        computedProps.cursor = "default";
        computedProps.textDecoration = "none";
      }
    }
    if (flavor === FLAVORS.NEGATIVE_LINK) {
      computedProps.color = "bananas hover:bananas-light";
      computedProps.cursor = "pointer";
      computedProps.textDecoration = "none";
      if (visitedLink) {
        computedProps.color = "bananas-light";
        computedProps.cursor = "default";
      }
      if (disabled) {
        computedProps.color = "gunmetal-3";
        computedProps.cursor = "default";
      }
    }

    // Font Size props
    // ---------------

    if (fontSize === FONT_SIZES.DISPLAY) {
      computedProps.lineHeight = LINE_HEIGHTS.NONE;
      computedProps.letterSpacing = LETTER_SPACINGS.WIDE;
      if (fontWeight === FONT_WEIGHTS.BOLD) {
        computedProps.letterSpacing = LETTER_SPACINGS.NORMAL;
      }
      if (fontWeight === FONT_WEIGHTS.LIGHT) {
        computedProps.letterSpacing = LETTER_SPACINGS.WIDEST;
      }
    }
    if (fontSize === FONT_SIZES.BIG_TITLE) {
      computedProps.lineHeight = LINE_HEIGHTS.TIGHT;
      computedProps.letterSpacing = LETTER_SPACINGS.WIDE;
      if (fontWeight === FONT_WEIGHTS.BOLD) {
        computedProps.letterSpacing = LETTER_SPACINGS.NORMAL;
      }
      if (fontWeight === FONT_WEIGHTS.LIGHT) {
        computedProps.letterSpacing = LETTER_SPACINGS.WIDEST;
      }
    }
    if (fontSize === FONT_SIZES.MED_TITLE) {
      computedProps.lineHeight = LINE_HEIGHTS.TIGHT;
      computedProps.letterSpacing = LETTER_SPACINGS.NORMAL;
      if (fontWeight === FONT_WEIGHTS.BOLD) {
        computedProps.letterSpacing = LETTER_SPACINGS.NORMAL;
      }
      if (fontWeight === FONT_WEIGHTS.LIGHT) {
        computedProps.letterSpacing = LETTER_SPACINGS.WIDE;
      }
    }
    if (fontSize === FONT_SIZES.TITLE) {
      computedProps.lineHeight = LINE_HEIGHTS.NORMAL;
      computedProps.letterSpacing = LETTER_SPACINGS.NORMAL;
      if (fontWeight === FONT_WEIGHTS.BOLD) {
        computedProps.letterSpacing = LETTER_SPACINGS.TIGHT;
      }
      if (fontWeight === FONT_WEIGHTS.LIGHT) {
        computedProps.letterSpacing = LETTER_SPACINGS.WIDE;
      }
    }
    if (fontSize === FONT_SIZES.SUBTITLE) {
      computedProps.lineHeight = LINE_HEIGHTS.RELAXED;
      computedProps.letterSpacing = LETTER_SPACINGS.NORMAL;
      if (fontWeight === FONT_WEIGHTS.BOLD) {
        computedProps.letterSpacing = LETTER_SPACINGS.TIGHT;
      }
      if (fontWeight === FONT_WEIGHTS.LIGHT) {
        computedProps.letterSpacing = LETTER_SPACINGS.WIDE;
      }
    }
    if (fontSize === FONT_SIZES.BIG_BODY) {
      computedProps.lineHeight = LINE_HEIGHTS.LOOSE;
      computedProps.letterSpacing = LETTER_SPACINGS.NORMAL;
      if (fontWeight === FONT_WEIGHTS.BOLD) {
        computedProps.letterSpacing = LETTER_SPACINGS.NORMAL;
      }
      if (fontWeight === FONT_WEIGHTS.LIGHT) {
        computedProps.letterSpacing = LETTER_SPACINGS.WIDE;
      }
    }
    if (fontSize === FONT_SIZES.BODY) {
      computedProps.lineHeight = LINE_HEIGHTS.RELAXED;
      computedProps.letterSpacing = LETTER_SPACINGS.TIGHT;
      if (fontWeight === FONT_WEIGHTS.BOLD) {
        computedProps.letterSpacing = LETTER_SPACINGS.TIGHT;
      }
      if (fontWeight === FONT_WEIGHTS.LIGHT) {
        computedProps.letterSpacing = LETTER_SPACINGS.NORMAL;
      }
    }
    if (fontSize === FONT_SIZES.CAPTION) {
      computedProps.lineHeight = LINE_HEIGHTS.SNUG;
      computedProps.letterSpacing = LETTER_SPACINGS.TIGHT;
      if (fontWeight === FONT_WEIGHTS.BOLD) {
        computedProps.letterSpacing = LETTER_SPACINGS.TIGHT;
      }
      if (fontWeight === FONT_WEIGHTS.LIGHT) {
        computedProps.letterSpacing = LETTER_SPACINGS.NORMAL;
      }
    }
    if (fontSize === FONT_SIZES.SMOL) {
      computedProps.lineHeight = LINE_HEIGHTS.NONE;
      computedProps.letterSpacing = LETTER_SPACINGS.TIGHT;
      if (fontWeight === FONT_WEIGHTS.BOLD) {
        computedProps.letterSpacing = LETTER_SPACINGS.TIGHT;
      }
      if (fontWeight === FONT_WEIGHTS.LIGHT) {
        computedProps.letterSpacing = LETTER_SPACINGS.NORMAL;
      }
    }

    // Render
    // ------

    if (lines > 1) {
      return (
        <Dotdotdot clamp={lines} useNativeClamp>
          <Box as={T} ref={ref} {...computedProps}>
            {loading ? <Loading /> : children}
          </Box>
        </Dotdotdot>
      );
    }
    return (
      <Box as={T} ref={ref} {...computedProps}>
        {loading ? <Loading /> : children}
      </Box>
    );
  }
);

Text.displayName = "Text";

Text.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  flavor: PropTypes.oneOf(Object.values(FLAVORS)),
  display: PropTypes.oneOf(Object.values(DISPLAYS)),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  target: PropTypes.oneOf(["_blank", "_self", "_parent", "_top", "framename"]),
  onClick: PropTypes.func,
  externalLinkIcon: PropTypes.bool,
  to: PropTypes.string,
  htmlFor: PropTypes.string,

  // TEXT
  color: PropTypes.string,
  fontSize: PropTypes.oneOf(Object.values(FONT_SIZES)),
  fontWeight: PropTypes.oneOf(Object.values(FONT_WEIGHTS)),
  fontStyle: PropTypes.oneOf(Object.values(FONT_STYLES)),
  lines: PropTypes.number,
  textAlign: PropTypes.oneOf(Object.values(TEXT_ALIGN)),
  whiteSpace: PropTypes.oneOf(Object.values(WHITE_SPACE)),

  // LAYOUT
  w: PropTypes.string,
  maxW: PropTypes.string,
  minW: PropTypes.string,
  h: PropTypes.string,
  maxH: PropTypes.string,
  minH: PropTypes.string,
  overflow: PropTypes.oneOf(Object.values(OVERFLOW)),
  overflowX: PropTypes.oneOf(Object.values(OVERFLOW)),
  overflowY: PropTypes.oneOf(Object.values(OVERFLOW)),

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

  // OPACITY
  opacity: PropTypes.oneOf(Object.values(OPACITY)),

  children: PropTypes.node.isRequired,
};

Text.defaultProps = {
  as: "span",
  flavor: FLAVORS.TEXT,
  display: null,
  loading: false,
  disabled: false,
  href: undefined,
  target: "_blank",
  onClick: _.noop,
  externalLinkIcon: false,
  to: undefined,
  htmlFor: undefined,

  // TEXT
  textAlign: TEXT_ALIGN.LEFT,
  fontSize: FONT_SIZES.BODY,
  fontWeight: FONT_WEIGHTS.NORMAL,
  fontStyle: FONT_STYLES.NORMAL,
  whiteSpace: null,
  color: "martens",
  lines: -1,

  // COLORS

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
  end: null,
  bottom: null,
  start: null,

  // VISIBILITY
  visibility: null,

  // OPACITY
  opacity: null,
};

/* ====================================================== */
/*                       Public API                       */
/* ====================================================== */

export { Text };
