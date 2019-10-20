import React from 'react';
import { render } from 'react-dom';
import useLocalStorage from './useLocalStorage';
import Main from './Main';
import DatGui, {
  DatBoolean,
  DatNumber,
  DatPresets
} from '@tim-soft/react-dat-gui';

import Context from './Context';

const presets = [
  {
    Mark: {
      showGrid: true,
      debug: true,
      baseline: 8,
      capRatio: 0.691,
      correctionRatio: 0.12
    }
  }
];

const App = () => {
  const [params, setParams] = useLocalStorage('params', presets[0].Mark);

  // const reset = () => {
  //   setParams(defaults);
  // };

  const handleUpdate = newData =>
    setParams({
      ...params,
      ...newData
    });

  return (
    <Context.Provider
      value={{
        ...params
      }}
    >
      <DatGui data={params} onUpdate={handleUpdate} style={{ zIndex: 100 }}>
        <DatPresets label="Presets" options={presets} onUpdate={handleUpdate} />
        <DatBoolean path="showGrid" label="Show Grid" />
        <DatBoolean path="debug" label="Show Boxes" />
        <DatNumber
          path="baseline"
          label="Baseline"
          min={2}
          max={100}
          step={1}
        />
        <DatNumber
          path="capRatio"
          label="Cap Ratio"
          min={0}
          max={1}
          step={0.001}
        />
        <DatNumber
          path="correctionRatio"
          label="Correction Ratio"
          min={0}
          max={1}
          step={0.001}
        />
      </DatGui>
      <Main />
    </Context.Provider>
  );
};

render(<App />, document.getElementById('___baseline'));
