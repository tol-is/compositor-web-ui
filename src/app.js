import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import useLocalStorage from './useLocalStorage';
import DatGui, {
  DatString,
  DatBoolean,
  DatNumber,
  DatFolder,
  DatButton,
} from '@tim-soft/react-dat-gui';

import Main from './Main';
import FontLoader from './FontLoader';

import Context from './Context';

const defaultParams = {
  text: [
    {
      text: 'XO',
      size: 400,
      leading: 0,
    },
    {
      text:
        'Veniam eu commodo labore proident. Nulla amet aliquip ex culpa laboris irure exercitation in excepteur consectetur. Officia aliquip Lorem et laboris.',
      size: 32,
      leading: 3,
    },
  ],
  fontFamily: 'Inter',
  showGrid: true,
  debug: true,
  shouldUseBaseline: true,
  baseline: 8,
  capRatio: 0.727,
  correctionRatio: 0.136,
  textIndent: 0.091,
  fontData: null,
};

const App = () => {
  const [params, setParams] = useLocalStorage('params', defaultParams);

  const [guiParams, setGuiParams] = useState(params);

  useEffect(() => {
    setGuiParams(params);
  }, [params]);

  const handleUpdate = (newData) =>
    setParams({
      ...params,
      ...newData,
    });

  const removeNode = (idx) => {
    const { text } = guiParams;
    text.splice(idx, 1);
    setParams({
      ...params,
      text,
    });
  };

  const addNode = () => {
    const { text } = guiParams;
    text.push({
      text: 'X',
      size: 32,
      leading: 0,
    });

    setParams({
      ...params,
      text,
    });
  };

  return !guiParams ? null : (
    <Context.Provider
      value={{
        setParams: setParams,
        ...guiParams,
      }}
    >
      <DatGui
        data={guiParams}
        onUpdate={handleUpdate}
        style={{ zIndex: 100, top: '28px' }}
      >
        {guiParams.text.map((t, idx) => (
          <DatFolder title={`Text ${idx}`}>
            <DatString path={`text[${idx}.text]`} label="Text" />
            <DatNumber
              path={`text[${idx}].size`}
              label="Size"
              min={16}
              max={400}
              step={1}
            />
            <DatNumber
              path={`text[${idx}].leading`}
              label="Leading"
              min={0}
              max={20}
              step={1}
            />
            <DatButton onClick={() => removeNode(idx)} label="Remove Node" />
          </DatFolder>
        ))}
        <DatButton onClick={() => addNode()} label="Add Node" />
        <DatBoolean path="showGrid" label="Copy" />
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
      </DatGui>
      <FontLoader />
      <Main />
    </Context.Provider>
  );
};

render(<App />, document.getElementById('___baseline'));
