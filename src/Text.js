import React, { useContext } from 'react';
import { css } from 'emotion';

import Context from './Context';
import useBaseline from './useBaseline';
import useCapsize from './useCapsize';

export default props => {
  const {
    fontFamily,
    baseline,
    capRatio,
    correctionRatio,
    textIndent,
    shouldUseBaseline
  } = useContext(Context);

  const params = {
    fontFamily: fontFamily,
    baseline: baseline,
    capRatio: capRatio,
    textIndent: textIndent,
    correctionRatio: correctionRatio,
    fontSize: props.size,
    leading: props.leading,
    flow: props.flow,
    measure: props.measure
  };
  const cssRules = shouldUseBaseline ? useBaseline(params) : useCapsize(params);

  const textClassName = css(cssRules);

  return <span className={textClassName} {...props} />;
};
