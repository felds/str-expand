const compose = (...fs) => (x) => fs.reduceRight((acc, f) => f(acc), x);

const padCharsStart = (char, minLength) => (str) =>
  String(str).padStart(minLength, char);

const map = (f) => (xs) => xs.map(f);

const range = (from, to) => {
  const arr = Array(Math.abs(from - to));
  const step = Math.sign(to - from);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = +from + i * step;
  }
  return arr;
};

const flatMap = (f) => (xs) => xs.flatMap(f);

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
