import propsParser from '../propsParser.js';
import { ERROR, getError } from '../logger';

describe('propsParser', () => {
  describe('error logging', () => {
    it('Should log error when no component name is provided', () => {
      expect(() => { propsParser(); })
        .toThrow(getError(ERROR.COMPONENT_INVALID));
    });

    it('Should log error when component file could not be found', () => {
      expect(() => { propsParser('MockInvalidComponent'); })
        .toThrow();
    });

    it('Should log error when component file path is incorrect', () => {
      expect(() => { propsParser('MockInvalidComponent', { path: '../bad/path' }); })
        .toThrow();
    });

    it('Should log error for multiple components if not found', () => {
      expect(() => { propsParser('ComponentOne', { path: '../../../src/__tests__/MultipleComponentErrorTest.jsx' }); })
        .toThrow();
    });
  });
});
