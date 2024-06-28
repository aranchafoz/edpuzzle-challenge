import classnames from "classnames";
import _ from "lodash";
import { TEXT_DIRECTIONS } from "../styleguide_provider";

/* ====================================================== */
/*                         Styles                         */
/* ====================================================== */

import styles from "./box.module.css";

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

const REPLACABLE_CHARACTER = "^";

function calculateStyles(props, { breakpoint, textDirection }) {
  const { givenStyle, boxProps, otherNonBoxProps } = extractBoxProps(props);

  const parseStylesForBreakpoint = (value, prefix, style) =>
    parseStyles(value, prefix, style, breakpoint);

  if (parseStylesForBreakpoint(boxProps.render, "", "").className === "false") {
    return {
      otherNonBoxProps,
      className: "",
      style: givenStyle,
      shouldRender: false,
    };
  }

  const _styles = [
    { className: styles.box },

    // DISPLAY
    // -------

    parseStylesForBreakpoint(boxProps.display, "d-", "display"),

    // BACKGROUNDS
    // -----------

    parseStylesForBreakpoint(boxProps.bg, "bg-c-", "backgroundColor"),

    // COLORS
    // ------

    parseStylesForBreakpoint(boxProps.fill, "fill-", "fill"),

    // SIZES
    // -----

    parseStylesForBreakpoint(boxProps.w, "w-", "width"),
    parseStylesForBreakpoint(boxProps.maxW, "max-w-", "max-width"),
    parseStylesForBreakpoint(boxProps.minW, "min-w-", "min-width"),
    parseStylesForBreakpoint(boxProps.h, "h-", "height"),
    parseStylesForBreakpoint(boxProps.maxH, "max-h-", "max-height"),
    parseStylesForBreakpoint(boxProps.minH, "min-h-", "min-height"),

    // FLEXBOX
    // -------

    parseStylesForBreakpoint(
      boxProps.flexDirection,
      "fx-dir-",
      "flex-direction"
    ),
    parseStylesForBreakpoint(boxProps.flexWrap, "fx-", "flex-wrap"),
    parseStylesForBreakpoint(boxProps.flexGrow, "fx-gr-", "flex-grow"),
    parseStylesForBreakpoint(boxProps.flexShrink, "fx-sh-", "flex-shrink"),
    parseStylesForBreakpoint(boxProps.flexBasis, "fx-bs-", "flex-basis"),
    parseStylesForBreakpoint(
      boxProps.justifyContent,
      "fx-jc-",
      "justify-content"
    ),
    parseStylesForBreakpoint(boxProps.justifyItems, "fx-ji-", "justify-items"),
    parseStylesForBreakpoint(boxProps.justifySelf, "fx-js-", "justify-self"),
    parseStylesForBreakpoint(boxProps.alignContent, "fx-ac-", "align-content"),
    parseStylesForBreakpoint(boxProps.alignItems, "fx-ai-", "align-items"),
    parseStylesForBreakpoint(boxProps.alignSelf, "fx-as-", "align-self"),
    parseStylesForBreakpoint(boxProps.order, "fx-ord-", "order"),
    parseStylesForBreakpoint(boxProps.flexGap, "fx-gap-", "gap"),
    parseStylesForBreakpoint(boxProps.flexGapH, "fx-gap-h-", "column-gap"),
    parseStylesForBreakpoint(boxProps.flexGapV, "fx-gap-v-", "row-gap"),

    // GRID
    // ----

    // OVERFLOWS
    // ---------

    parseStylesForBreakpoint(boxProps.overflow, "ofw-", "overflow"),
    parseStylesForBreakpoint(boxProps.overflowX, "ofw-x-", "overflow-x"),
    parseStylesForBreakpoint(boxProps.overflowY, "ofw-y-", "overflow-y"),

    // OVERSCROLL
    // ---------

    parseStylesForBreakpoint(
      boxProps.overscroll,
      "overscroll-",
      "overscroll-behavior"
    ),
    parseStylesForBreakpoint(
      boxProps.overscrollX,
      "overscroll-x",
      "overscroll-behavior-x"
    ),
    parseStylesForBreakpoint(
      boxProps.overscrollY,
      "overscroll-y",
      "overscroll-behavior-y"
    ),

    // MARGINS
    // -------

    parseStylesForBreakpoint(boxProps.m, "m-", "margin"),
    parseStylesForBreakpoint(boxProps.mt, "mt-", "margin-top"),
    parseStylesForBreakpoint(
      boxProps.me,
      textDirection === TEXT_DIRECTIONS.LTR ? "mr-" : "ml-",
      textDirection === TEXT_DIRECTIONS.LTR ? "margin-right" : "margin-left"
    ),
    parseStylesForBreakpoint(boxProps.mb, "mb-", "margin-bottom"),
    parseStylesForBreakpoint(
      boxProps.ms,
      textDirection === TEXT_DIRECTIONS.LTR ? "ml-" : "mr-",
      textDirection === TEXT_DIRECTIONS.LTR ? "margin-left" : "margin-right"
    ),
    parseStylesForBreakpoint(boxProps.mh, "mh-", "margin-left,margin-right"),
    parseStylesForBreakpoint(boxProps.mv, "mv-", "margin-top,margin-bottom"),

    // PADDINGS
    // --------

    parseStylesForBreakpoint(boxProps.p, "p-", "padding"),
    parseStylesForBreakpoint(boxProps.pt, "pt-", "padding-top"),
    parseStylesForBreakpoint(
      boxProps.pe,
      textDirection === TEXT_DIRECTIONS.LTR ? "pr-" : "pl-",
      textDirection === TEXT_DIRECTIONS.LTR ? "padding-right" : "padding-left"
    ),
    parseStylesForBreakpoint(boxProps.pb, "pb-", "padding-bottom"),
    parseStylesForBreakpoint(
      boxProps.ps,
      textDirection === TEXT_DIRECTIONS.LTR ? "pl-" : "pr-",
      textDirection === TEXT_DIRECTIONS.LTR ? "padding-left" : "padding-right"
    ),
    parseStylesForBreakpoint(boxProps.ph, "ph-", "padding-left,padding-right"),
    parseStylesForBreakpoint(boxProps.pv, "pv-", "padding-top,padding-bottom"),

    // Z-INDEXES
    // ---------

    parseStylesForBreakpoint(boxProps.zIndex, "z-", "z-index"),

    // VISIBILITY
    // ----------

    parseStylesForBreakpoint(boxProps.visibility, "v-", "visibility"),

    // POSITIONS
    // ---------

    parseStylesForBreakpoint(boxProps.position, "pos-", "position"),
    parseStylesForBreakpoint(boxProps.top, "t-", "top"),
    parseStylesForBreakpoint(
      boxProps.end,
      textDirection === TEXT_DIRECTIONS.LTR ? "r-" : "l-",
      textDirection === TEXT_DIRECTIONS.LTR ? "right" : "left"
    ),
    parseStylesForBreakpoint(boxProps.bottom, "b-", "bottom"),
    parseStylesForBreakpoint(
      boxProps.start,
      textDirection === TEXT_DIRECTIONS.LTR ? "l-" : "r-",
      textDirection === TEXT_DIRECTIONS.LTR ? "left" : "right"
    ),

    // BORDERS
    // -------

    parseStylesForBreakpoint(boxProps.borderColor, "bor-c-", "border-color"),
    parseStylesForBreakpoint(boxProps.borderStyle, "bor-", "border-style"),
    parseStylesForBreakpoint(boxProps.borderWidth, "bor-w-", "border-width"),
    parseStylesForBreakpoint(
      boxProps.borderTopWidth,
      "bor-t-w-",
      "border-top-width"
    ),
    parseStylesForBreakpoint(
      boxProps.borderEndWidth,
      textDirection === TEXT_DIRECTIONS.LTR ? "bor-r-w-" : "bor-l-w-",
      textDirection === TEXT_DIRECTIONS.LTR
        ? "border-right-width"
        : "border-left-width"
    ),
    parseStylesForBreakpoint(
      boxProps.borderBottomWidth,
      "bor-b-w-",
      "border-bottom-width"
    ),
    parseStylesForBreakpoint(
      boxProps.borderStartWidth,
      textDirection === TEXT_DIRECTIONS.LTR ? "bor-l-w-" : "bor-r-w-",
      textDirection === TEXT_DIRECTIONS.LTR
        ? "border-left-width"
        : "border-right-width"
    ),
    parseStylesForBreakpoint(boxProps.borderRadius, "bor-r-", "border-radius"),
    parseStylesForBreakpoint(
      boxProps.borderTopStartRadius,
      textDirection === TEXT_DIRECTIONS.LTR ? "bor-tl-r-" : "bor-tr-r-",
      textDirection === TEXT_DIRECTIONS.LTR
        ? "border-top-left-radius"
        : "border-top-right-radius"
    ),
    parseStylesForBreakpoint(
      boxProps.borderTopEndRadius,
      textDirection === TEXT_DIRECTIONS.LTR ? "bor-tr-r-" : "bor-tl-r-",
      textDirection === TEXT_DIRECTIONS.LTR
        ? "border-top-right-radius"
        : "border-top-left-radius"
    ),
    parseStylesForBreakpoint(
      boxProps.borderBottomStartRadius,
      textDirection === TEXT_DIRECTIONS.LTR ? "bor-bl-r-" : "bor-br-r-",
      textDirection === TEXT_DIRECTIONS.LTR
        ? "border-bottom-left-radius"
        : "border-bottom-right-radius"
    ),
    parseStylesForBreakpoint(
      boxProps.borderBottomEndRadius,
      textDirection === TEXT_DIRECTIONS.LTR ? "bor-br-r-" : "bor-bl-r-",
      textDirection === TEXT_DIRECTIONS.LTR
        ? "border-bottom-right-radius"
        : "border-bottom-left-radius"
    ),

    // ELEVATION
    // -------
    parseStylesForBreakpoint(boxProps.elevation, "elevation-", "box-shadow"),

    // EVENTS
    // ------

    parseStylesForBreakpoint(
      boxProps.pointerEvents,
      "point-",
      "pointer-events"
    ),
    parseStylesForBreakpoint(boxProps.cursor, "cur-", "cursor"),

    // OPACITY
    // -------

    parseStylesForBreakpoint(boxProps.opacity, "op-", "opacity"),

    // TYPOGRAPHY
    // ----------

    {
      className: classnames(
        styles.txt_antialiased,
        boxProps.lines === 1 && styles["txt_one-liner"]
      ),
    },
    parseStylesForBreakpoint(boxProps.fontFamily, "txt_", "font-family"),
    parseStylesForBreakpoint(boxProps.color, "txt_", "color"),
    parseStylesForBreakpoint(
      boxProps.letterSpacing,
      "txt_ls-",
      "letter-spacing"
    ),
    parseStylesForBreakpoint(boxProps.lineHeight, "txt_lh-", "line-height"),
    parseStylesForBreakpoint(boxProps.textAlign, "txt_ta-", "text-align"),
    parseStylesForBreakpoint(
      boxProps.textDecoration,
      "txt_dec-",
      "text-decoration"
    ),
    parseStylesForBreakpoint(boxProps.fontSize, "txt_", "font-size"),
    parseStylesForBreakpoint(boxProps.fontWeight, "txt_fw-", "font-weight"),
    parseStylesForBreakpoint(boxProps.fontStyle, "txt_fs-", "font-style"),
    parseStylesForBreakpoint(boxProps.whiteSpace, "txt_ws-", "white-space"),
    parseStylesForBreakpoint(boxProps.wordBreak, "txt_break-", "word-break"),
    parseStylesForBreakpoint(boxProps.userSelect, "txt_us-", "user-select"),
  ];

  return {
    otherNonBoxProps,
    className: classnames(_styles.map(({ className }) => className)),
    style: _styles.reduce(
      (previousValue, { style }) =>
        style ? { ...previousValue, ...style } : previousValue,
      { ...givenStyle }
    ),
    shouldRender: true,
  };
}

