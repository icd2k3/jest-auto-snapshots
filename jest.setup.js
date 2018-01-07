global.requestAnimationFrame = (callback) => { setTimeout(callback, 0); };

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

const jestAutoSnapshots = require('jest-auto-snapshots');

/* jestAutoSnapshots.configure({
  fixtures: {
    customPropType: 'customproptest',
  },
}); */
