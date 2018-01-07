import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ stringProp, booleanProp, nodeProp }) => (
  <div>
    {booleanProp && <span>Hello</span>}
    {stringProp}
    {nodeProp}
  </div>
);

MyComponent.propTypes = {
  booleanProp: PropTypes.bool,
  stringProp: PropTypes.string.isRequired,
  nodeProp: PropTypes.node,
};

export default MyComponent;
