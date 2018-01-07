import React from 'react';
import PropTypes from 'prop-types';

// If you want to test multiple different components that
// are exported from the *same* file, you need to add a comment
// above each component in the following format:
//  /** ComponentName */
// This is due to a limitation in react-docgen (https://github.com/reactjs/react-docgen)
// where we need this label in order to determine which component's propTypes we should be
// looking at

/** ComponentOne */
export const ComponentOne = ({ title }) => (
  <span>{title}</span>
);

ComponentOne.propTypes = {
  title: PropTypes.string.isRequired,
};

/** ComponentTwo */
export const ComponentTwo = ({ number }) => (
  <span>{number}</span>
);

ComponentTwo.propTypes = {
  number: PropTypes.number.isRequired,
};
