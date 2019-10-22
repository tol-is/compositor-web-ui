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
    Initial: {
      fontFamily: 'system-ui',
      showGrid: true,
      debug: false,
      baseline: 8,
      capRatio: 0.704,
      correctionRatio: 0.112,
      textIndent: 0.068
    },
    Mark: {
      fontFamily: 'MarkOT',
      showGrid: true,
      debug: false,
      baseline: 8,
      capRatio: 0.694,
      correctionRatio: 0.12,
      textIndent: 0.1
    },
    Comb: {
      fontFamily: 'Comb',
      showGrid: true,
      debug: false,
      baseline: 8,
      capRatio: 0.694,
      correctionRatio: 0.25,
      textIndent: 0.055
    }
  }
];

const App = () => {
  const [params, setParams] = useLocalStorage('params', presets[0].Initial);

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
        <DatBoolean path="showGrid" label="Grid" />
        <DatBoolean path="debug" label="Debug" />
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
        <DatNumber
          path="textIndent"
          label="Text Indent"
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
