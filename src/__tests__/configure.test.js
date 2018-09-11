import React from 'react';
import renderer from 'react-test-renderer';
import { set, get, NodeFixture } from '../configure.js';

describe('configure', () => {
  describe('NodeFixture', () => {
    it('Should match snapshot', () => {
      const tree = renderer.create(<NodeFixture />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('set', () => {
    it('Should set fixtures correctly', () => {
      const config = get();
      const newFixturesByPropType = {
        mockCustomPropType: 'mock-new-fixture',
        string: 'mock-override-default-fixture',
      };
      const newFixturesByPropKey = {
        user: { name: 'guy' },
      };
      set({
        fixturesByPropType: newFixturesByPropType,
        fixturesByPropKey: newFixturesByPropKey,
      });
      expect(get()).toEqual({
        fixturesByPropType: {
          ...config.fixturesByPropType,
          ...newFixturesByPropType,
        },
        fixturesByPropKey: {
          ...config.fixturesByPropKey,
          ...newFixturesByPropKey,
        },
      });
    });
  });
});
