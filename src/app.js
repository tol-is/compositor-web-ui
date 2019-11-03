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
    Helvetica: {
      fontFamily: 'Helvetica',
      showGrid: true,
      debug: false,
      shouldUseBaseline: false,
      baseline: 8,
      capRatio: 0.722,
      correctionRatio: 0.153,
      textIndent: 0.068
    },
    Roboto: {
      fontFamily: 'Roboto',
      showGrid: true,
      debug: false,
      shouldUseBaseline: false,
      baseline: 8,
      capRatio: 0.71,
      correctionRatio: 0.161,
      textIndent: 0.081
    },
    Crete: {
      fontFamily: 'Crete Round',
      showGrid: true,
      debug: false,
      shouldUseBaseline: false,
      baseline: 8,
      capRatio: 0.687,
      correctionRatio: 0.148,
      textIndent: 0.105
    },
    Montserrat: {
      fontFamily: 'Montserrat',
      showGrid: true,
      debug: false,
      shouldUseBaseline: false,
      baseline: 8,
      capRatio: 0.703,
      correctionRatio: 0.141,
      textIndent: 0.074
    },
    Plex: {
      fontFamily: 'IBM Plex Sans',
      showGrid: true,
      debug: false,
      shouldUseBaseline: false,
      baseline: 8,
      capRatio: 0.701,
      correctionRatio: 0.125,
      textIndent: 0.091
    }
  }
];

const App = () => {
  const [params, setParams] = useLocalStorage('params', presets[0].Helvetica);

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
        <DatBoolean path="shouldUseBaseline" label="Cap/Baseline" />
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
