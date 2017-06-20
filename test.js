const expect = require('expect')
const strExpand = require('./index')

// return single-item list for strings with no tokens
expect(strExpand('http://example.com'))
    .toEqual([ 'http://example.com' ])

// return empty list for empty string
expect(strExpand(''))
    .toEqual([])

// expand one range
expect(strExpand('http://example.com/[1..3].jpg'))
    .toEqual([
        'http://example.com/1.jpg',
        'http://example.com/2.jpg',
        'http://example.com/3.jpg',
    ])

// expand multiple ranges
expect(strExpand('http://example.com/[1..2]/[3..4].jpg'))
    .toEqual([
        'http://example.com/1/3.jpg',
        'http://example.com/1/4.jpg',
        'http://example.com/2/3.jpg',
        'http://example.com/2/4.jpg',
    ])

// expand enum
expect(strExpand('banana {bread,muffin,cake}'))
    .toEqual([
        'banana bread',
        'banana muffin',
        'banana cake',
    ])
expect(strExpand('{cold,warm} banana {bread,muffin,cake}'))
    .toEqual([
        'cold banana bread',
        'cold banana muffin',
        'cold banana cake',
        'warm banana bread',
        'warm banana muffin',
        'warm banana cake',
    ])

// mix and match
expect(strExpand('It was called {red,blue,yellow} [3..5]'))
    .toEqual([
        'It was called red 3',
        'It was called red 4',
        'It was called red 5',
        'It was called blue 3',
        'It was called blue 4',
        'It was called blue 5',
        'It was called yellow 3',
        'It was called yellow 4',
        'It was called yellow 5',
    ])
