import colors from 'colors/safe';

const prepend = 'jest-auto-snapshots';

export const ERROR = Object.freeze({
  PATH_INCORRECT: (filePath, file) => `
    Component file ${filePath} could not be found. Please
    ensure your path is correct:
    ${file}
    `,
  COMPONENT_INVALID: `
    This component appears to be invalid. Please make sure it is exported correctly in your jsx file.
  `,
  MULTIPLE_COMPONENTS_NOT_FOUND: (name, file) => `
    The Component \`name\` could not be found in:
    '${file}'.

    It looks like there are multiple exported components in this file.
    In this case you probably need to add a comment above your component definition:

    /** ${name} */
    export const ${name} = () => { /*...*/ }

    This is due to a limitation in react-docgen to be able to parse this Component's propTypes.
  `,
  PROP_TYPE_UNRECOGNIZED: (key, raw) => `
    The prop '${key}' of type '${raw}' is unrecognized.
    To fix this warning you can either inject the prop in the test:

    \`snap(Component, ../Component.jsx, { fixturesByPropType: { ${raw}: 'value' } })\`

    or define a root-level prop fixture handler (see readme)
  `,
});

export const getError = str => new Error(`
  ${colors.white.bgRed(`${prepend} error`)}
  ${colors.red(str)}
`);

export const logError = (str) => {
  throw getError(str);
};

export const logWarning = (str) => {
  // eslint-disable-next-line
  console.log(`
    ${colors.yellow.bold(`${prepend} warning`)}
    ${colors.yellow(str)}
  `);
};
