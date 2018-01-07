import React from 'react';
import PropTypes from 'prop-types';

export const ComponentOne = ({ title }) => (
  <span>{title}</span>
);

ComponentOne.propTypes = {
  title: PropTypes.string.isRequired,
};

export const ComponentTwo = ({ number }) => (
  <span>{number}</span>
);

ComponentTwo.propTypes = {
  number: PropTypes.number.isRequired,
};
