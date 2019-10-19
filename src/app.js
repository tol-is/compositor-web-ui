import { h, render } from 'preact';
import useLocalStorage from './useLocalStorage';
import Main from './Main';
import DatGui, {
  DatBoolean,
  DatButton,
  DatColor,
  DatFolder,
  DatNumber,
  DatPresets,
  DatSelect,
  DatString
} from '@tim-soft/react-dat-gui';

import Context from './Context';

const defaults = {
  showGrid: true,
  debug: true,
  baseline: 8,
  capRatio: 0.694,
  correctionRatio: 0.12
};

const App = () => {
  const [params, setParams] = useLocalStorage('params', defaults);

  const reset = () => {
    setParams(defaults);
  };

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
      <DatGui data={params} onUpdate={handleUpdate} style={{ zIndex: 999 }}>
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
        <DatButton label="Reset" onClick={reset} />
      </DatGui>
      <Main />
    </Context.Provider>
  );
};

render(<App />, document.body);
