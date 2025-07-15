/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  // needles can't exceed the length of the haystack
  if (haystack.length < needle.length) return -1;

  // stop searching once the remaining characters aren't at least as long as needle
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    // the needle is found
    if (haystack.substring(i, i + needle.length) === needle) return i
  }
  // fallback to not found
  return -1
};