There are 2 ways to get around using custom prop types in the snapshot tests.

## Inject props in the test itself

```js
snap(Component, { props: { customPropKey: 'value' } })
```

### Define a propTypeFixture in your jest setup file
Defining a propTypeFixture will inject this fixture (in this case `'customproptest'`) for _all_
components that use this propType. However, you can override it by injecting a prop from the test
site described above.

```js
const jestAutoSnapshots = require('jest-auto-snapshots');

jestAutoSnapshots.configure({
  propTypeFixtures: {
    customPropType: 'customproptest',
  },
});
```