/* ====================================================== */
/*                       Public API                       */
/* ====================================================== */

export { extractBoxProps, calculateStyles, parseStyles };

/* ====================================================== */
/*                         Helpers                        */
/* ====================================================== */

const BREAKPOINT_MODIFIERS = ["xs", "sm", "md", "lg", "xl", "2xl"];
const MODIFIERS = ["hover", "focus", "active"];

function parseStyles(value = "", prefix, style, breakpoint) {
  if (_.isNull(value) || _.isUndefined(value)) return {};

  const globalStyles = _.reduce(
    MODIFIERS,
    (acc, key) => ({ ...acc, [key]: "" }),
    { idle: "" }
  );
  const parsedStyles = BREAKPOINT_MODIFIERS.map(() => ({}));
  const breakpointIndex = _.indexOf(BREAKPOINT_MODIFIERS, breakpoint);

  value
    .toString()
    .split(" ")
    .forEach((_value) => {
      const items = _value.split(":");
      if (items.length === 1) {
        globalStyles.idle = _value;
      } else if (items.length === 2 && _.includes(MODIFIERS, items[0])) {
        globalStyles[items[0]] = items[1];
      } else if (
        items.length === 2 &&
        _.includes(BREAKPOINT_MODIFIERS, items[0])
      ) {
        const index = _.indexOf(BREAKPOINT_MODIFIERS, items[0]);
        parsedStyles[index].idle = items[1];
      } else if (
        items.length === 3 &&
        _.includes(BREAKPOINT_MODIFIERS, items[0])
      ) {
        const index = _.indexOf(BREAKPOINT_MODIFIERS, items[0]);
        parsedStyles[index][items[1]] = items[2];
      }
    });

  let defaultStyle = { ...globalStyles };
  const breakpointStyles = parsedStyles.map((_style) => {
    defaultStyle = { ...defaultStyle, ..._style };
    return defaultStyle;
  });

  const breakpointStyle = breakpointStyles[breakpointIndex];

  return parseBreakpointStyle({ value: breakpointStyle, prefix, style });
}

