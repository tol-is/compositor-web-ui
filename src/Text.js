import React, { useContext, useMemo } from 'react';
import { css } from 'emotion';

import Context from './Context';
import TextBaseline from './TextBaseline';

function getRandomColor() {
  var letters = '0ABCD';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 5)];
  }
  return color;
}

export default ({ onUpdate, ...props }) => {
  const { debug, baseline } = useContext(Context);

  const bg = useMemo(() => getRandomColor(), []);

  const boxClassName = css`
    position: relative;
    display: block;
    width: auto;
    padding-top: ${props.mt * baseline}px;
    padding-bottom: ${props.mb * baseline}px;
    ${debug && `background-color: ${bg};`}
  `;

  return (
    <div className={boxClassName}>
      <TextBaseline
        fontSize={props.size}
        leading={props.leading}
        measure={props.measure}
      >
        {props.text}
      </TextBaseline>
    </div>
  );
};
