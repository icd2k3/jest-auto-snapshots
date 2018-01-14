import getFixture from './getFixture';
import { ERROR, logError } from './logger';

const callerCallsite = require('caller-callsite');
const reactAST = require('react-docgen');
const findAllExportedComponentDefinitions = require('react-docgen/dist/resolver/findAllExportedComponentDefinitions').default;
const fs = require('fs');
const path = require('path');

const propsParser = (componentName, filePath, config) => {
  if (!componentName) {
    logError(ERROR.COMPONENT_INVALID);
  }

  const file = path.resolve(callerCallsite().getFileName(), '../', filePath);

  if (!fs.existsSync(file)) {
    return logError(ERROR.PATH_INCORRECT(filePath, file));
  }

  const componentInfo = reactAST.parse(fs.readFileSync(file), findAllExportedComponentDefinitions);

  let componentPropInfo;
  if (componentInfo.length === 1) {
    componentPropInfo = componentInfo[0].props;
  } else {
    // this file has multiple exported components.
    // In this case we should look for the right one via
    // description field. If none is present, throw logErroror to user
    componentPropInfo = componentInfo
      .find(info => info.description === componentName);

    if (!componentPropInfo) {
      return logError(ERROR.MULTIPLE_COMPONENTS_NOT_FOUND(componentName, file));
    }

    componentPropInfo = componentPropInfo.props;
  }

  return Object.keys(componentPropInfo || {})
    .reduce((obj, key) => {
      const newObj = obj;
      const { type, required } = componentPropInfo[key];
      newObj[required ? 'required' : 'optional'][key] = getFixture(type, key, config);
      return newObj;
    }, { required: {}, optional: {} });
};

export default propsParser;
