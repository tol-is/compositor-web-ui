import React, { useContext, useEffect, useState } from 'react';
import { css, injectGlobal } from 'emotion';
import fontkit from 'fontkit';

import blobToBuffer from 'blob-to-buffer';

import Context from './Context';

import Inter from './fonts/Inter-Regular.woff2';

const defaultFontUrl = Inter;

export default () => {
  //
  const { setParams, fontFamily, fontData, ...restParams } = useContext(
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
  }, []);

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

  const useFont = ({ fontData, font }) => {
    if (!font) return;

    setParams({
      ...restParams,
      fontData: fontData,
      fontFamily: font.familyName,
      capRatio: font.capHeight / font.unitsPerEm,
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
        font-size: 12px;
        font-family: Lucida Grande, sans-serif;
        height: 28px;
        background-color: #1a1a1a;
        & > * {
          position: relative;
          color: #eee;
          line-height: 28px;
          padding-left: 13px;
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
      <div type="button" tabIndex={-1} aria-hidden={true}>
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
