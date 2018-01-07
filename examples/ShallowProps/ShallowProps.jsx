/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const ShallowProps = ({
  any,
  children,
  enumType,
  number,
  onClick,
  sayHello,
  symbol,
  title,
}) => (
  <div>
    <h1>{title}</h1>
    {sayHello && <span>Hello!</span>}
    <div>{children}</div>
    <button onClick={onClick}>
      button
    </button>
    {any}
    {number || 999}
    {symbol}
    {enumType}
  </div>
);

ShallowProps.propTypes = {
  any: PropTypes.any,
  children: PropTypes.node.isRequired,
  enumType: PropTypes.oneOf(['News', 'Photos']).isRequired,
  number: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  sayHello: PropTypes.bool,
  symbol: PropTypes.symbol,
  title: PropTypes.string.isRequired,
};

export default ShallowProps;
