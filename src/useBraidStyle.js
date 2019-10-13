import { css } from 'emotion';

const gridHeight = 8;

export default ({ typeSize = 24, lineGap = 1.5 } = {}) => {
  const fontSize = typeSize;

  const correctionRatio = 0.12;
  const capHeight = 0.68;

  const calculateTypeOffset = lh => {
    const lineHeightScale = lh / fontSize;
    return (lineHeightScale - 1) / 2 + correctionRatio;
  };

  const lineHeight = Math.round((fontSize * lineGap) / gridHeight) * gridHeight;
  const typeOffset = calculateTypeOffset(lineHeight);

  const topSpace = lineHeight - capHeight * fontSize;
  const heightCorrection =
    topSpace > gridHeight ? topSpace - (topSpace % gridHeight) : 0;

  const preventCollapse = 1;

  return css`
    display: inline-block;
    position: relative;
    font-family: 'MarkOT';
    font-size: ${fontSize}px;
    line-height: ${lineHeight}px;
    transform: translateY(${typeOffset}em) translateX(-0.1em);
    padding-top: ${preventCollapse}px;
    &:before {
      content: '';
      margin-top: ${-(heightCorrection + preventCollapse)}px;
      display: block;
      height: 0;
    }
  `;
};
