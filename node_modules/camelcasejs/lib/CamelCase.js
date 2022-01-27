// Private properties
const find = /([0-9]{1,}(\.|-)[0-9]{1,})|[a-zA-Z]{1,}|[0-9]{1,}/g;
const findNumber = /([0-9]{1,})_([0-9]{1,})/g;

// CamelCase
// Static class
class CamelCase {
  // Public methods
  static CamelCase(value) {
    // Verif type
    // Convert string
    if (typeof value === 'string') return CamelCase._ConvertString(value);
    // Convert array
    if (Array.isArray(value)) return CamelCase._ConvertArray(value);
    // Else null
    return null;
  }
  // Private Methods
  static _ConvertArray(array) {
    // As string
    const characters = array.map(val => CamelCase._firstChar(val));
    // Return
    return CamelCase._ConvertString(characters.join(''));
  }
  static _ConvertString(val) {
    // Convert
    const convertion = val.match(find).map(value => CamelCase._firstChar(value));
    // Return
    return CamelCase._writeString(convertion);
  }
  /**
   * writeString
   * @description Return converted value
   * @param {string} value
   */
  static _writeString(value, separator = '_') {
    // response
    const response = value.map((val, index) => {
      // Conditions
      const current = val.match(findNumber);
      const next = value[index + 1] ? value[index + 1].match(findNumber) : false;
      // Comprobe numbers
      if (current && next) {
        return `${val}${separator}`;
      }
      // Return
      return val;
    });
    // Return
    return CamelCase._firstChar(response.join(''), 'toLowerCase');
  }
  /**
   * firstChar
   * @param {string} val Value to convert
   * @description Convert first character to upper case
   * @returns String
   */
  static _firstChar(val, method = 'toUpperCase') {
    // Comprobe
    if (typeof val !== 'string') return val;
    // Properties
    const first = val.charAt(0)[method]();
    const value = val.slice(1);
    // Response
    const response = `${first}${value}`;
    // Return
    return CamelCase.format(response);
  }
  /**
   * replaceGlobal
   * @description Return string replace
   * @param {string} val
   */
  static format(val) {
    // Type
    if (typeof val !== 'string') return val;
    // Replace
    const replace = val.replace(/(\.|-){1,}/g, '_');
    return replace;
  }
}

// Export
module.exports = CamelCase;
