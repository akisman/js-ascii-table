# Javascript Ascii Table

A *really simple* Javascript library that turns arrays into pretty ASCII tables, inspired by [ascii-table](https://github.com/sorensen/ascii-table). 

# Installation

Just include the libary in your project

```html
<script src="js/js-ascii-table.js"></script>
```

# Usage

Initialize a new ```JSAsciiTable``` object by passing a two-dimension array, an optional options object and call the ```render()``` method to generate the ASCII table.

```javascript
var table = new JSAsciiTable(data, options);
var ascii = table.render();
consonle.log(ascii);
```

```
+------+---------+-----------+
| Data | Numbers | Misc      |
+------+---------+-----------+
| Data | 1       | Even more |
| Text | 2       | 7         |
| Etc  | 3       | 10        |
+------+---------+-----------+
```

## Options Object

The available options:

```javascript
var options = {
    title: 'Table Title', // Table Title
    spreadsheet: false,  // Spreadsheet type 
    header: true, // Use first row as a header
    align: false, // Align numeric values to the right
    padding: 1, // Padding
    theme: AsciiTable.getThemes()[0].value // Theme
}
```

## Custom theme

You can use a custom theme via the options object

```javascript
var customTheme = {
    upperLeft: '+',
    upperRight: '+',
    lowerLeft: '+',
    lowerRight: '+',
    intersection: '+',
    line: '-',
    wall: '|',
    intersectionTop: '+',
    intersectionBottom: '+',
    intersectionLeft: '+',
    intersectionRight: '+'
}

var options = {
    // optional other options
    theme: customTheme
}

var table = new JSAsciiTable(data, options);
```

## Static Methods

To get all the available themes:

```javascript
JSAsciiTable.getThemes();
```

# Examples

MySQL theme with Spreadsheet option enabled
```
+---+-------+-----+---+
|   | A     | B   | C |
+---+-------+-----+---+
| 1 | Lorem | 256 | 8 |
| 2 | Ipsum | 64  | 6 |
| 3 | dolor | 128 | 7 |
+---+-------+-----+---+
```

Unicode theme with Title & Header
```
╔══════════════════════╗
║        Magic         ║
╠═══════╦═══════╦══════╣
║ Some  ║ Magic ║ Some ║
╠═══════╬═══════╬══════╣
║ Lorem ║    18 ║    8 ║
║ Ipsum ║    03 ║    6 ║
║ dolor ║    87 ║    7 ║
╚═══════╩═══════╩══════╝
```


# License

Copyright © 2017 Akis Manolis https://github.com/akisman

js-ascii-table is licensed under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.