import React from 'react';
import { shallow } from 'enzyme';
import { set, get, NodeFixture } from '../configure.js';

const defaultConfig = get();

describe('configure', () => {
  describe('NodeFixture', () => {
    it('Should match snapshot', () => {
      expect(shallow(<NodeFixture />)).toMatchSnapshot();
    });
  });

  describe('set', () => {
    it('Should set relativePath and extension correctly w/o fixtures', () => {
      set({
        relativePath: 'mock',
        extension: 'js',
      });
      expect(get()).toEqual({
        ...defaultConfig,
        relativePath: 'mock',
        extension: 'js',
      });
    });

    it('Should set fixtures correctly', () => {
      const config = get();
      const newFixtures = {
        mockCustomPropType: 'mock-new-fixture',
        string: 'mock-override-default-fixture',
      };
      set({
        fixtures: newFixtures,
      });
      expect(get()).toEqual({
        ...config,
        fixtures: {
          ...config.fixtures,
          ...newFixtures,
        },
      });
    });
  });
});
