const padCharsStart = (char: string, minLength: number) => (str: string) =>
  String(str).padStart(minLength, char);

const range = (from: number, to: number) => {
  const arr = Array(Math.abs(from - to));
  const step = Math.sign(to - from);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = +from + i * step;
  }
  return arr;
};

/**
 * Expand a string pattern into a list of strings using sequence or enum tokens.
 *
 * @param pattern   The pattern to be expanded.
 * @returns         The collection of expansions.
 */
export default function expand(pattern: string): string[] {
  if (pattern === "") {
    return [];
  }

  // detect braces
  // https://regex101.com/r/NUZ0mY/2
  const bracesRegex = /\{([^\}]*?)\}/;
  const bracesMatch = bracesRegex.exec(pattern);
  if (bracesMatch) {
    const values = bracesMatch[1]!.split(",");
    return values.map((v) => pattern.replace(bracesRegex, v)).flatMap(expand);
  }

  // https://regex101.com/r/NUZ0mY/3
  const bracketsRegex = /\[(\d+)\.\.(\d+)\]/;
  const bracketsMatch = bracketsRegex.exec(pattern);
  if (bracketsMatch) {
    const from = parseInt(bracketsMatch[1]!);
    const to = parseInt(bracketsMatch[2]!);
    const minLength = Math.min(from.toString().length, to.toString().length);

    [...range(from, to), to]
      .map(padCharsStart("0", minLength))
      .map((n) => pattern.replace(bracketsRegex, n))
      .flatMap(expand);
  }

  return [pattern];
}
