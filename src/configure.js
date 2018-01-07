import { createElement } from 'react';

const prepend = 'jest-auto-snapshots';
export const NodeFixture = () => createElement('span', {}, `${prepend} Node Fixture`);
const stringFixture = `${prepend} String Fixture`;

let config = {
  fixtures: {
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
  relativePath: '../',
  extension: 'jsx',
};

export const set = (rootOptions) => {
  config = {
    ...config,
    ...rootOptions,
    fixtures: {
      ...config.fixtures,
      ...(rootOptions.fixtures || {}),
    },
  };
};

export const get = () => config;
