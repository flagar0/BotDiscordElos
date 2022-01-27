// Imports
const { CamelCase } = require('../');
const assert = require('assert');

// Methods
const validate = (value, expected) => {
  // Validation
  assert.equal(CamelCase(value), expected);
};

describe('camelcase', () => {
  describe('Convert strings', () => {
    // Methods
    it('foo_bar => fooBar', () => {
      // Validation
      validate('foo_bar', 'fooBar');
    });
    it('foo-bar-v9.2 => fooBarV9_2', () => {
      // Validation
      validate('foo-bar-v9.2', 'fooBarV9_2');
    });
  });
  describe('Convert array', () => {
    // Methods
    it('[\'foo,\', \'bar\'] => fooBar', () => {
      // Validation
      validate(['foo', 'bar'], 'fooBar');
    });
    it('[\'foo\', \'bar\', \'v9\', \'2\'] => fooBarV92', () => {
      // Validation
      validate(['foo', 'bar', 'v9', '2'], 'fooBarV92');
    });
  });
});
