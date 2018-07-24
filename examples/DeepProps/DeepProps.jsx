import React from 'react';
import PropTypes from 'prop-types';

const DeepProps = ({
  optionalArray,
  total,
  users,
}) => (
  <div>
    {users.map(({ firstName, lastName, cartItems }) => (
      <div key={firstName}>
        <h1>
          {firstName}
          {' '}
          {lastName}
        </h1>
        {cartItems && cartItems.map(({ cost, title }) => (
          <div key={title}>
            <h2>
              {title}
            </h2>
            <span>
              $
              {cost}
            </span>
          </div>
        ))}
      </div>
    ))}
    {optionalArray && optionalArray.map(s => (
      <span key={s}>
        s
      </span>
    ))}
    <span>
      {total}
    </span>
  </div>
);

DeepProps.propTypes = {
  optionalArray: PropTypes.arrayOf(PropTypes.string),
  users: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    cartItems: PropTypes.arrayOf(PropTypes.shape({
      cost: PropTypes.string.isRequired,
      title: PropTypes.number,
    })),
  })).isRequired,
  total: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default DeepProps;
