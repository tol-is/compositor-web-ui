import React, { useContext } from 'react';
import { css } from 'emotion';
import Context from './Context';

const baseline = 8;
const leading = 0;
const preventCollapse = 1;

export default ({ children, fontSize = 14, leading = 0, measure = 100 }) => {
  const { baseline, fontFamily, capHeight, ascent, descent, upm } = useContext(
    Context
  );

  // // cap height
  const capHeightRatio = capHeight / upm;
  const ascenderRatio = ascent / upm;
  const descenderRatio = descent / upm;
  const preventCollapseRatio = 1 / fontSize;

  // type
  const capSize = capHeightRatio * fontSize;
  const typeRows = Math.ceil(capSize / baseline);
  const typeHeight = typeRows * baseline;
  const typeHeightRatio = typeHeight / fontSize;

  // leading
  const leadingRound = Math.round(leading);

  // if negative min value is typeRows
  const leadingValue =
    leadingRound < 0
      ? Math.min(Math.abs(leadingRound), typeRows) * -1
      : leadingRound;

  const leadingHeight = leadingValue * baseline;
  const lineHeight = typeHeight + leadingHeight;
  const lineHeightRatio = lineHeight / fontSize;
  const whiteSpaceHalf = (1 - lineHeightRatio) / 2;

  // leading trim
  const trimBottom =
    Math.abs(descenderRatio) - whiteSpaceHalf + preventCollapseRatio;

  const trimTop =
    ascenderRatio - typeHeightRatio - whiteSpaceHalf + preventCollapseRatio;

  return (
    <span
      className={css`
        display: block;
        vertical-align: bottom;
        position: relative;
        font-family: '${fontFamily}';
        font-size: ${fontSize}px;
        line-height: ${lineHeightRatio};
        padding: ${preventCollapseRatio}em 0;
        &:before{
          content: '';
          display:block;
          margin-bottom:${trimTop * -1}em;
          height: 0;   
        }
        &:after{
          content: '';
          display:block;
          margin-bottom:${trimBottom * -1}em;
          height: 0;   
        }
        `}
    >
      {children}
    </span>
  );
};
