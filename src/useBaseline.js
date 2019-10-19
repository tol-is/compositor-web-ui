// not sure why this is needed
const preventCollapse = 1;

export default ({
  correctionRatio = 0.12,
  capRatio = 0.681,
  baseline = 8,
  fontSize = 16,
  measure = 999,
  leading = 0,
  flow = 0
} = {}) => {
  // line height
  const capSize = capRatio * fontSize;
  const typeHeight = Math.ceil(capSize / baseline) * baseline;
  const leadingHeight = Math.round(leading) * baseline;
  const lineHeight = typeHeight + leadingHeight;

  // align to baseline
  const typeOffset = (lineHeight / fontSize - 1) / 2 + correctionRatio;

  // height correction
  const negativeSpace = lineHeight - typeHeight;
  const heightCorrection = negativeSpace - (negativeSpace % baseline);

  // flow
  const flowHeight = flow * baseline;

  return `
    display: block;
    vertical-align: top;
    max-width: ${measure}ch;
    position: relative;
    font-family: 'MarkOT';
    font-size: ${fontSize}px;
    line-height: ${lineHeight}px;
    transform: translateY(${typeOffset}em) translateX(-0.08em);
    padding-top: ${preventCollapse}px;
    margin-top: ${flowHeight}px;
    margin-bottom: ${flowHeight}px;
    &:before {
      content: '';
      margin-top: ${-(heightCorrection + preventCollapse)}px;
      display: block;
      height: 0;
    }
  `;
};
