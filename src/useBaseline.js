// not sure why this is needed
const preventCollapse = 1;

export default ({
  correctionRatio = 0,
  capRatio = 0.6,
  baseline = 8,
  fontSize = 16,
  measure = 999,
  leading = 0,
  flow = 0
} = {}) => {
  // ink height
  const capSize = capRatio * fontSize;
  // ink in baseline units / round up
  const typeRows = Math.ceil(capSize / baseline);
  // type height in px
  const typeHeight = typeRows * baseline;

  // round leading
  const leadingRound = Math.round(leading);
  // if negative min value is typeRows
  const leadingValue =
    leadingRound < 0
      ? Math.min(Math.abs(leadingRound), typeRows) * -1
      : leadingRound;

  // leading height in px
  const leadingHeight = leadingValue * baseline;

  // line-height in px
  const lineHeight = typeHeight + leadingHeight;

  // crop white space
  const negativeSpace = lineHeight - typeHeight;
  const cropHeight = negativeSpace - (negativeSpace % baseline);

  // align to baseline
  const typeOffset = (lineHeight / fontSize - 1) / 2 + correctionRatio;

  // vertical flow
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
      margin-top: ${-(cropHeight + preventCollapse)}px;
      display: block;
      height: 0;
    }
  `;
};
