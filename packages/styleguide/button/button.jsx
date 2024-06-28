import React from "react";
import PropTypes from "prop-types";

/* ====================================================== */
/*                       Components                       */
/* ====================================================== */

import { Box } from "../box/box";
import {
  ALIGN_SELF,
  DISPLAYS,
  FLEX_GROW,
  FLEX_SHRINK,
  JUSTIFY_SELF,
} from "../box/box_prop_types";

import { Loading } from "../loading/loading";

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

const noop = () => {};

const SIZES = {
  XL: "xl",
  L: "l",
  M: "m",
  S: "s",
  XS: "xs",
};

const FLAVORS = {
  PRIMARY: "primary",
  OUTLINED: "outlined",
  NEGATIVE: "negative",
  TEXT: "text",
  DANGER: "danger",
  BANANA: "banana",
};

const Button = React.memo(
  React.forwardRef(
    (
      {
        // Component Props
        as: T,
        type,
        flavor,
        size,
        skeleton,
        isLoading,
        isDisabled,
        href,
        target,
        onClick,
        onBlur,
        to,
        children,
        form,
        // Box Props that can be overwritten
        w,
        maxW,
        minW,
        display,
        m,
        mt,
        me,
        mb,
        ms,
        mh,
        mv,
        flexGrow,
        flexShrink,
        justifySelf,
        alignSelf,
      },
      ref
    ) => {
      const { buttonProps, buttonTextProps, buttonLoadingProps } =
        React.useMemo(
          () =>
            getButtonProps({
              type,
              T,
              size,
              flavor,
              isLoading,
              isDisabled,
              skeleton,
              href,
              target,
              to,
              form,
              w,
              maxW,
              minW,
              display,
              m,
              mt,
              me,
              mb,
              ms,
              mh,
              mv,
              flexGrow,
              flexShrink,
              justifySelf,
              alignSelf,
            }),
          [
            type,
            T,
            size,
            flavor,
            isLoading,
            isDisabled,
            skeleton,
            href,
            target,
            to,
            form,
            w,
            maxW,
            minW,
            display,
            m,
            mt,
            me,
            mb,
            ms,
            mh,
            mv,
            flexGrow,
            flexShrink,
            justifySelf,
            alignSelf,
          ]
        );

      return (
        <Box
          as={skeleton ? "span" : T}
          onClick={isDisabled || isLoading ? noop : onClick}
          onBlur={isDisabled || isLoading ? noop : onBlur}
          to={to}
          ref={ref}
          {...buttonProps}
        >
          {isLoading && (
            <Loading color={buttonLoadingProps.color} display="flex" />
          )}
          {!isLoading && (
            <Box
              as="span"
              position="relative"
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              h="parent"
              w="parent"
              opacity={isLoading ? "0" : "1"}
              maxW="parent"
              lines={1}
              {...buttonTextProps}
            >
              {children}
            </Box>
          )}
        </Box>
      );
    }
  )
);

Button.displayName = "Button";

Button.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  flavor: PropTypes.oneOf(Object.values(FLAVORS)).isRequired,
  size: PropTypes.oneOf(Object.values(SIZES)),
  skeleton: PropTypes.bool,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  href: PropTypes.string,
  to: PropTypes.string,
  target: PropTypes.string,
  form: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,

  // Box Props
  w: PropTypes.string,
  maxW: PropTypes.string,
  minW: PropTypes.string,
  display: PropTypes.oneOf(Object.values(DISPLAYS)),
  m: PropTypes.string,
  mt: PropTypes.string,
  me: PropTypes.string,
  mb: PropTypes.string,
  ms: PropTypes.string,
  mh: PropTypes.string,
  mv: PropTypes.string,
  flexGrow: PropTypes.oneOf(Object.values(FLEX_GROW)),
  flexShrink: PropTypes.oneOf(Object.values(FLEX_SHRINK)),
  justifySelf: PropTypes.oneOf(Object.values(JUSTIFY_SELF)),
  alignSelf: PropTypes.oneOf(Object.values(ALIGN_SELF)),
};

