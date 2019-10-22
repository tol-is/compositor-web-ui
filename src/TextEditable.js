import React, { useContext, useState, useMemo, Fragment } from 'react';
import Modal from 'react-modal';
import { css } from 'emotion';

function getRandomColor() {
  var letters = '0ABCD';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 5)];
  }
  return color;
}

import DatGui, {
  DatBoolean,
  DatNumber,
  DatPresets
} from '@tim-soft/react-dat-gui';

import Context from './Context';
import Text from './Text';

export default ({ onUpdate, ...props }) => {
  const { debug, baseline } = useContext(Context);
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

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

  const { size, leading, flow, measure, text } = props;

  return (
    <div className={boxClassName}>
      <Text
        size={size}
        leading={leading}
        flow={flow}
        measure={measure}
        onClick={open}
      >
        {text}
      </Text>
    </div>
  );
};
