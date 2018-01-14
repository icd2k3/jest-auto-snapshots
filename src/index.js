import propsParser from './propsParser';
import { merge as mergeConfig, get as getConfig } from './configure';
import tests from './tests';

const jestAutoSnapshots = (Component, filePath, testConfig) => {
  const config = typeof testConfig === 'object' ? mergeConfig(testConfig) : getConfig();
  tests(Component, propsParser(Component.name, filePath, config));
};

export { set as configure } from './configure';
export default jestAutoSnapshots;
