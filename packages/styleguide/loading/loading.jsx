import React from "react";
import PropTypes from "prop-types";

/* ====================================================== */
/*                       Components                       */
/* ====================================================== */

import { Box } from "../box/box";

import styles from "./loading.module.css";
import {
  ALIGN_SELF,
  DISPLAYS,
  FLEX_GROW,
  FLEX_SHRINK,
  JUSTIFY_SELF,
  TEXT_ALIGN,
} from "../box/box_prop_types";

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

const Loading = React.memo(
  ({
    color,
    // Box Props that can be overwritten
    w,
    maxW,
    minW,
    h,
    maxH,
    minH,
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
    textAlign,
  }) => {
    return (
      <Box
        w={w}
        maxW={maxW}
        minW={minW}
        h={h}
        maxH={maxH}
        minH={minH}
        display={display}
        m={m}
        mt={mt}
        me={me}
        mb={mb}
        ms={ms}
        mh={mh}
        mv={mv}
        flexGrow={flexGrow}
        flexShrink={flexShrink}
        justifySelf={justifySelf}
        alignSelf={alignSelf}
        textAlign={textAlign}
        fill={color}
      >
        <svg className={styles.Loading}>
          <circle cx="3" cy="3" r="2">
            <animate
              attributeName="cy"
              from="10"
              to="10"
              begin="0"
              dur="1s"
              values="10; 3; 10"
              calcMode="spline"
              keySplines="0.2 0.8 0.2 1; 0.8 0.2 1 0.2"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="12" cy="3" r="2">
            <animate
              attributeName="cy"
              from="10"
              to="10"
              begin="0.3s"
              dur="1s"
              values="10; 3; 10"
              calcMode="spline"
              keySplines="0.2 0.8 0.2 1; 0.8 0.2 1 0.2"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="21" cy="3" r="2">
            <animate
              attributeName="cy"
              from="10"
              to="10"
              begin="0.6s"
              dur="1s"
              values="10; 3; 10"
              calcMode="spline"
              keySplines="0.2 0.8 0.2 1; 0.8 0.2 1 0.2"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </Box>
    );
  }
);

Loading.propTypes = {
  color: PropTypes.string,
  w: PropTypes.string,
  maxW: PropTypes.string,
  minW: PropTypes.string,
  h: PropTypes.string,
  maxH: PropTypes.string,
  minH: PropTypes.string,
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
  textAlign: PropTypes.oneOf(Object.values(TEXT_ALIGN)),
};

Loading.defaultProps = {
  color: "gunmetal-4",
  // Box Props
  w: null,
  maxW: null,
  minW: null,
  h: null,
  maxH: null,
  minH: null,
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
  textAlign: null,
};

/* ====================================================== */
/*                       Public API                       */
/* ====================================================== */

export { Loading };
