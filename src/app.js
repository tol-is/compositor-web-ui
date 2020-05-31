import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { css } from 'emotion';
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
      text: 'Lorem ipsum adipisicing nulla',
      size: 96,
      measure: 15,
      leading: 1,
    },
    {
      text:
        'Officia ipsum adipisicing nulla aliquip enim in adipisicing ut sint voluptate sunt. Magna sint amet ullamco proident culpa eiusmod officia amet ea ea. Ullamco quis laboris labore et elit aliquip consectetur enim do sit amet cupidatat.',
      size: 32,
      measure: 45,
      leading: 1,
    },
  ],
  screen: 'config',
  fontFamily: 'Averta PE',
  showGrid: true,
  debug: false,
  baseline: 16,
  rhythm: 4,
  upm: 1000,
  ascent: 978,
  descent: -258,
  capHeight: 710,
  xHeight: 486,
  lineHeight: 1,
  fontSize: 550,
  fontData: null,
  blocker: true,
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
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      size: 32,
      leading: 3,
    });

    setParams({
      ...params,
      text,
    });
  };

  const killBlocker = () => {
    setParams({
      ...params,
      blocker: false,
    });
  };

  const reset = () => {
    setParams(defaultParams);
  };

  const { screen } = params;

  return !guiParams ? null : (
    <Context.Provider
      value={{
        setParams: setParams,
        ...guiParams,
      }}
    >
      {params.blocker && (
        <div
          className={css`
            display: none;
            @media screen and (max-width: 1000px) {
              display: block;
              z-index: 999;
              width: 100%;
              height: 100vh;
              position: fixed;
              background-color: white;
              top: 0;
              padding: 2rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}
          onClick={() => killBlocker(true)}
        >
          <p
            className={css`
              max-width: 50ch;
            `}
          >
            Sorry, this thing won't scale well below 1000px viewport width.
            <br />
            If you want to continue, just click anywhere.
          </p>
        </div>
      )}
      {screen === 'config' ? (
        <DatGui
          data={guiParams}
          onUpdate={handleUpdate}
          style={{ zIndex: 100, top: '57px' }}
        >
          <DatString path="fontFamily" label="Font" />
          <DatNumber
            path="lineHeight"
            label="Line Height"
            min={0.8}
            max={3}
            step={0.1}
          />
          <DatNumber
            path="fontSize"
            label="Font Size"
            min={12}
            max={1000}
            step={1}
          />
          <DatString path="upm" label="Units per Em" />
          <DatNumber
            path="xHeight"
            label="X Height"
            min={0}
            max={guiParams.upm}
            step={1}
          />
          <DatNumber
            path="capHeight"
            label="Cap Height"
            min={0}
            max={guiParams.upm}
            step={1}
          />
          <DatNumber
            path="ascent"
            label="Ascender"
            min={0}
            max={guiParams.upm}
            step={1}
          />
          <DatNumber
            path="descent"
            label="Descender"
            min={-guiParams.upm}
            max={guiParams.upm}
            step={1}
          />
          <DatButton onClick={() => reset()} label="Reset" />
        </DatGui>
      ) : (
        <DatGui
          data={guiParams}
          onUpdate={handleUpdate}
          style={{ zIndex: 100, top: '57px' }}
        >
          <DatBoolean path="showGrid" label="Grid" />
          <DatBoolean path="debug" label="Debug" />
          <DatNumber
            path="baseline"
            label="Baseline"
            min={2}
            max={100}
            step={1}
          />
          <DatNumber path="rhythm" label="Rhythm" min={0} max={24} step={1} />

          {guiParams.text.map((t, idx) => (
            <DatFolder title={`Text ${idx}`}>
              <DatString path={`text[${idx}.text]`} label="Text" />
              <DatNumber
                path={`text[${idx}].size`}
                label="Size"
                min={1}
                max={400}
                step={1}
              />
              <DatNumber
                path={`text[${idx}].leading`}
                label="Leading"
                min={-4}
                max={20}
                step={1}
              />
              <DatNumber
                path={`text[${idx}].measure`}
                label="Measure"
                min={10}
                max={65}
                step={1}
              />
              <DatButton
                onClick={() => removeNode(idx)}
                label="Remove Text Node"
              />
            </DatFolder>
          ))}
          <DatButton
            target="_blank"
            onClick={() => addNode()}
            label="Add Text Node"
          />
          <DatButton target="_blank" onClick={() => reset()} label="Reset" />
        </DatGui>
      )}
      <FontLoader />
      <Main />
    </Context.Provider>
  );
};

render(<App />, document.getElementById('___baseline'));
