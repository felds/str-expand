const { flow, range, flatMap, map } = require('lodash/fp')

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

        return flow(
            map(v => pattern.replace(bracesRegex, v)),
            flatMap(s => strExpand(s))
        )(vals)
    }

    // https://regex101.com/r/NUZ0mY/3
    const bracketsRegex = /\[(\d+)\.\.(\d+)\]/
    const bracketsMatch = bracketsRegex.exec(pattern)
    if (bracketsMatch) {
        const { 1: from, 2: to } = bracketsMatch

        return flow(
            map(v => pattern.replace(bracketsRegex, v)),
            flatMap(s => strExpand(s))
        )(range(parseInt(from), parseInt(to) + 1))
    }
    
    return [ pattern ]
}

module.exports = strExpand
