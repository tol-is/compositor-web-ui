import React, { useContext } from 'react';
import { css } from 'emotion';

import RandoBox from './RandoBox';
import Context from './Context';
import useBaseline from './useBaseline';

export default props => {
  const { debug, baseline, capRatio, correctionRatio } = useContext(Context);

  const cssRules = useBaseline({
    baseline: baseline,
    capRatio: capRatio,
    correctionRatio: correctionRatio,
    fontSize: props.size,
    leading: props.leading,
    flow: props.flow,
    measure: props.measure
  });

  const textClassName = css(cssRules);

  return debug ? (
    <RandoBox>
      <span className={textClassName} {...props} />
    </RandoBox>
  ) : (
    <span className={textClassName} {...props} />
  );
};
