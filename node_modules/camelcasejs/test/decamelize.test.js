// Imports
const { DeCamelize } = require('../');
const assert = require('assert');

// Methods
const validate = (expected, value, separator = '_') => {
  // Validation
  assert.equal(DeCamelize(value, separator), expected);
};

describe('DeCamelazile', () => {
  // Methods
  it('fooBar => foo_bar', () => {
    // Validation
    validate('foo_bar', 'fooBar');
  });
  it('fooBarV9_2 => foo_bar_v9.2', () => {
    // Validation
    validate('foo_bar_v9.2', 'fooBarV9_2');
  });
  it('fooBarV9_2 => foo-bar-v9.2', () => {
    // Validation
    validate('foo-bar-v9.2', 'fooBarV9_2', '-');
  });
});
