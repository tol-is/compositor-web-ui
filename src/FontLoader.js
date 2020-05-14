import React, { useContext, useEffect, useState } from 'react';
import { css, injectGlobal } from 'emotion';
import fontkit from 'fontkit';
import blobToBuffer from 'blob-to-buffer';

import Context from './Context';

import Inter from './fonts/Inter-Regular.woff2';

const defaultFontUrl = Inter;

export default () => {
  //
  const { setParams, screen, fontFamily, fontData, ...restParams } = useContext(
    Context
  );
  //
  useEffect(() => {
    if (!fontData) {
      loadURL(defaultFontUrl);
    } else {
      injectGlobal`
        @font-face {
          font-family: '${fontFamily}';
          font-style: normal;
          src: url('${fontData}')
              format('opentype');
        }
      `;
    }
  }, [fontData]);

  const onChange = (e) => {
    let file = e.target.files && e.target.files[0];
    if (file) {
      loadBlob(file);
    }
  };

  const loadURL = (url) => {
    fetch(url)
      .then((res) => res.blob())
      .then(loadBlob, console.error);
  };

  const loadBlob = (blob) => {
    blobToBuffer(blob, (err, buffer) => {
      if (err) {
        throw err;
      }

      var reader = new FileReader();
      reader.onload = function (e) {
        const font = fontkit.create(buffer);
        useFont({ fontData: reader.result, font });
      };
      reader.readAsDataURL(blob);
    });
  };

  const setScreen = (screen) => {
    setParams({
      ...restParams,
      screen,
      fontFamily,
      fontData,
      screen: screen,
    });
  };

  const useFont = ({ fontData, font }) => {
    if (!font) return;

    const descenderRatio =
      -1 *
      (((font.ascent + Math.abs(font.descent)) / font.unitsPerEm - 1) / 2 -
        Math.abs(font.descent / font.unitsPerEm));

    setParams({
      ...restParams,
      screen: screen,
      fontData: fontData,
      fontFamily: font.familyName,
      capRatio: font.capHeight / font.unitsPerEm,
      descenderRatio: descenderRatio,
    });

    injectGlobal`
      @font-face {
        font-family: '${font.familyName}';
        font-style: normal;
        src: url('${fontData}')
            format('opentype');
      }
    `;
  };

  return (
    <div
      className={css`
        position: fixed;
        right: 16px;
        z-index: 100;
        top: 0;
        width: 280px;

        height: 57px;
        background-color: #1a1a1a;
        & > .tabs {
          position: relative;
          line-height: 28px;
          height: 28px;
          padding-left: 13px;
          & > button {
            color: #eee;
            font-size: 12px;
            font-family: Lucida Grande, sans-serif;
            -webkit-font-smoothing: antialiased;
            line-height: 28px;
            padding: 0;
            height: 28px;
            background: none;
            margin-right: 20px;
            &.selected {
              text-decoration: underline;
            }
          }
          &:before {
            content: '';
            width: 5px;
            left: 0;
            top: 0;
            bottom: 0;
            position: absolute;
            background-color: #fd62ff;
          }
        }
        & > .upload_button {
          position: relative;
          color: #eee;
          line-height: 28px;
          height: 28px;
          padding-left: 13px;
          font-size: 12px;
          font-family: Lucida Grande, sans-serif;
          -webkit-font-smoothing: antialiased;
          &:before {
            content: '';
            width: 5px;
            left: 0;
            top: 0;
            bottom: 0;
            position: absolute;
            background-color: #fd62ff;
          }
        }
      `}
    >
      <div className="tabs">
        <button
          className={screen === 'config' ? 'selected' : ''}
          type="button"
          onClick={() => setScreen('config')}
        >
          Config
        </button>
        <button
          className={screen === 'preview' ? 'selected' : ''}
          type="button"
          onClick={() => setScreen('preview')}
        >
          Preview
        </button>
      </div>
      <div className="upload_button" tabIndex={-1} aria-hidden={true}>
        Upload Font
        <input
          type="file"
          onChange={onChange}
          className={css`
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            top: 0;
            left: 0;
          `}
        />
      </div>
    </div>
  );
};
