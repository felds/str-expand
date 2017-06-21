const range = require('lodash/fp/range')

const concat = (x,y) => x.concat(y)
const fmap = (f,xs) => xs.map(f).reduce(concat, [])

Array.prototype.fmap = function(f) {
  return fmap(f,this);
};



function strExpand(pattern) {
    if (pattern === '') {
        return []
    }

    // detect braces
    // https://regex101.com/r/NUZ0mY/2
    const bracesRegex = /\{([^\}]*?)\}/
    const bracesMatch = bracesRegex.exec(pattern)
    if (bracesMatch) {
        const vals = bracesMatch[1].split(',')
        return vals
            .map(v => pattern.replace(bracesRegex, v))
            .fmap(s => strExpand(s))
    }

    // https://regex101.com/r/NUZ0mY/3
    const bracketsRegex = /\[(\d+)\.\.(\d+)\]/
    const bracketsMatch = bracketsRegex.exec(pattern)
    if (bracketsMatch) {
        const { 1: from, 2: to } = bracketsMatch
        return range(parseInt(from), parseInt(to) + 1)
            .map(v => pattern.replace(bracketsRegex, v))
            .fmap(s => strExpand(s))
    }
    
    return [ pattern ]
}

module.exports = strExpand
