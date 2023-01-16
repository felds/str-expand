// index.ts
var padCharsStart = (char, minLength) => (str) => String(str).padStart(minLength, char);
var range = (from, to) => {
  const arr = Array(Math.abs(from - to));
  const step = Math.sign(to - from);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = +from + i * step;
  }
  return arr;
};
function expand(pattern) {
  if (pattern === "") {
    return [];
  }
  const bracesRegex = /\{([^\}]*?)\}/;
  const bracesMatch = bracesRegex.exec(pattern);
  if (bracesMatch) {
    const values = bracesMatch[1].split(",");
    return values.map((v) => pattern.replace(bracesRegex, v)).flatMap(expand);
  }
  const bracketsRegex = /\[(\d+)\.\.(\d+)\]/;
  const bracketsMatch = bracketsRegex.exec(pattern);
  if (bracketsMatch) {
    const from = parseInt(bracketsMatch[1]);
    const to = parseInt(bracketsMatch[2]);
    const minLength = Math.min(from.toString().length, to.toString().length);
    [...range(from, to), to].map(padCharsStart("0", minLength)).map((n) => pattern.replace(bracketsRegex, n)).flatMap(expand);
  }
  return [pattern];
}
export {
  expand as default
};
