import React, { useContext, useState, useMemo, Fragment } from 'react';
import { css } from 'emotion';

function getRandomColor() {
  var letters = '0ABCD';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 5)];
  }
  return color;
}

import Context from './Context';
import Text from './Text';

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

  const { size, leading, text } = props;

  return (
    <div className={boxClassName}>
      <Text size={size} leading={leading}>
        {text}
      </Text>
    </div>
  );
};
