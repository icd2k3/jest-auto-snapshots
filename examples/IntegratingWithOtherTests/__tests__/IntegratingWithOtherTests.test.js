import React from 'react';
import snap from 'jest-auto-snapshots';
import ReactTestUtils from 'react-dom/test-utils';
import IntegratingWithOtherTests from '../IntegratingWithOtherTests';

describe('IntegratingWithOtherTests', () => {
  snap(IntegratingWithOtherTests, '../IntegratingWithOtherTests.jsx');

  describe('When button is clicked', () => {
    it('Should add a click', () => {
      const onClick = jest.fn();
      const wrapper = ReactTestUtils.renderIntoDocument(<IntegratingWithOtherTests label="label" onClick={onClick} />);
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(wrapper, 'button');
      ReactTestUtils.Simulate.click(button);
      expect(onClick).toHaveBeenCalled();
    });
  });

  /* ... any other functional/state tests you need to cover */
});
