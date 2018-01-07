import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class IntegratingWithOtherTests extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    clicks: 0,
  }

  handleClick() {
    const { clicks } = this.state;
    this.setState({ clicks: clicks + 1 });
  }

  render() {
    const { clicks } = this.state;
    const { label } = this.props;

    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        {label}:
        <span>{clicks}</span>
      </div>
    );
  }
}
