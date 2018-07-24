/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ClassComponent extends Component {
  static propTypes = {
    sayHello: PropTypes.bool.isRequired,
  };

  render() {
    const { sayHello } = this.props;

    return (
      <div>
        {sayHello
          ? (
            <span>
              Hello
            </span>
          )
          : (
            <span>
              Goodbye
            </span>
          )
        }
      </div>
    );
  }
}
