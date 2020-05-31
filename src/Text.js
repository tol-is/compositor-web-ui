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
  const { debug } = useContext(Context);

  const bg = useMemo(() => getRandomColor(), []);

  const boxClassName = css`
    position: relative;
    display: block;
    width: auto;
    ${debug &&
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

  return (
    <div className={boxClassName}>
      <TextBaseline fontSize={props.size} leading={props.leading}>
        {props.text}
      </TextBaseline>
    </div>
  );
};
