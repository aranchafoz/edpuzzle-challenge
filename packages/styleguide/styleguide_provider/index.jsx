import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { useMediaQuery } from "../hooks/use_media_query";

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

const BREAKPOINTS = {
  XS: 480,
  SM: 768,
  MD: 992,
  LG: 1200,
  XL: 1600,
};

const TEXT_DIRECTIONS = {
  LTR: "ltr",
  RTL: "rtl",
};

const StyleguideContext = React.createContext(null);

const StyleguideProvider = ({ children }) => {
  // States
  // ------

  const [breakpoint, setBreakpoint] = React.useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth < BREAKPOINTS.XS) return "xs";
    if (windowWidth >= BREAKPOINTS.XS && windowWidth < BREAKPOINTS.SM)
      return "sm";
    if (windowWidth >= BREAKPOINTS.SM && windowWidth < BREAKPOINTS.MD)
      return "md";
    if (windowWidth >= BREAKPOINTS.MD && windowWidth < BREAKPOINTS.LG)
      return "lg";
    if (windowWidth >= BREAKPOINTS.LG && windowWidth < BREAKPOINTS.XL)
      return "xl";
    if (windowWidth >= BREAKPOINTS.XL) return "2xl";
    return "";
  });
  const [textDirection, setTextDirection] = React.useState(() => {
    const htmlNode = _.first(document.querySelector("html"));
    return _.get(htmlNode, "dir", TEXT_DIRECTIONS.LTR);
  });

  // Text Direction
  // --------------

  const changeTextDirection = React.useCallback(
    ({ newTextDirection }) => {
      if (newTextDirection === textDirection) return;

      if (!_.includes(_.values(TEXT_DIRECTIONS), newTextDirection)) {
        throw new Error(`Invalid text direction: ${newTextDirection}`);
      }

      setTextDirection(newTextDirection);
      const htmlNode = _.first(document.querySelector("html"));
      htmlNode.dir = newTextDirection;
    },
    [textDirection]
  );

  // Media Queries
  // -------------

  useMediaQuery({
    name: "xs",
    query: `(max-width: ${BREAKPOINTS.XS}px)`,
    onActive: setBreakpoint,
  });
  useMediaQuery({
    name: "sm",
    query: `(min-width: ${BREAKPOINTS.XS}px) and (max-width: ${BREAKPOINTS.SM}px)`,
    onActive: setBreakpoint,
  });
  useMediaQuery({
    name: "md",
    query: `(min-width: ${BREAKPOINTS.SM}px) and (max-width: ${BREAKPOINTS.MD}px)`,
    onActive: setBreakpoint,
  });
  useMediaQuery({
    name: "lg",
    query: `(min-width: ${BREAKPOINTS.MD}px) and (max-width: ${BREAKPOINTS.LG}px)`,
    onActive: setBreakpoint,
  });
  useMediaQuery({
    name: "xl",
    query: `(min-width: ${BREAKPOINTS.LG}px) and (max-width: ${BREAKPOINTS.XL}px)`,
    onActive: setBreakpoint,
  });
  useMediaQuery({
    name: "2xl",
    query: `(min-width: ${BREAKPOINTS.XL}px)`,
    onActive: setBreakpoint,
  });

  // Context Value
  // -------------

  const contextValue = React.useMemo(
    () => ({
      breakpoint,
      textDirection,
      changeTextDirection,
    }),
    [textDirection, breakpoint, changeTextDirection]
  );

  return (
    <StyleguideContext.Provider value={contextValue}>
      {children}
    </StyleguideContext.Provider>
  );
};

StyleguideProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/* ====================================================== */
/*                       Public API                       */
/* ====================================================== */

const useBreakpoint = () => React.useContext(StyleguideContext).breakpoint;
const useTextDirection = () =>
  React.useContext(StyleguideContext).textDirection;

export { StyleguideProvider, useBreakpoint, useTextDirection, TEXT_DIRECTIONS };
