import propsParser from './propsParser';
import { get as getConfig } from './configure';
import tests from './tests';

const jestAutoSnapshots = (Component, options = {}) => {
  const config = { ...getConfig(), ...options };
  tests(Component, propsParser(Component.name, config));
};

export { set as configure } from './configure';
export default jestAutoSnapshots;
