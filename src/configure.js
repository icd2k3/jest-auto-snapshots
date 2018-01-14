import { createElement } from 'react';

const prepend = 'jest-auto-snapshots';
export const NodeFixture = () => createElement('span', {}, `${prepend} Node Fixture`);
const stringFixture = `${prepend} String Fixture`;

let config = {
  fixturesByPropKey: {},
  fixturesByPropType: {
    string: stringFixture,
    bool: true,
    number: 1,
    node: createElement(NodeFixture),
    element: createElement(NodeFixture),
    func: jest.fn(),
    any: stringFixture,
    symbol: Symbol(stringFixture),
    array: [stringFixture],
    object: { jest: stringFixture },
  },
};

export const merge = newConfig => ({
  fixturesByPropType: {
    ...config.fixturesByPropType,
    ...(newConfig.fixturesByPropType || {}),
  },
  fixturesByPropKey: {
    ...config.fixturesByPropKey,
    ...(newConfig.fixturesByPropKey || {}),
  },
});

export const set = (newConfig) => {
  config = merge(newConfig);
};

export const get = () => config;
