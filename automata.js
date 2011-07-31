$(document).ready(function() {                                                                                  

        var stop=-1;
        $('#control').hide();

        //Create the board, start running it
        $('#init').click(

               function(event) {

                        event.preventDefault(); 
                        $('#control').show();

                        //Get inputs
                        var width = parseInt($('#rows').attr('value'));
                        var height = parseInt($('#cols').attr('value'));
                        var birth = $('#birth').attr("value");
                        var survival = $('#survival').attr("value"); 
                        var horizontal = parseInt($('#horizontal option:selected').attr('value'));
                        var vertical = parseInt($('#vertical option:selected').attr('value')); 
                        var birthList = new Array(birth.length);
                        var survivalList = new Array(survival.length);

                        for (var s=0; s<birth.length; s++) { 
                               
                                birthList[s] = parseInt(birth.charAt(s));
                        }               

                        for (var s=0; s<survival.length; s++) { 
                               
                                survivalList[s] = parseInt(survival.charAt(s)); 
                        }

                        //Initialize board & rules
                        aut = new Board(width, height);
                        rule = generate_rule(birthList, survivalList);
                        aut.rule = rule;
                        aut.horizontal = horizontal;
                        aut.vertical = vertical;

                        //Execution loop
                        var execLoop = function(automata) { 

                                if (stop==0) {

                                        automata.draw();
                                        automata.iterate();
                                }

                                return automata;
                        }


                        // *
                        //  *
                        //*** 
                        var m = 2;
                        var n = 2;
                        aut.board[m][n] = 1;
                        aut.board[m-1][n-1] = 1;
                        aut.board[m-2][n+1] = 1;
                        aut.board[m-2][n] = 1;
                        aut.board[m-2][n-1] = 1;

                        //Scale <canvas> element
                        $('#result').attr('width', aut.size*aut.height);
                        $('#result').attr('height', aut.size*aut.width);

                        if (stop==-1) {

                                stop = 0;
                                setInterval(function() {execLoop(aut);}, 200);
                        }
               }
        );

        //Determine which cell was clicked and flip its value
        $('#result').click(

               function(event) {

                       var x = event.pageX - $(this).offset().left;
                       var y = event.pageY - $(this).offset().top;
                       var row = Math.floor(x/aut.size);
                       var col = Math.floor(y/aut.size);
                       aut.board[row][col] = (aut.board[row][col]==1) ? 0 : 1;
                       aut.draw();
               } 
        );
       
        //Display the information panel
        $("#help-icon").click(

                function(event) {

                        if ($("#help-icon").html()=="?") {

                                $("#information").show();
                                $("#help-icon").html("X");
                        }
                        else {
                                $("#information").hide();
                                $("#help-icon").html("?");
                        }
                }
         );

         //Clear the board
         $("#clear").click(

                function(event) {

                        aut.board = generate_2d(aut.width, aut.height);
                        aut.draw();
                }
         );

         //Randomize the board (1/3 live, 2/3 dead)
         $("#random").click(

                function(event) { 

                        for (var i=0; i<aut.height; i++) {
        
                                for (var j=0; j<aut.width; j++) {

                                       aut.board[i][j] = (Math.floor(Math.random()*3)==1) ? 1 : 0;
                                }
                        }
                        aut.draw();
                }
         );

         //Iterate the board by one timestep
         $("#step").click(

                function(event) {

                        if (stop==1) {

                                aut.iterate();
                                aut.draw();
                        }
                }
         );

         //Toggle between running and paused
         $("#stop-go").click(

                function(event) {

                        aut.draw();

                        if (stop==1) {
        
                                stop = 0;
                                $(this).html('&#10074; &#10074;');                               
                        }
                        else {

                                stop = 1;
                                $(this).html('&#10148;');
                        } 
                }
         ); 
});
