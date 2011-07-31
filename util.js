//Utility for creating B/S CA rules
function generate_rule(b, s) {

        var rule = function(neighborhood) {

                var sum = 0;
                var lookup = neighborhood[1][1] ? s : b;
                neighborhood[1][1] = 0;

                for (var row in neighborhood) {

                        for (var item in neighborhood[row]) {

                                sum += parseInt(neighborhood[row][item]);
                        }
                } 

                return lookup.indexOf(sum) != -1 ? 1 : 0;
        }

       return rule;
}

//Utility for making 2D arrays
function generate_2d(width, height) {

        var arr = new Array(height);

        for (var i=0; i<height; i++) {

               arr[i] = new Array(width);
              
               for (var j=0; j<width; j++) {

                        arr[i][j] = 0; 
               } 
        }

        return arr;
} 

