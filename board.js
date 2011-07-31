        //Board constructor
        function Board(width, height) {

                this.board = generate_2d(width, height);
                this.iterations = 0;
                this.width = width;
                this.height = height;
                this.size = 10;

                //----Private methods----//
                this.fold = function(sheet, horizontal, vertical) {
 
                        sheet = this.hFold(horizontal, sheet);
                        sheet = this.vFold(vertical, sheet);                       
                        return sheet;
                }       

                //Handle vertical folding of the board
                this.vFold  = function(type, sheet) {

                        var connect;

                        switch(type) {
        
                                case 1: 
                                connect = function(strip) {return strip;}
                                break;

                                case 0:
                                connect = function(strip) {

                                        return generate_2d(strip.length, 1);
                                }
                                break;

                                case -1:
                                connect = function(strip) {

                                        flipped = new Array(strip.length)

                                        for (item in strip) {

                                                flipped[strip.length-item] = strip[item];
                                        }

                                        return flipped;
                                }
                                break;
                        }

                        sheet.push(connect(sheet[0]));
                        sheet.unshift(connect(sheet[sheet.length-2]));
                        return sheet;
                }

                //Handle horizontal folding of the board
                this.hFold = function(type, sheet) {

                        switch(type) {

                                case 1:
                                return sheet.map(function(row) {return [row[row.length-1]].concat(row).concat(row[0])});
                                        
                                case 0:                
                                return sheet.map(function(row) {return [0].concat(row).concat([0])});

                                case -1:
                                var upsideDown = sheet.slice(0).reverse();
                                var newSheet = sheet.slice(0);
                                var lenRow = sheet[0].length-1;
                                
                                for (row in sheet) {
                                        
                                        newSheet[row] = [upsideDown[row][lenRow]].concat(sheet[row].slice(0)).concat([upsideDown[row][0]]); 
                                }

                                return newSheet;
                        }
                }
        }

        //Run a single iteration of the board
        Board.prototype.iterate = function() {

                //Create a 2D array of Moore neighborhoods
                var neighborhoods = generate_2d(this.width, this.height);
                var surface = this.fold(this.board.slice(0), this.horizontal, this.vertical);

                for (var i=1; i<this.height+1; i++) {

                        for (var j=1; j<this.width+1; j++) {

                                var neighbors = new Array(3);

                                for (var n=-1; n<1+1; n++) {
        
                                        row = (i+n);
                                        fromCol = (j-1);
                                        toCol = (j+2);
                                        neighbors[n+1] = surface[row].slice(fromCol, toCol);
                                }
 
                                neighborhoods[i-1][j-1] = neighbors;
                        }
                }
 
                //Apply the given rule to the neighborhoods to yield the next generation
                for (var i=0; i<this.height; i++) {
                
                       for (var j=0; j<this.width; j++) {

                               this.board[i][j] = this.rule(neighborhoods[i][j]);
                       }
                }
        }

        //Draw the board
        Board.prototype.draw = function() {

                var canvas = $('#result').get(0);
                var ctx = canvas.getContext('2d');

                ctx.fillStyle = "#E0E0E0";
                ctx.fillRect(0, 0, this.size*this.height, this.size*this.width);
                ctx.fillStyle = "#333333";

                for (var i=0; i<this.height; i++) {

                        for (var j=0; j<this.width; j++) {

                                if (this.board[i][j]==1) {

                                        ctx.fillRect(i*this.size, j*this.size, this.size, this.size);
                                }
                        }
                }
        }
