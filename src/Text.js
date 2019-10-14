import { h } from 'preact';

import useBraidStyle from './useBraidStyle';

export default props => {
  const braidStyle = useBraidStyle({
    fontSize: props.size,
    leading: props.leading,
    flow: props.flow,
    measure: props.measure
  });
  return <span className={braidStyle} {...props} />;
};
