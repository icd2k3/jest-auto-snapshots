import { createElement } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

export const shapshotTest = (Component, props, str) => it(`Matches snapshot ${str}`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(createElement(Component, props));
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

/**
 * Test different possibilities based on the fixture type.
 * For example, if a boolean prop is set to `true` try a snapshot
 * test with it set to `false`.
 */
export const possibilities = (Component, allProps, key) => ({
  array: (isRequired) => {
    if (!isRequired) {
      shapshotTest(Component, {
        ...allProps,
        [key]: [],
      }, `when array prop "${key}" is an empty array: "[]"`);
    }
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
  const requiredKeys = Object.keys(required);
  const optionalKeys = Object.keys(optional);

  describe(`jest-auto-snapshots > ${Component.name}`, () => {
    // snapshot test the component with ONLY required props, then with all props
    if (!requiredKeys.length && !optionalKeys.length) {
      // this component doesn't need (or have) props to render
      shapshotTest(Component, {}, 'when rendered');
    } else {
      if (requiredKeys.length) {
        shapshotTest(Component, required, 'when passed only required props');
      }
      if (optionalKeys.length) {
        shapshotTest(Component, allProps, 'when passed all props');
      }
    }

    // loop through each prop and test different possibilities
    // (see the `possibilities` function above)
    Object.keys(allProps).forEach((key) => {
      const testPossibilities = possibilities(Component, allProps, key);
      if (typeof allProps[key] === 'boolean') {
        testPossibilities.boolean();
      } else if (Array.isArray(allProps[key])) {
        testPossibilities.array(required[key]);
      }
    });
  });
};

export default tests;
