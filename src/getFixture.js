import { ERROR, logWarning } from './logger';
import { get as getConfig } from './configure';

const getFixture = ({ name, raw, value }, key, injectedProps) => {
  const config = getConfig();
  if (injectedProps && typeof injectedProps[key] !== 'undefined') {
    // check for injected props first from the test runner
    return injectedProps[key];
  } else if (config.fixtures && typeof config.fixtures[raw] !== 'undefined') {
    // next, check if any root-level proptype handler have been set
    // most common use case would be for custom defined propTypes.
    return config.fixtures[raw];
  }

  // automatically try to add fixture based on propType
  switch (name) {
    case 'any':
    case 'array':
    case 'bool':
    case 'element':
    case 'func':
    case 'node':
    case 'number':
    case 'object':
    case 'string':
    case 'symbol':
      return config.fixtures[name];
    case 'shape':
      return Object.keys(value).reduce((shapeProps, shapePropKey) => ({
        ...shapeProps,
        [shapePropKey]: getFixture(value[shapePropKey], key, injectedProps),
      }), {});
    case 'enum': // aka oneOf
      return value[0].value;
    case 'arrayOf':
      return [getFixture(value, key, injectedProps)];
    case 'union':
      // cover the first type here (remaining types will be covered in prop variations)
      return getFixture(value[0], key, injectedProps);
    default:
      logWarning(ERROR.PROP_TYPE_UNRECOGNIZED(key, raw));
      return null;
  }
};

export default getFixture;
