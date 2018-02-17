import { ERROR, logWarning } from './logger';

const getFixture = ({ name, raw, value }, key, config) => {
  const { fixturesByPropType, fixturesByPropKey } = config;

  if (fixturesByPropKey && typeof fixturesByPropKey[key] !== 'undefined') {
    // check for injected props first from the test runner
    return fixturesByPropKey[key];
  } else if (fixturesByPropType && typeof fixturesByPropType[raw] !== 'undefined') {
    // next, check if any root-level proptype handler have been set
    // most common use case would be for custom defined propTypes.
    return fixturesByPropType[raw];
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
      return fixturesByPropType[name];
    case 'shape':
      return Object.keys(value).reduce((shapeProps, shapePropKey) => ({
        ...shapeProps,
        [shapePropKey]: getFixture(value[shapePropKey], key, config),
      }), {});
    case 'enum': // aka oneOf
      return value[0].value.slice(1, -1);
    case 'arrayOf':
      return [getFixture(value, key, config)];
    case 'union':
      // cover the first type here (remaining types will be covered in prop variations)
      return getFixture(value[0], key, config);
    default:
      logWarning(ERROR.PROP_TYPE_UNRECOGNIZED(key, raw));
      return null;
  }
};

export default getFixture;