Button.defaultProps = {
  as: "button",
  type: "button",
  size: "m",
  skeleton: false,
  isLoading: false,
  isDisabled: false,
  href: "",
  target: "",
  to: null,
  form: null,
  onClick: noop,
  onBlur: noop,

  // Box Props
  w: null,
  maxW: null,
  minW: null,
  m: null,
  mt: null,
  me: null,
  mb: null,
  ms: null,
  mh: null,
  mv: null,
  display: null,
  flexGrow: null,
  flexShrink: null,
  justifySelf: null,
  alignSelf: null,
};

/* ====================================================== */
/*                       Public API                       */
/* ====================================================== */

export { Button };

/* ====================================================== */
/*                        Helpers                         */
/* ====================================================== */

function getButtonProps({
  type,
  T,
  size,
  flavor,
  isLoading,
  isDisabled,
  skeleton,
  href,
  target,
  form,
  w,
  maxW,
  minW,
  display,
  m,
  mt,
  me,
  mb,
  ms,
  mh,
  mv,
  flexGrow,
  flexShrink,
  justifySelf,
  alignSelf,
}) {
  let buttonProps = {
    type,
    display: "inline",
    position: "relative",
    borderWidth: "1",
    borderRadius: "4",
    borderStyle: "solid",
    cursor: isDisabled ? "not-allowed" : "pointer",
    "aria-disabled": isDisabled,
    textDecoration: "none hover:none focus:none active:none",
  };

  const buttonTextProps = {
    fontWeight: "normal",
    fontFamily: "sans",
    lineHeight: "none",
    letterSpacing: "normal",
  };

  const buttonLoadingProps = { color: "gunmetal-5" };

  if (size === SIZES.XL) {
    buttonTextProps.fontSize = "big-body";
    buttonProps.h = "14";
    buttonProps.maxW = "112";
    buttonProps.minW = "24";
    buttonProps.ph = "6";
  }
  if (size === SIZES.L) {
    buttonTextProps.fontSize = "body";
    buttonProps.h = "12";
    buttonProps.maxW = "112";
    buttonProps.minW = "24";
    buttonProps.ph = "5";
  }
  if (size === SIZES.M) {
    buttonTextProps.fontSize = "caption";
    buttonProps.h = "10";
    buttonProps.maxW = "112";
    buttonProps.minW = "24";
    buttonProps.ph = "4";
  }
  if (size === SIZES.S) {
    buttonTextProps.fontSize = "smol";
    buttonProps.h = "8";
    buttonProps.maxW = "112";
    buttonProps.minW = "18";
    buttonProps.ph = "3";
  }
  if (size === SIZES.XS) {
    buttonTextProps.fontSize = "smol";
    buttonProps.h = "6";
    buttonProps.maxW = "112";
    buttonProps.minW = "18";
    buttonProps.ph = "3";
  }

  if (flavor === FLAVORS.PRIMARY) {
    buttonLoadingProps.color = "white";
    buttonProps.color = "white hover:white focus:white active:white";
    buttonProps.borderColor = "transparent";
    buttonProps.bg = "pool hover:pool-deep focus:pool-deep active:pool-deep";
    if (isLoading) {
      buttonProps.bg = "pool-deep";
    }
    if (isDisabled) {
      buttonProps.bg = "gunmetal-5";
      buttonTextProps.color = "gunmetal-3";
    }
  }
  if (flavor === FLAVORS.OUTLINED) {
    buttonLoadingProps.color = "martens";
    buttonProps.color = "gunmetal-1";
    buttonProps.borderColor = "gunmetal-3";
    buttonProps.bg =
      "transparent hover:gunmetal-5 focus:gunmetal-5 active:gunmetal-5";
    if (isLoading) {
      buttonProps.bg = "gunmetal-5";
      buttonTextProps.color = "gunmetal-1";
    }
    if (isDisabled) {
      buttonProps.borderColor = "gunmetal-5";
      buttonProps.bg = "gunmetal-5";
      buttonProps.color = "gunmetal-3";
    }
  }
  if (flavor === FLAVORS.NEGATIVE) {
    buttonLoadingProps.color =
      "white hover:martens focus:martens active:martens";
    buttonProps.color =
      "white hover:gunmetal-1 focus:gunmetal-1 active:gunmetal-1";
    buttonProps.borderColor = "white";
    buttonProps.bg = "transparent hover:white focus:white active:white";
    if (isDisabled) {
      buttonProps.color = "gunmetal-4";
      buttonProps.bg = "gunmetal-5";
    }
  }

  if (flavor === FLAVORS.TEXT) {
    buttonLoadingProps.color = "martens";
    buttonProps.color = "gunmetal-1 hover:gunmetal-1 focus:pool active:pool";
    buttonProps.borderColor = "transparent";
    buttonProps.bg = "transparent hover:gunmetal-5";
    if (isLoading) {
      buttonProps.color = "pool-deep";
    }
    if (isDisabled) {
      buttonProps.color = "gunmetal-3";
      buttonProps.bg = "transparent";
    }
  }
  if (flavor === FLAVORS.DANGER) {
    buttonLoadingProps.color = "white";
    buttonProps.color = "white";
    buttonProps.borderColor = "transparent";
    buttonProps.bg =
      "coral hover:coral-deep focus:coral-deep active:coral-deep";
    if (isDisabled) {
      buttonProps.color = "gunmetal-3";
      buttonProps.bg = "gunmetal-5";
      buttonProps.color = "gunmetal-3";
    }
  }
  if (flavor === FLAVORS.BANANA) {
    buttonProps.color = "martens";
    buttonLoadingProps.color = "martens";
    buttonProps.borderColor = "transparent";
    buttonProps.bg =
      "bananas hover:bananas-deep focus:bananas-deep active:bananas-deep";
    if (isDisabled) {
      buttonProps.color = "gunmetal-3";
      buttonProps.bg = "gunmetal-5";
      buttonProps.color = "gunmetal-3";
    }
  }

  if (skeleton) {
    buttonTextProps.color = "transport";
    buttonProps.bg = "gunmetal-5";
  }

  if (T === "a") {
    buttonProps = {
      href,
      target: target || "_blank",
      rel: "noopener noreferrer",
      as: isDisabled || isLoading ? "span" : "a",
      ...buttonProps,
    };
  }

  if (T === "button" && type === "submit") {
    buttonProps.form = form;
  }

  // Overriden box props
  if (w) buttonProps.w = w || buttonProps.w;
  if (maxW) buttonProps.maxW = maxW || buttonProps.maxW;
  if (minW) buttonProps.minW = minW || buttonProps.minW;
  if (display) buttonProps.display = display || buttonProps.display;
  if (m) buttonProps.m = m || buttonProps.m;
  if (mt) buttonProps.mt = mt || buttonProps.mt;
  if (me) buttonProps.me = me || buttonProps.me;
  if (mb) buttonProps.mb = mb || buttonProps.mb;
  if (ms) buttonProps.ms = ms || buttonProps.ms;
  if (mh) buttonProps.mh = mh || buttonProps.mh;
  if (mv) buttonProps.mv = mv || buttonProps.mv;
  if (flexGrow) buttonProps.flexGrow = flexGrow || buttonProps.flexGrow;
  if (flexShrink) buttonProps.flexShrink = flexShrink || buttonProps.flexShrink;
  if (justifySelf)
    buttonProps.justifySelf = justifySelf || buttonProps.justifySelf;
  if (alignSelf) buttonProps.alignSelf = alignSelf || buttonProps.alignSelf;

  if (isLoading) {
    buttonProps.display = "flex";
    buttonProps.alignItems = "center";
    buttonProps.justifyContent = "center";
  }

  return { buttonProps, buttonTextProps, buttonLoadingProps };
}
