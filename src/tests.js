import { createElement } from 'react';
import { shallow } from 'enzyme';

export const shapshotTest = (Component, props, str) => it(`Matches snapshot ${str}`, () => {
  expect(shallow(createElement(Component, props))).toMatchSnapshot(str);
});

/**
 * Test different possibilities based on the fixture type.
 * For example, if a boolean prop is set to `true` try a snapshot
 * test with it set to `false`.
 */
export const possibilities = (Component, allProps, key) => ({
  array: () => {
    shapshotTest(Component, {
      ...allProps,
      [key]: [],
    }, `when array prop "${key}" is an empty array: "[]"`);
    shapshotTest(Component, allProps, `when array prop "${key}" has one item: "${allProps[key]}"`);
  },
  boolean: () => {
    shapshotTest(Component, {
      ...allProps,
      [key]: !allProps[key],
    }, `when boolean prop "${key}" is set to: "${!allProps[key]}"`);
  },
});

const tests = (Component, { required, optional }) => {
  const allProps = { ...required, ...optional };

  describe(`jest-auto-snapshots > ${Component.name}`, () => {
    // snapshot test the component with ONLY required props, then with all props
    if (Object.keys(required).length) {
      shapshotTest(Component, required, 'when passed only required props');
    }
    if (Object.keys(optional).length) {
      shapshotTest(Component, allProps, 'when passed all props');
    }

    // loop through each prop and test different possibilities
    // (see the `possibilities` function above)
    Object.keys(allProps).forEach((key) => {
      const testPossibilities = possibilities(Component, allProps, key);
      if (typeof allProps[key] === 'boolean') {
        testPossibilities.boolean();
      } else if (Array.isArray(allProps[key])) {
        testPossibilities.array();
      }
    });
  });
};

export default tests;