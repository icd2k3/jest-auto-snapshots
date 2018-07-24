import React from 'react';
import customPropType from './customPropType';

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
