str-expand
==========

Expand a string pattern into a list of strings using sequence or enum tokens.

## Install

```shell
npm i str-expand
```

## Usage

```js
const strExpand = require('str-expand')


// single-item list for strings with no tokens

strExpand('http://example.com')
//=> [ 'http://example.com' ]


// empty list for empty string

strExpand('')
//=> []


// expand numeric ranges

strExpand('http://example.com/[1..3].jpg')
//=> [
//        'http://example.com/1.jpg',
//        'http://example.com/2.jpg',
//        'http://example.com/3.jpg',
// ]

strExpand('http://example.com/[1..2]/[3..4].jpg')
// => [
//        'http://example.com/1/3.jpg',
//        'http://example.com/1/4.jpg',
//        'http://example.com/2/3.jpg',
//        'http://example.com/2/4.jpg',
// ]

strExpand('[090..100].png')
// => [ '090.png', '091.png', ... '099.png', '100.png' ]




// expand string enums

strExpand('banana {bread,muffin,cake}')
//=> [
//        'banana bread',
//        'banana muffin',
//        'banana cake',
// ]

strExpand('{cold,warm} banana {bread,muffin,cake}')
//=> [
//        'cold banana bread',
//        'cold banana muffin',
//        'cold banana cake',
//        'warm banana bread',
//        'warm banana muffin',
//        'warm banana cake',
// ]


// mix and match

strExpand('It was called {red,blue,yellow} [3..5]')
// => [
//        'It was called red 3',
//        'It was called red 4',
//        'It was called red 5',
//        'It was called blue 3',
//        'It was called blue 4',
//        'It was called blue 5',
//        'It was called yellow 3',
//        'It was called yellow 4',
//        'It was called yellow 5',
// ]
``` 
