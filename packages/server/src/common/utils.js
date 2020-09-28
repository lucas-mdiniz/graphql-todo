// escape regex char in the string using (\) char
export const escapeRegex = (str) =>
  `${str}`.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
