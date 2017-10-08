var app = new Vue({
  el: '#app',
  data: {
    textInput: 'Some,Magic,Misc\nLorem,18,02\nIpsum,03,04\ndolor,17,08',
    textOutput: '',
    hasError: false,
    errorMessage: '',
    title: '',
    padding: 1,
    useHeader: true,
    formatSpreadsheet: false,
    alignNumbers: false,
    theme: JSAsciiTable.getThemes()[0].value,
    themeOptions: JSAsciiTable.getThemes()
  },
  computed: {
    showHeader: function() {
        if (this.useHeader == true && this.formatSpreadsheet == false) {
            return true;
        } else {
            return false;
        }
    }
  },
  methods: {
    createHTMLTable: function() {
        var table = '<table>';
        var inputData = Papa.parse(this.textInput);
        var data = inputData.data;

        if (this.formatSpreadsheet == true) {
            data = this.convertToSpreadsheet(data);
        }

        if (this.title != '') {
            table += '<caption>' + this.title + '</caption>';
        }

        // Fill normal rows
        for (var i = 0; i < data.length; i++) {
            table += '<tr>';
            for (var j = 0; j < data[i].length; j++) {
                if (this.showHeader && i == 0) {
                    table+= '<th>' + data[i][j] + '</th>';
                } else {
                    table+= '<td>' + data[i][j] + '</td>';
                }
            }
            table += '</tr>';
        }

        table += '</table>';

        this.textOutput = table;

    },
    createTable: function() {

        var table = '';
        var theme = this.theme;

        // Remove newlines from beginning or end of input string
        var input = this.textInput.replace(/^\s+|\s+$/g, '');

        // Try to parse data
        var inputData = Papa.parse(input);
        var data = inputData.data;
        
        var ascii = new JSAsciiTable(data, {
            title: this.title, 
            spreadsheet: this.formatSpreadsheet, 
            header: this.showHeader,
            align: this.alignNumbers,
            padding: this.padding,
            theme: theme});

        this.hasError = false;
        try {
            var res = ascii.toString();
        } catch (e) {
            this.errorMessage = e.message;
            this.hasError = true;
            this.textOutput = '';
            return;
        } 

        this.textOutput = res; 

    },
    convertToSpreadsheet: function(dat) {
        // Create and append the first row
        var spreadrow = ['A'];
        var str = 'a'
        var s = str;
        for (var i = 0; i < dat[0].length - 1; i++) {
            
            str= ((parseInt(str, 36)+1).toString(36)).replace(/0/g,'a').replace(/1/g, 'a');
            s += str;

            spreadrow.push(str.toUpperCase());

        }
        dat.unshift(spreadrow);
        
        // for each row append the row number if needed
        for (var i = 0; i < dat.length; i++) {
            char = ' ';
            if (this.showHeader == true) {
                if (i > 1) {
                    char = '' + (i - 1) + '';
                } 
            } else {
                if (i > 0) {
                    char = '' + (i + 0) + '';
                }
            }

            dat[i].unshift(char);
        }

        return dat;
    }
  }
})