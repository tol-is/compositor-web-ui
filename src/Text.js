import { h } from 'preact';

import useBraidStyle from './useBraidStyle';

const fontSizes = [112, 32, 20, 18];
export default props => {
  const braidStyle = useBraidStyle({
    typeSize: fontSizes[props.size],
    lineGap: props.lineGap
  });
  return <span className={braidStyle} {...props} />;
};