function parseBreakpointStyle({ value, prefix, style }) {
  let inlineStyle = {};
  let className = "";

  _.forEach(value, (v, modifier) => {
    const { className: _className, style: _inlineStyle } = parseStyle({
      value: v,
      prefix: modifier !== "idle" ? `${prefix}${modifier}:` : prefix,
      style,
    });
    if (_className) className += `${_className} `;
    if (_inlineStyle && modifier === "idle")
      inlineStyle = { ...inlineStyle, ..._inlineStyle };
  });

  return {
    className: _.trim(className) ? _.trim(className) : undefined,
    style: _.isEmpty(inlineStyle) ? undefined : inlineStyle,
  };
}

function parseStyle({ value, prefix, style }) {
  // Inline Styles
  // -------------

  if (_.startsWith(value, "[") && _.endsWith(value, "]")) {
    const _styles = {};
    let styleValue = value.replace("]", "").replace("[", ""); // _.replace(_.replace(value, ']', ''), '[', '')
    if (_.includes(styleValue, "calc(")) {
      const cssVariables = extractCssVariables(styleValue);

      // on styleValue, we identify breakpoint and modifier blocks by the space they are surrounded by
      // calc() only accepts operators surrounded by spaces
      // since css variables include dashes, we need to extract the variables, replace operators with spaces and then put them back

      let usableStyleValue = replaceCssVariablesForSpecialCharacter(styleValue);

      usableStyleValue = usableStyleValue.replace("-", " - ");
      usableStyleValue = usableStyleValue.replace("+", " + ");
      usableStyleValue = usableStyleValue.replace("/", " / ");
      usableStyleValue = usableStyleValue.replace("*", " * ");

      styleValue = replaceVarWithCssVariables({
        styleValue: usableStyleValue,
        cssVariables,
      });
    }
    style.split(",").forEach((_style) => {
      _styles[_style] = styleValue;
    });
    return { style: _styles };
  }

  // Classes
  // -------

  if (!value && !_.isFinite(value)) return {};

  return {
    className: value
      .toString()
      .split(" ")
      .map((_v) => styles[`${prefix}${_v}`])
      .join(" "),
  };
}

