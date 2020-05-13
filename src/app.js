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
      text:
        'Officia ipsum adipisicing nulla aliquip enim in adipisicing ut sint voluptate sunt. Magna sint amet ullamco proident culpa eiusmod officia amet ea ea. Ullamco quis laboris labore et elit aliquip consectetur enim do sit amet cupidatat.',
      size: 32,
      leading: 3,
    },
  ],
  fontFamily: 'Inter',
  showGrid: true,
  shouldUseBaseline: true,
  debug: false,
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

  const reset = () => {
    setParams(defaultParams);
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
            <DatButton
              onClick={() => removeNode(idx)}
              label="Remove Text Node"
            />
          </DatFolder>
        ))}
        <DatButton onClick={() => addNode()} label="Add Text Node" />
        <DatBoolean path="showGrid" label="Grid" />
        <DatBoolean path="debug" label="Debug" />
        <DatBoolean path="shouldUseBaseline" label="Cap Size/Baseline" />
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
          label="Descender Ratio"
          min={0}
          max={1}
          step={0.001}
        />
        <DatButton onClick={() => reset()} label="Reset" />
      </DatGui>
      <FontLoader />
      <Main />
    </Context.Provider>
  );
};

render(<App />, document.getElementById('___baseline'));
