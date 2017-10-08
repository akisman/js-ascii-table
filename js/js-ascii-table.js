/**
 * js-ascii-table.js
 *
 * Copyright (c) 2017 Akis Manolis https://github.com/akisman
 * and licenced under the MIT licence. All rights not explicitly
 * granted in the MIT license are reserved. See the included
 * LICENSE file for more details.
 * 
 */
;(function() {

    'use strict';

    var themes = [
        { title: 'MySQL', value: {
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
        }},
        { title: 'Unicode', value: {
            upperLeft: '╔',
            upperRight: '╗',
            lowerLeft: '╚',
            lowerRight: '╝',
            intersection: '╬',
            line: '═',
            wall: '║',
            intersectionTop: '╦',
            intersectionBottom: '╩',
            intersectionLeft: '╠',
            intersectionRight: '╣'
        }},
        { title: 'Oracle', value: {
            upperLeft: '-',
            upperRight: '-',
            lowerLeft: '-',
            lowerRight: '-',
            intersection: '-',
            line: '-',
            wall: '|',
            intersectionTop: '-',
            intersectionBottom: '-',
            intersectionLeft: '-',
            intersectionRight: '-'
        }}
    ];
    var options = {
        title: '',
        padding: 1,
        header: true,
        spreadsheet: false,
        align: false,
        theme: themes[0].value
    }

    /**
     * JSAsciiTable constructor
     *
     * @param {Array} dat Two-dimensional array
     * @param {Object} opt options
     * @constructor
     * @api public
     */
    function JSAsciiTable(dat, opt) {
        // Use JSON parse & stringify to get a deep copy of the parameter array
        this.data = JSON.parse(JSON.stringify(dat))
        for (var key in opt) {
            if (options.hasOwnProperty(key)) {
                options[key] = opt[key]
            }
        }
    }

    /**
     * Create a new table instance
     *
     * @param {Array} dat Two-dimensional array
     * @param {Object} opt options
     * @api public
     */
    JSAsciiTable.factory = function(dat, opt) {
        return new JSAsciiTable(dat, opt)
    }

    /**
     * Return an array with the available themes
     *
     * @return {Array} themes
     * @api public
     */
    JSAsciiTable.getThemes = function() {
        return themes;
    }

    JSAsciiTable.prototype.toString = 
    JSAsciiTable.prototype.render = function() {

        var data = this.data;

        var table = '';
        var theme = options.theme;

        // Check if all rows have the same number of columns
        for (var i = 0; i < data.length; i++) {
            if (data[i].length != data[0].length) {
                throw {type: 'input', message: 'Uneven number of columns'};
            }
        }

        // Unshift the rows if spreadsheet style
        if (options.spreadsheet == true) {
            data = _convertSpreadsheet(data);
        }

        // Make an array with the length of each column
        var col_length = [];
        for (var i = 0; i < data.length; i++) { // for each row
            for (var j = 0; j < data[i].length; j++) { // for each column
                if (typeof col_length[j] == 'undefined' || col_length[j] < data[i][j].length) {
                    col_length[j] = data[i][j].length; // todo only if its bigger
                }            
            }
        }

        // Add title
        if (options.title != '') {

            table += _createSeparator(col_length, 'title_top') + '\n';
            
            var total_length = _createSeparator(col_length).length;
            if (options.title.length > total_length - 2) {
                throw {type: 'title', message: 'Title is too large'};
            }
            var rem = total_length - 2 - options.title.length;
            var half = Math.floor(rem / 2);

            var row = theme.wall;
            row += Array(half + 1).join(' ');
            row += options.title;
            row += Array(half + 1 + (rem % 2)).join(' ');
            row += theme.wall;
            table += row + '\n';
            table += _createSeparator(col_length, 'title_bottom') + '\n';
        } else {
            table += _createSeparator(col_length, 'top') + '\n'; // Add top line
        }

        // Fill rows
        for (var i = 0; i < data.length; i++) {
            var row = theme.wall;

            for (var j = 0; j < data[i].length; j++) {

                var col = '';
                col += Array(options.padding + 1).join(" "); // Left padding

                if (options.align == true && _isNumeric(data[i][j])) {
                    for (var l = 0; l < col_length[j] - data[i][j].length; l++) {
                        col += ' ';
                    } 
                    col += data[i][j];
                } else {
                    // Normal
                    col += data[i][j];
                    if (data[i][j].length < col_length[j]) {
                        for (var l = 0; l < col_length[j] - data[i][j].length; l++) {
                            col += ' ';
                        }
                    }
                }
                
                col += Array(options.padding + 1).join(" ");
                
                // if its not the last col
                if (j != data[i].length - 1) {
                    col += theme.wall;
                }           
                row += col;
            }
            row += theme.wall;
            table += row + '\n';

            // Todo: If header row is enabled
            if (options.spreadsheet == true) {
                if (i == 0) {
                    table += _createSeparator(col_length) + '\n';
                }
                if (options.header == true && i == 1) {
                    table += _createSeparator(col_length) + '\n';
                }
            } else {
                if (options.header == true && i == 0) {
                    table += _createSeparator(col_length) + '\n';
                }
            }

        }

        table += _createSeparator(col_length, 'bottom');
        
        return table;
    }

    /**
     * Convert data to spreadsheet format
     *
     * @param {Array} table The data array
     * @api private
     */
    var _convertSpreadsheet = function(table) {
        // Create and append the first row
        var spreadrow = ['A'];
        var str = 'a'
        var s = str;
        for (var i = 0; i < table[0].length - 1; i++) {
            
            str= ((parseInt(str, 36)+1).toString(36)).replace(/0/g,'a').replace(/1/g, 'a');
            s += str;

            spreadrow.push(str.toUpperCase());

        }
        table.unshift(spreadrow);
        
        // for each row append the row number if needed
        for (var i = 0; i < table.length; i++) {
            var char = ' ';
            if (options.header == true) {
                if (i > 1) {
                    char = '' + (i - 1) + '';
                } 
            } else {
                if (i > 0) {
                    char = '' + (i + 0) + '';
                }
            }

            table[i].unshift(char);
        }

        return table;
    }

    /**
     * Create seperator
     *
     * @param {Array} col_length An array with each columns length
     * @param {String} type The type of the separator
     * @api private
     */
    var _createSeparator = function(col_length, type) {
        
        // Separator for top bottom mid
        var separator = '';
        var theme = options.theme;

        switch(type) {
            case 'top':
            case 'title_top':
                separator += theme.upperLeft;
            break;
            case 'bottom':
                separator += theme.lowerLeft;
            break;
            case 'title_bottom':
            default:
                separator += theme.intersectionLeft;
        }

        for(var i = 0; i < col_length.length; i++) {
            for (var l = 0; l < col_length[i]; l++) {
                separator += theme.line; // horizontal line
            }
            separator += Array(options.padding * 2 + 1).join(theme.line);

            if (i == col_length.length - 1) {
                switch(type) {
                    case 'top':
                    case 'title_top':
                        separator += theme.upperRight;
                    break;
                    case 'bottom':
                        separator += theme.lowerRight;
                    break;
                    case 'title_bottom':
                        separator += theme.intersectionRight
                    break;
                    default:
                        separator += theme.intersectionRight;
                }
            } else {
                switch(type) {
                    case 'top':
                    case 'title_bottom':
                        separator += theme.intersectionTop;
                    break;
                    case 'bottom':
                        separator += theme.intersectionBottom;
                    break;
                    case 'title_top':
                        separator += theme.line;
                    break;
                    default:
                        separator += theme.intersection;
                }
            }            
        }

        return separator;

    }

    /**
     * Check if input value is numeric, date or null
     *
     * @param {Array} col_length An array with each columns length
     * @param {String} type The type of the separator
     * @api private
     */
    var _isNumeric = function(input) {
        return (!isNaN(parseFloat(input)) && isFinite(input)) || !isNaN(Date.parse(input)) || (typeof input === 'string' && input.toLowerCase() == 'null');
    }

    // this.JSAsciiTable = JSAsciiTable;
    if (typeof(window.JSAsciiTable) === 'undefined') {
        window.JSAsciiTable = JSAsciiTable;
    } else {
        console.log('JSAsciiTable is already defined.');
    }

}).call(this);