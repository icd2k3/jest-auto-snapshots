import React from 'react';

const customPropType = (props, propName) => {
  if (!/customproptest/.test(props[propName])) {
    return new Error('invalid custom prop');
  }
  return null;
};

const CustomProps = ({
  customProp,
}) => (
  <div>
    {customProp}
  </div>
);

CustomProps.propTypes = {
  customProp: customPropType,
};

export default CustomProps;
