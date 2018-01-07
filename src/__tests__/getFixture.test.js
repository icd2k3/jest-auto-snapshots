import getFixture from '../getFixture';
import { set } from '../configure.js';

describe('getFixture', () => {
  describe('warning logging', () => {
    it('Should log warning when propType is unrecognized', () => {
      expect(getFixture({ name: 'prop', key: 'key', raw: 'raw' }))
        .toBe(null);
    });
  });

  describe('root custom fixture', () => {
    it('Should return the correct fixture', () => {
      set({
        fixtures: {
          mockCustomPropType: 'mockCustomFixture',
        },
      });
      expect(getFixture({ name: 'mockCustomPropType', key: 'key', raw: 'mockCustomPropType' }))
        .toBe('mockCustomFixture');
    });
  });
});
