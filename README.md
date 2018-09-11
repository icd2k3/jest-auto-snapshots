<p align="center">
  Automatically generate prop fixtures and snapshot tests for your React components
</p>

<p align="center">
  <a href="https://travis-ci.org/icd2k3/jest-auto-snapshots" target="_blank"><img src="https://travis-ci.org/icd2k3/jest-auto-snapshots.svg?branch=master" /></a>
  <a href="https://coveralls.io/github/icd2k3/jest-auto-snapshots?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/icd2k3/jest-auto-snapshots/badge.svg?branch=master" /></a>
  <a href="https://david-dm.org/icd2k3/jest-auto-snapshots" title="dependencies status"><img src="https://david-dm.org/icd2k3/jest-auto-snapshots/status.svg"/></a>
  <a href="https://david-dm.org/icd2k3/jest-auto-snapshots?type=dev" title="devDependencies status"><img src="https://david-dm.org/icd2k3/jest-auto-snapshots/dev-status.svg"/></a>
</p>

```js
import snap from 'jest-auto-snapshots';
import MyComponent from '../MyComponent';

snap(MyComponent, '../MyComponent.jsx');
```

↓

```
 PASS  examples/MyComponent/__tests__/MyComponent.test.js
  jest-auto-snapshots > MyComponent
    ✓ Matches snapshot when passed only required props (3ms)
    ✓ Matches snapshot when passed all props (2ms)
    ✓ Matches snapshot when boolean prop "booleanProp" is set to: "false" (1ms)
```

## Why?
> [Snapshot tests](https://facebook.github.io/jest/docs/en/snapshot-testing.html) are a very useful tool whenever you want to make sure your UI does not change unexpectedly.

`jest` and `react-test-renderer` are fantastic tools, but writing tests for all the different possible rendering states and maintaining props is tedious. Really, we just want to know when & where a component snapshot changes and if that change was intentional.

For example, take the following simple component: `<MyComponent active />`. In order to make sure `MyComponent` is fully covered in snapshot tests, we would have to write (and maintain) _two_ separate tests for the boolean `active` state.

`jest-auto-snapshots` can detect the different prop types your component uses and _create_ those shapshot tests for you!

If `MyComponent`'s props ever get changed/added/removed `jest-auto-snapshots` will just create and run new snapshot tests.

See the bigger [example below](https://github.com/icd2k3/jest-auto-snapshots#example) for more info.

#### What this does (or aspires to do):
- Save you time when writing simple A -> B rendering tests.
- Automatically update, add, and remove snapshot tests when your component props change.
- Ensure that all possible component rendering states are covered.

#### What it doesn't do:
- _Deeply_ test all prop possibilities nested in `arrays` or `shapes`. This would just create way to many snapshots and should be handled manually (or, better yet, strive to make your component props as flat as possible). I'm open to a settings option to allow for this in future iterations, though.
- Test _functionality_ for you. You should still write manual tests for things like button clicks, component state changes, etc.
- Save time _running_ tests. It's only supposed to save time _writing_ tests.

## How
  1. Finds and parses your component's source `.jsx` file with [react-docgen](https://github.com/reactjs/react-docgen).
  2. Parses your `Component.propTypes` tree and checks for different conditions (required vs optional props, boolean props, etc).
  3. Generates fixtures and tests based on the data above.

#### Install
`yarn add jest-auto-snapshots --dev`
or
`npm i jest-auto-snapshots --save-dev`

## Example
#### `MyComponent.jsx`
```js
const MyComponent = ({ stringProp, booleanProp, nodeProp }) => (
  <div>
   {booleanProp && <span>Hello</span>}
   {stringProp}
   {nodeProp}
  </div>
);

MyComponent.propTypes = {
  booleanProp: PropTypes.bool,
  stringProp: PropTypes.string,
  nodeProp: PropTypes.node,
};
```

#### `MyComponent.test.js`
```js
import snap from 'jest-auto-snapshots';
import MyComponent from '../MyComponent';

snap(MyComponent, '../MyComponent.jsx');
```

#### `MyComponent.test.js.snap` (generated from the example code above)
```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`when boolean prop "booleanProp" is set to: "false" 1`] = `
<div>
  jest-auto-snapshots String Fixture
  <NodeFixture />
</div>
`;

exports[`when passed all props 1`] = `
<div>
  <span>
    Hello
  </span>
  jest-auto-snapshots String Fixture
  <NodeFixture />
</div>
`;

exports[`when passed only required props 1`] = `
<div>
  jest-auto-snapshots String Fixture
</div>
`;
```

## More Examples
For more examples highlighting different use cases, please check out the [examples directory](https://github.com/icd2k3/jest-auto-snapshots/tree/master/examples)

## API
```js
snap(
  component: <Component:required>,
  componentFilePath: <String:required>,  // jest-auto-snapshots needs to parse the component file itself to determine prop fixtures
  config: <Object:optional>,             // optionally set fixtures for the component tests (see Config section below)
);
```

## Config
There are 2 ways to change configuration for the script. Either at the root level in your [jest setup file](https://facebook.github.io/jest/docs/en/configuration.html#setupfiles-array) or in each individual test. The params are the same for both:

Key | Description | Defaults
--- | --- | ---
fixturesByPropKey | Inject component prop fixtures bassed on the prop _key_ | None
fixturesByPropType | Inject component prop fixtures based on the prop _type_ | [see src/configure.js](https://github.com/icd2k3/jest-auto-snapshots/blob/master/src/configure.js). By default it covers all the core [propTypes](https://github.com/facebook/prop-types).

#### Set Config at the Root Level
In your [jest setup file](https://facebook.github.io/jest/docs/en/configuration.html#setupfiles-array):

```js
const jestAutoSnapshots = require('jest-auto-snapshots');

jestAutoSnapshots.configure({
  fixturesByPropType: {
    customPropType: 'custom fixture',
  },
  fixturesByPropKey: {
    user: { name: 'Joe', age: 30 },
  },
});
```

For the above example:
- `'custom fixture'` will be injected for _all_ components with `something: customPropType` in their `propTypes` object.
- `{name: 'Joe', age: 30}` will be injected for _all_ components with `user: PropTypes.shape({ /* ... */ })` in their `propTypes` object.

#### Set Config at the Test Level
In your test file:

```js
import snap from 'jest-auto-snapshots';
import CustomProps from '../CustomProps';

snap(CustomProps, '../CustomProps.jsx', {
  fixturesByPropType: {
    customPropType: 'custom fixture',
  },
  fixturesByPropKey: {
    user: { name: 'Joe', age: 30 },
  },
});
```

For the above example, these custom fixtures will _only_ be injected for the current test.
