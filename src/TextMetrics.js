import React, { useContext } from 'react';
import { css } from 'emotion';
import Context from './Context';

import Guide from './Guide';

export default ({ children, fontSize, lineHeight = 1.2 }) => {
  const {
    fontFamily,
    capHeight,
    xHeight,
    ascent,
    descent,
    upm: unitsPerEm,
  } = useContext(Context);

  // const { capHeight, xHeight, ascent, descent, unitsPerEm } = font;

  const lineHeightRatio = lineHeight;
  const capHeightRatio = capHeight / unitsPerEm;
  const xHeightRatio = xHeight / unitsPerEm;
  const ascenderRatio = ascent / unitsPerEm;
  const descenderRatio = descent / unitsPerEm;
  const baselineRatio = descenderRatio * -1;
  const boundingBoxRatio = (ascent + Math.abs(descent)) / unitsPerEm;
  const lineGapRatio = lineHeightRatio - boundingBoxRatio;

  const originOffset = (lineGapRatio / 2) * fontSize;
  const baselineOffset = originOffset + baselineRatio * fontSize;
  const ascenderOffset = baselineOffset + ascenderRatio * fontSize;
  const capHeightOffset = baselineOffset + capHeightRatio * fontSize;
  const xHeightOffset = baselineOffset + xHeightRatio * fontSize;
  const descenderOffset = baselineOffset + descenderRatio * fontSize;

  return (
    <div
      className={css`
        position: relative;
        flex: 0;
        display: inline-block;
      `}
    >
      <Guide.Box
        hue={180}
        height={boundingBoxRatio * fontSize + 1}
        origin={originOffset}
        y={originOffset - 1}
        x={110}
        width={100}
        label="bounding box"
      />

      <Guide.Box
        hue={180}
        origin={originOffset}
        height={lineHeightRatio * fontSize}
        y={0}
        x={0}
        width={100}
        label="line-height"
      />
      <span
        type="text"
        className={css`
          width: auto;
          display: block;
          vertical-align: top;
          position: relative;
          font-family: ${fontFamily};
          font-size: ${fontSize}px;
          line-height: ${lineHeight};
          letter-spacing: -0.08em;
          background-color: transparent;
          outline: none;
          color: inherit;
        `}
      >
        {children}
      </span>
      <Guide.RulerH hue={120} y={ascenderOffset} label="ascender" />
      <Guide.RulerH hue={120} y={capHeightOffset} label="cap-height" />
      <Guide.RulerH hue={120} y={xHeightOffset} label="x-height" />
      <Guide.RulerH hue={120} y={descenderOffset} label="descender" />
      <Guide.RulerH hue={120} y={baselineOffset} label="baseline" />
    </div>
  );
};
