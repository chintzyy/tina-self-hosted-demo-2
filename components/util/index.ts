export * from './container'
export * from './section'
export * from './icon'
export * from './actions'
export * from './Placeholder'

export function uniqueValues(array) {
  return array.filter((value, index, self) => self.indexOf(value) === index);
}

export function camelCaseToCapitalizedWithSpaces(str) {
  // Insert spaces before capital letters
  const stringWithSpaces = str.replace(/([A-Z])/g, ' $1');
  // Capitalize the first letter
  const capitalizedString = stringWithSpaces.charAt(0).toUpperCase() + stringWithSpaces.slice(1);
  return capitalizedString;
}
