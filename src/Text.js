import { h } from 'preact';

import useBraidStyle from './useBraidStyle.v1';

export default props => {
  const braidStyle = useBraidStyle({
    fontSize: props.size,
    leading: props.leading,
    flow: props.flow,
    measure: props.measure
  });
  return <span className={braidStyle} {...props} />;
};
