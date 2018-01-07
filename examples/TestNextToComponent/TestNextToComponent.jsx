/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const TestNextToComponent = ({
  someProp,
}) => (
  <div>
    {someProp}
  </div>
);

TestNextToComponent.propTypes = {
  someProp: PropTypes.string,
};

export default TestNextToComponent;
