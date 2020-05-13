// not sure why this is needed
const preventCollapse = 1;

export default ({
  fontFamily = 'system-ui',
  capRatio = 0.6,
  correctionRatio = 0,
  textIndent = 0,
  baseline = 8,
  fontSize = 16,
  leading = 0,
} = {}) => {
  // ink height
  const capSize = capRatio * fontSize;
  // ink in baseline units / round up
  const typeRows = Math.ceil(capSize / baseline);
  // type height in px
  const typeHeight = capSize;

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

  return `
    display: block;
    position: relative;
    font-family: ${fontFamily};
    font-size: ${fontSize}px;
    line-height: ${lineHeight}px;
    transform: translateY(${typeOffset}em) translateX(-${textIndent}em);
    padding-top: ${preventCollapse}px;
    &:before {
      content: '';
      margin-top: ${-(cropHeight + preventCollapse)}px;
      display: block;
      height: 0;
    }
  `;
};
