import React, { useContext, useState, Fragment } from 'react';
import Modal from 'react-modal';

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

  const { size, leading, flow, measure, text } = props;

  return (
    <div style={{ position: 'relative' }}>
      {/* {showDialog && (
        <DatGui
          data={props}
          onUpdate={onUpdate}
          style={{
            position: `absolute`,
            top: 0,
            left: 0,
            top: `calc(100% - ${baseline * 2}px)`,
            zIndex: 999
          }}
        >
          <DatNumber
            path="size"
            label="Font Size"
            min={1}
            max={1000}
            step={1}
          />
          <DatNumber
            path="leading"
            label="Leading Size"
            min={-100}
            max={100}
            step={1}
          />
          <DatNumber path="flor" label="Flow" min={0} max={100} step={1} />
          <DatNumber
            path="measure"
            label="Measure"
            min={1}
            max={999}
            step={1}
          />
        </DatGui>
      )} */}
      <div style={{ zIndex: 0, position: 'relative' }}>
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
    </div>
  );
};
