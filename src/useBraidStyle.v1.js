import { css } from 'emotion';

const gridHeight = 8;
const correctionRatio = 0.12;
const capHeight = 0.68;

const calculateTypeOffset = correctionRatio => fontSize => lh => {
  const lhRatio = lh / fontSize;
  return (lhRatio - 1) / 2 + correctionRatio;
};

export default ({
  fontSize = 16,
  measure = 999,
  leading = 0,
  flow = 0
} = {}) => {
  // calculate actual size
  const actualSize = capHeight * fontSize;

  // type in grid lines
  const typeGridHeight = Math.ceil(actualSize / gridHeight) * gridHeight;

  // leading height in baseline units
  const leadingHeight = Math.floor(leading) * gridHeight;

  // line height is visible typeHeight
  const lineHeight = typeGridHeight + leadingHeight;

  const verticalRhythm = flow * 8;

  // negative space
  const negativeSpace = lineHeight - actualSize;

  // type offset
  const typeOffset = calculateTypeOffset(correctionRatio)(fontSize)(lineHeight);

  // height correction
  const heightCorrection =
    negativeSpace > gridHeight
      ? negativeSpace - (negativeSpace % gridHeight)
      : 0;

  // add 1px space
  const preventCollapse = 1;

  return css`
    display: block;
    max-width: ${measure}ch;
    position: relative;
    font-family: 'MarkOT';
    font-size: ${fontSize}px;
    line-height: ${lineHeight}px;
    transform: translateY(${typeOffset}em) translateX(-0.08em);
    padding-top: ${preventCollapse}px;
    margin-bottom: ${verticalRhythm}px;
    &:before {
      content: '';
      margin-top: ${-(heightCorrection + preventCollapse)}px;
      display: block;
      height: 0;
    }
  `;
};
