const { flow, range, flatMap, map, padCharsStart } = require('lodash/fp')

/**
 * Expand a string pattern into a list of strings using sequence or enum tokens.
 * 
 * @param {string} pattern  The pattern to be expanded.
 * @returns {string[]}  The collection of expansions.
 */
function expand(pattern) {
    if (pattern === '') {
        return []
    }

    // detect braces
    // https://regex101.com/r/NUZ0mY/2
    const bracesRegex = /\{([^\}]*?)\}/
    const bracesMatch = bracesRegex.exec(pattern)
    if (bracesMatch) {
        const vals = bracesMatch[1].split(',')

        return pipe(
            map(v => pattern.replace(bracesRegex, v)),
            flatMap(s => expand(s))
        )(vals)
    }

    // https://regex101.com/r/NUZ0mY/3
    const bracketsRegex = /\[(\d+)\.\.(\d+)\]/;
    const bracketsMatch = bracketsRegex.exec(pattern);
    if (bracketsMatch) {
        const { 1: from, 2: to } = bracketsMatch
        const minLength = Math.min(from.length, to.length);

        // @todo unroll this replace? maybe? who knows?
        // bracketsMatch.start = pattern.slice(0, bracketsMatch.index);
        // bracketsMatch.end = pattern.slice(bracketsMatch.index + bracketsMatch[0].length);

        console.log(bracketsMatch)

        return pipe(
            map(padCharsStart("0", minLength)),
            map(n => pattern.replace(bracketsRegex, n)),
            flatMap(s => expand(s))
        )(range(parseInt(from), parseInt(to)).concat(to))
    }

    return [pattern]
}


const pipe = (...fs) => x => fs.reduce((acc, f) => f(acc), x);
// const map = f => xs => xs.map(f);
// const padCharsStart = (char, len) => 


// console.log(
//     range(1, 4).concat(4),
//     range(1, 4)
// )

// function expand(pattern) {
// }

module.exports = expand;