function extractCssVariables(styleValue) {
  return styleValue?.match(/var\((--[^)]+)\)/g) || [];
}

function replaceCssVariablesForSpecialCharacter(styleValue) {
  return styleValue?.replace(/var\((--[^)]+)\)/g, REPLACABLE_CHARACTER);
}

function replaceVarWithCssVariables({ styleValue, cssVariables }) {
  if (!cssVariables.length || !styleValue) return styleValue;

  cssVariables.forEach((cssVariable) => {
    styleValue = styleValue.replace(
      new RegExp(`\\${REPLACABLE_CHARACTER}`),
      cssVariable
    );
  });

  return styleValue;
}

function extractBoxProps({
  // TYPOGRAPHY
  fontFamily,
  fontSize,
  fontWeight,
  fontStyle,
  color,
  letterSpacing,
  lineHeight,
  lines,
  textAlign,
  textDecoration,
  whiteSpace,
  wordBreak,
  userSelect,
  // COLORS
  bg,
  fill,
  // LAYOUT
  w,
  maxW,
  minW,
  h,
  maxH,
  minH,
  display,
  overflow,
  overflowX,
  overflowY,
  overscroll,
  overscrollX,
  overscrollY,
  // FLEX
  flexDirection,
  flexWrap,
  flexGrow,
  flexShrink,
  flexBasis,
  justifyContent,
  justifyItems,
  justifySelf,
  alignContent,
  alignItems,
  alignSelf,
  order,
  flexGap,
  flexGapH,
  flexGapV,

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
  // BORDER
  borderWidth,
  borderTopWidth,
  borderEndWidth,
  borderBottomWidth,
  borderStartWidth,
  borderStyle,
  borderColor,
  borderRadius,
  borderTopStartRadius,
  borderTopEndRadius,
  borderBottomStartRadius,
  borderBottomEndRadius,
  // ELEVATION
  elevation,
  // EVENTS
  cursor,
  pointerEvents,
  // OPACITY
  opacity,
  // RESPONSIVENESS
  render,
  // DEFAULTS
  className, // Ignore given className
  style,
  // NON BOX PROPS
  ...otherNonBoxProps
}) {
  return {
    givenStyle: style,
    otherNonBoxProps,
    boxProps: _.omit(
      {
        // TYPOGRAPHY
        fontFamily,
        fontSize,
        fontWeight,
        fontStyle,
        color,
        letterSpacing,
        lineHeight,
        lines,
        textAlign,
        textDecoration,
        whiteSpace,
        wordBreak,
        userSelect,
        // COLORS
        bg,
        fill,
        // LAYOUT
        w,
        maxW,
        minW,
        h,
        maxH,
        minH,
        display,
        overflow,
        overflowX,
        overflowY,
        overscroll,
        overscrollX,
        overscrollY,
        // FLEX
        flexDirection,
        flexWrap,
        flexGrow,
        flexShrink,
        flexBasis,
        justifyContent,
        justifyItems,
        justifySelf,
        alignContent,
        alignItems,
        alignSelf,
        order,
        flexGap,
        flexGapH,
        flexGapV,
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
        // BORDER
        borderWidth,
        borderTopWidth,
        borderEndWidth,
        borderBottomWidth,
        borderStartWidth,
        borderStyle,
        borderColor,
        borderRadius,
        borderTopStartRadius,
        borderTopEndRadius,
        borderBottomStartRadius,
        borderBottomEndRadius,
        // ELEVATION
        elevation,
        // EVENTS
        cursor,
        pointerEvents,
        // OPACITY
        opacity,
        // RESPONSIVENESS
        render,
      },
      _.isUndefined
    ),
  };
}
