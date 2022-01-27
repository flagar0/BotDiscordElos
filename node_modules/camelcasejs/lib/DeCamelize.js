// Private properties
const find = /([a-z0-9]+|[A-Z0-9]+[a-z0-9]*|[A-Z0-9][a-z0-9]*([A-Z0-9][a-z0-9]*)*)/g;
const findNumber = /[0-9]{1,}/g;
const defaultSeparator = '_';
let setNext = false;

// Format
const format = (val, next) => {
  // Comprobe
  if (setNext) {
    setNext = false;
    return '';
  }
  // Type
  if (typeof val !== 'string') return val;
  // Replace
  const cond1 = val.match(findNumber);
  const cond2 = next && next.match(findNumber);
  // Comprobe
  if (cond1 && cond2) {
    // Set next
    setNext = true;
    // Response
    return `${val}.${next}`;
  }
  // Return
  return val;
};
// DeCamelize
const DeCamelize = (value, separator = '_') => {
  // Comprobe
  if (typeof value !== 'string') return null;
  // Find
  const match = value.match(find);
  // Response
  const response = match.map((val, index) => {
    // Properties
    const next = match[index + 1];
    // Response
    return format(val, next);
  })
    .filter(val => val.length > 0)
    .join(separator || defaultSeparator); // Separator
  // Return
  return response.toLowerCase();
};

// Export
module.exports = DeCamelize;
