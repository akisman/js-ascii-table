# Javascript Ascii Table

A *really simple* Javascript library that turns arrays into pretty ASCII tables, inspired by [ascii-table](https://github.com/sorensen/ascii-table). See it in action <a href="https://akisman.github.io/js-ascii-table/">here</a>.

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
+---+-------+----+----+
|   | A     | B  | C  |
+---+-------+----+----+
| 1 | Lorem | 18 | 02 |
| 2 | Ipsum | 03 | 04 |
| 3 | dolor | 17 | 08 |
+---+-------+----+----+
```

Unicode theme with Title & Header
```
╔══════════════════════╗
║        Table         ║
╠═══════╦═══════╦══════╣
║ Some  ║ Magic ║ Misc ║
╠═══════╬═══════╬══════╣
║ Lorem ║ 18    ║ 02   ║
║ Ipsum ║ 03    ║ 04   ║
║ dolor ║ 17    ║ 08   ║
╚═══════╩═══════╩══════╝
```


# License

Copyright © 2017 Akis Manolis https://github.com/akisman

js-ascii-table is licensed under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.