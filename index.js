const { compose, flatMap, map, padCharsStart, range } = require("lodash/fp");

/**
 * Expand a string pattern into a list of strings using sequence or enum tokens.
 *
 * @param {string} pattern  The pattern to be expanded.
 * @returns {string[]}  The collection of expansions.
 */
function expand(pattern) {
  if (pattern === "") {
    return [];
  }

  // detect braces
  // https://regex101.com/r/NUZ0mY/2
  const bracesRegex = /\{([^\}]*?)\}/;
  const bracesMatch = bracesRegex.exec(pattern);
  if (bracesMatch) {
    const values = bracesMatch[1].split(",");

    return compose(
      flatMap((s) => expand(s)),
      map((v) => pattern.replace(bracesRegex, v)),
    )(values);
  }

  // https://regex101.com/r/NUZ0mY/3
  const bracketsRegex = /\[(\d+)\.\.(\d+)\]/;
  const bracketsMatch = bracketsRegex.exec(pattern);
  if (bracketsMatch) {
    const { 1: from, 2: to } = bracketsMatch;
    const minLength = Math.min(from.length, to.length);

    return compose(
      flatMap((s) => expand(s)),
      map((n) => pattern.replace(bracketsRegex, n)),
      map(padCharsStart("0", minLength)),
    )([...range(from, to), to]);
  }

  return [pattern];
}

module.exports = expand;
