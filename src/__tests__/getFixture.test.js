import getFixture from '../getFixture';
import { merge as mergeConfig, get as getConfig } from '../configure.js';

describe('getFixture', () => {
  describe('warning logging', () => {
    it('Should log warning when propType is unrecognized', () => {
      expect(getFixture({ name: 'prop', key: 'key', raw: 'raw' }, 'key', getConfig()))
        .toBe(null);
    });
  });

  describe('custom fixture prop type', () => {
    it('Should return the correct fixture', () => {
      expect(getFixture(
        {
          name: 'mockCustomPropType',
          key: 'key',
          raw: 'mockCustomPropType',
        },
        'key',
        mergeConfig({
          fixturesByPropType: {
            mockCustomPropType: 'mockCustomFixture',
          },
        }),
      )).toBe('mockCustomFixture');
    });
  });

  describe('custom fixture prop key', () => {
    it('Should return the correct fixture', () => {
      expect(getFixture(
        {
          name: 'string',
          key: 'mockKey',
          raw: 'string',
        },
        'mockKey',
        mergeConfig({
          fixturesByPropKey: {
            mockKey: 'mockCustomKeyFixture',
          },
        }),
      )).toBe('mockCustomKeyFixture');
    });
  });
});
