<p align="center">
  Automatically generate prop fixtures and snapshot tests for your React components
</p>

<p align="center">
  <a href="https://coveralls.io/github/icd2k3/jest-auto-snapshots?branch=master target="_blank"><img src="https://coveralls.io/repos/github/icd2k3/jest-auto-snapshots/badge.svg?branch=master" /></a>
  <a href="https://david-dm.org/icd2k3/jest-auto-snapshots" title="dependencies status"><img src="https://david-dm.org/icd2k3/jest-auto-snapshots/status.svg"/></a>
  <a href="https://david-dm.org/icd2k3/jest-auto-snapshots?type=dev" title="devDependencies status"><img src="https://david-dm.org/icd2k3/jest-auto-snapshots/dev-status.svg"/></a>
</p>

```js
import snap from 'jest-auto-snapshots';
import MyComponent from '../MyComponent';

snap(MyComponent);
```

↓

![ex](https://www.dropbox.com/s/dqzdam8st4yfuxg/Screenshot%202018-01-07%2011.46.34.png?raw=1)

## Why?
> [Snapshot tests](https://facebook.github.io/jest/docs/en/snapshot-testing.html) are a very useful tool whenever you want to make sure your UI does not change unexpectedly.

`jest` and `enzyme-to-json` are great tools, but writing tests for all the different possible rendering states and maintaining props is tedious and unnecessary. Really, we just want to know when & where a snapshot changes and if the change was intentional.

#### What this script does (or aspires to do):
- Save time when writing simple A -> B rendering tests.
- Automatically update tests when component props change.
- Ensure that all possible component rendering states are covered.

#### What it doesn't do (but might in the future):
- _Deeply_ test all prop possibilities nested in `arrays` or `shapes`. This would just create way to many tests and should be handled manually (or, better yet, strive to make your component props as flat as possible). I'm open to a settings option to allow for this in future iterations, though.
- Save time _running_ tests. It's only supposed to save time _writing_ tests.

## How
  1. Finds and parses your component's source `.jsx` file with [react-docgen](https://github.com/reactjs/react-docgen).
  2. Parses your `Component.propTypes` tree and checks for different conditions (required vs optional props, boolean props, etc).
  3. Generates fixtures and tests based on the data above.

## Setup
**Important:** This module requires [jest](https://facebook.github.io/jest/), [enzyme](https://github.com/airbnb/enzyme), and [enzyme-to-json](https://www.npmjs.com/package/enzyme-to-json) to be correctly configured and working in your project. `jest-auto-snapshots` is supplemental to these tools and does not provide them for you.

#### Install
`npm i jest-auto-snapshots --save-dev` or `yarn add jest-auto-snapshots --dev`

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

snap(MyComponent);
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

## Advanced Examples
For advanced examples highlighting different use cases, please check out the [examples directory](https://github.com/icd2k3/jest-auto-snapshots/tree/master/examples)

## API
```js
snap(
  component: <Component:required>,
  config: <Object:optional>,
);
```

## Config
There are 2 ways to change configuration for the script. Either at the root level in your [jest setup file](https://facebook.github.io/jest/docs/en/configuration.html#setupfiles-array) or in each individual test. The params are the same for both:

```js
{
  /**
   * by default jest-auto-snapshots populates all fixtures for props like string, bool, shape, etc.
   * but you can override those fixtures with your own, or support custom prop types.
   */

  fixtures: {
    // propTypeName: propFixture,
    // ...
  },

  /**
   * jest-auto-snapshots needs to parse the actual component file
   * in order to see which props it needs. By default, it expects
   * your test file to be in a direftory next to your component. But
   * if you prefer your tests to sit right nect to your component
   * (or any other location) you can override the default with `relativePath`
   */

  relativePath: '../',
  
  /**
   *  optionally set the file extension for your component files (default is 'jsx')
   */

  extension: 'js',
}
```

#### Set Config at the Root Level
In your [jest setup file](https://facebook.github.io/jest/docs/en/configuration.html#setupfiles-array):

```js
const jestAutoSnapshots = require('jest-auto-snapshots');

jestAutoSnapshots.configure({
  fixtures: {
    customPropTypeExample: 'custom prop fixture example',
  },
  relativePath: './',
});
```

#### Set Config at the Test Level
In your test file:

```js
import snap from 'jest-auto-snapshots';
import CustomProps from '../CustomProps';

snap(CustomProps, {
  fixtures: {
    customPropTypeExample: 'custom prop fixture example',
  },
  relativePath: './',
});
```

Note: any of these config options supplied _at the test level_ will _override_ any config settings from your [jest setup file](https://facebook.github.io/jest/docs/en/configuration.html#setupfiles-array).
