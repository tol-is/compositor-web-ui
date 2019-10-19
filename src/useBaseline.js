import { css } from 'emotion';

export default ({
  correctionRatio = 0.12,
  capHeightRatio = 0.68,
  gridHeight = 8,
  fontSize = 16,
  measure = 999,
  leading = 0,
  flow = 0
} = {}) => {
  // calculate actual size
  const capSize = capHeightRatio * fontSize;

  // type height in baseline units
  const typeHeight = Math.ceil(capSize / gridHeight) * gridHeight;

  // leading height in baseline units
  const leadingHeight = Math.round(leading) * gridHeight;

  // line height
  const lineHeight = typeHeight + leadingHeight;

  // flow
  const flowHeight = flow * gridHeight;

  // negative space
  const negativeSpace = lineHeight - capSize;

  // height correction
  const heightCorrection =
    negativeSpace > gridHeight
      ? negativeSpace - (negativeSpace % gridHeight)
      : 0;

  // type offset
  const lineHeightRatio = lineHeight / fontSize - 1;
  console.log(lineHeight / fontSize, fontSize / lineHeight);
  const typeOffset = lineHeightRatio / +correctionRatio;

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
    margin-bottom: ${flowHeight}px;
    &:before {
      content: '';
      margin-top: ${-(heightCorrection + preventCollapse)}px;
      display: block;
      height: 0;
    }
  `;
};
