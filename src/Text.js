import React, { useContext, useMemo, Fragment } from 'react';
import { css } from 'emotion';

import Context from './Context';
import useBaseline from './useBaseline';
import useCapsize from './useCapsize';

function getRandomColor() {
  var letters = '0ABCD';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 5)];
  }
  return color;
}

export default ({ onUpdate, ...props }) => {
  const { debug, screen } = useContext(Context);

  const bg = useMemo(() => getRandomColor(), []);

  const boxClassName = css`
    position: relative;
    display: block;
    width: auto;
    ${(debug || screen === 'config') &&
    `
    &:before {
      top: 0;
      left: 0;
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 10;
      opacity: 0.45;
      background-color: ${bg};
    }
    `}
  `;

  const { fontFamily, baseline, capRatio, correctionRatio } = useContext(
    Context
  );

  const params = {
    fontFamily: fontFamily,
    baseline: baseline,
    capRatio: capRatio,
    correctionRatio: correctionRatio,
    fontSize: props.size,
    leading: props.leading,
  };
  const cssRules =
    screen === 'config' ? useCapsize(params) : useBaseline(params);

  const textClassName = css(cssRules);

  return (
    <div className={boxClassName}>
      <span className={textClassName}>{props.text}</span>
    </div>
  );
};
