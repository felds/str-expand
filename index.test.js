const expand = require('./index');

test('it expands a simple string to itself', () => {
    expect(expand('https://example.com'))
        .toEqual(['https://example.com']);
})

test('it expands an empty string to an empty list', () => {
    expect(expand(''))
        .toEqual([]);
})

test('it expands numerical ranges', () => {
    expect(expand('http://example.com/[1..3].jpg'))
        .toEqual([
            'http://example.com/1.jpg',
            'http://example.com/2.jpg',
            'http://example.com/3.jpg',
        ]);
})

// // expand one range

// // expand multiple ranges
// expect(strExpand('http://example.com/[1..2]/[3..4].jpg'))
//     .toEqual([
//         'http://example.com/1/3.jpg',
//         'http://example.com/1/4.jpg',
//         'http://example.com/2/3.jpg',
//         'http://example.com/2/4.jpg',
//     ])

// // expand enum
// expect(strExpand('banana {bread,muffin,cake}'))
//     .toEqual([
//         'banana bread',
//         'banana muffin',
//         'banana cake',
//     ])
// expect(strExpand('{cold,warm} banana {bread,muffin,cake}'))
//     .toEqual([
//         'cold banana bread',
//         'cold banana muffin',
//         'cold banana cake',
//         'warm banana bread',
//         'warm banana muffin',
//         'warm banana cake',
//     ])

// // mix and match
// expect(strExpand('It was called {red,blue,yellow} [3..5]'))
//     .toEqual([
//         'It was called red 3',
//         'It was called red 4',
//         'It was called red 5',
//         'It was called blue 3',
//         'It was called blue 4',
//         'It was called blue 5',
//         'It was called yellow 3',
//         'It was called yellow 4',
//         'It was called yellow 5',
//     ])

// // padded ranges
// expect(strExpand('[009..011]'))
//     .toEqual([ '009', '010', '011' ])

// // decrement
// expect(strExpand('[3..0]'))
//     .toEqual([ '3', '2', '1', '0' ])

// // padded decrement
// expect(strExpand('[12..08]'))
//     .toEqual([ '12', '11', '10', '09', '08' ])
