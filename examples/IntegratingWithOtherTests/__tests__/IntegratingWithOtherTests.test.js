import React from 'react';
import snap from 'jest-auto-snapshots';
import { shallow } from 'enzyme';
import IntegratingWithOtherTests from '../IntegratingWithOtherTests';

describe('IntegratingWithOtherTests', () => {
  snap(IntegratingWithOtherTests);

  describe('When button is clicked', () => {
    it('Should add a click', () => {
      const wrapper = shallow(<IntegratingWithOtherTests label="label" />);
      wrapper.find('button').simulate('click');
      expect(wrapper).toMatchSnapshot();
    });
  });

  /* ... any other functional/state tests you need to cover */
});
