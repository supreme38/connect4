$( document ).ready(function() {
  //using loop for...
  //creating div container
  //appending container to div column
  //prepending buttons to the column
  //appending div class 'open' to column
  //creating scoreboard div
  var create = function(){
    $divContainer = ("<div class='container'></div>")
    $(document.body).append($divContainer);

    for(var i = 0; i < 7; i++){
      $('.container').append("<div class='column'></div>");
    };
    $('.column').prepend("<button class='button'></button>")
    for(var j = 0; j < 6; j++){
      $('.column').append("<div class='open'></div>");
    };
    $(document.body).append("<div class='scoreboard'></div>");
    $(document.body).append("<div class='gameover'>NEW &nbsp; GAME</div>")
  };

  create();

  //player counter to take turns
  player = 1;

  //tack wins counter
  player1Wins = 0;
  player2Wins = 0;

  //creating drop disc function
  //checks the siblings of button to see if class is 'open'
  //if open, will change to black or red
  //player is called
  //playerTurn function is called
  //checkWinner function is called
  $('button').click(function() {
    var checkColumn = ($(this).siblings());
    for(var i = 5; i >= 0; i--){
      if(player == 1 && $(checkColumn[i]).hasClass('open')){
          checkColumn[i].className = 'red';
          // $(checkColumn[i]).addClass('animated bounceInDown');
          player -=1;
          playerTurn();
          checkWinner();
          return;
        } else {
          if($(checkColumn[i]).hasClass('open')){
            checkColumn[i].className = 'black';
            // $(checkColumn[i]).addClass('animated bounceInDown');
            player +=1;
            playerTurn();
            checkWinner();
            return;
          }
        }
      }
  });

  //creating empty array to check for winning combos
  var board = [];

  //creating .column selector
  //using loop and pushing the children of .column selector into the empty array
  var makeBoard = function(){
    var $divColumn = $('.column');

    for(var i = 0; i < 7; i++){
      var divPos = $divColumn[i].children;
      board.push(divPos);
      }
  }
  makeBoard();

  //creating function for button to change color
  //changes on players turn
  //turns back orange when you hover out
  $('button').hover(function(){
      if(player == 1){
        $(this).css({'background-color': '#60DFE5', 'border': '1px'});
        } else {
        $(this).css({'background-color': '#FF7F50', 'border': '1px'});
        }
      }, function(){
      $(this).css({'background-color': 'white', 'border': '5px solid #FF847C'});
  });

  //creating a function to change the color of the button
  //after the players turn so it does not stay orange
  //using https://github.com/daneden/animate.css file for animations
  $('button').click(function(){
    if(player != 1){
      $(this).css({'background-color': '#FF7F50', 'border': '1px'});
      $(this).addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
      function(){
          $(this).removeClass('animated shake');
      });
    } else {
      $(this).css({'background-color': '#60DFE5', 'border': '1px'});
      $(this).addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
      function(){
      $(this).removeClass('animated shake');
      });
    };
  });


  //creating player names
  var $player1
  var $player2

  //creating submit button that stores players names
  //appending scoreboard with player wins
  $('#submit').click(function(){
    $player1 = $('#player1').val().toUpperCase();
    $player2 = $('#player2').val().toUpperCase();
    $('.playerturn').html($player1 + "'s TURN");
    $('.scoreboard').append($player1 + ' : '  + player1Wins + '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' + $player2 + ' : ' + player2Wins);
    $('.overlay').slideUp();
    $('.overlay2').slideUp();
  });

  //creating playerturn display
  //adding script class for animation
  //then removing the script class so i can add it again to activate it
  var playerTurn = function(){
    if(player == 1){
      $('.playerturn').html($player1 + "'s TURN");
      $('.playerturn').addClass('animated flash').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
      function(){
      $(this).removeClass('animated flash');
      });
    } else {
      $('.playerturn').html($player2 + "'s TURN");
      $('.playerturn').addClass('animated flash').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
      function(){
      $(this).removeClass('animated flash');
      });
    };
  };

  //function to check winning combos
  //checks each column then each div
  var winnerCol = function(){
    for(var i = 0; i < board.length; i++){
      for(var j = 1; j < board[i].length; j++){
        if ($(board[i][j]).hasClass('red') && $(board[i][j + 1]).hasClass('red') && $(board[i][j + 2]).hasClass('red') && $(board[i][j + 3]).hasClass('red')) {
          popup1();
          player1Wins +=1;
          reset();
        };
        if ($(board[i][j]).hasClass('black') && $(board[i][j + 1]).hasClass('black') && $(board[i][j + 2]).hasClass('black') && $(board[i][j + 3]).hasClass('black')) {
          popup2();
          player2Wins +=1;
          reset();
        };
      };
    };
  };

  //check each row then each div
  var winnerRow = function(){
    for(var i = 0; i < board.length - 3; i++){
      for(var j = 1; j < board[i].length; j++){
        if ($(board[i][j]).hasClass('red') && $(board[i + 1][j]).hasClass('red') && $(board[i + 2][j]).hasClass('red') && $(board[i + 3][j]).hasClass('red')) {
          popup1();
          player1Wins +=1;
          reset();
        };
        if ($(board[i][j]).hasClass('black') && $(board[i + 1][j]).hasClass('black') && $(board[i + 2][j]).hasClass('black') && $(board[i + 3][j]).hasClass('black')) {
          popup2();
          player2Wins +=1;
          reset();
        };
      };
    };
  };

  //check winner for diagonal going \\ way
  var winnerD1 = function(){
    for(var i = 0; i < board.length - 3; i++){
      for(var j = 1; j < board[i].length; j++){
        if ($(board[i][j]).hasClass('red') && $(board[i + 1][j + 1]).hasClass('red') && $(board[i + 2][j + 2]).hasClass('red') && $(board[i + 3][j + 3]).hasClass('red')) {
          popup1();
          player1Wins +=1;
          reset();
        };
        if ($(board[i][j]).hasClass('black') && $(board[i + 1][j + 1]).hasClass('black') && $(board[i + 2][j + 2]).hasClass('black') && $(board[i + 3][j + 3]).hasClass('black')) {
          popup2();
          player2Wins +=1;
          reset();
        };
      };
    };
  };

  //check winner for diagonal going // way
  var winnerD2 = function(){
    for(var i = 6; i >= board.length - 4; i--){
      for(var j = 1; j < board[i].length; j++){
        if ($(board[i][j]).hasClass('red') && $(board[i - 1][j + 1]).hasClass('red') && $(board[i - 2][j + 2]).hasClass('red') && $(board[i - 3][j + 3]).hasClass('red')) {
          popup1();
          player1Wins +=1;
          reset();
        };
        if ($(board[i][j]).hasClass('black') && $(board[i - 1][j + 1]).hasClass('black') && $(board[i - 2][j + 2]).hasClass('black') && $(board[i - 3][j + 3]).hasClass('black')) {
          popup2();
          player2Wins +=1;
          reset();
        };
      };
    };
  };

  //creating counter to check if game is tie
  var counter = 0;
  var tie = function(){
    counter +=1;
    if (counter == 42){
      popuptie();
      reset();
    };
  };

  //check winner function
  //runs col,row,d1, d2 and tie
  var checkWinner = function(){
    winnerCol();
    winnerRow();
    winnerD1();
    winnerD2();
    tie();
  };

  //function to clear the board
  //looking for the children of .column with class red or black
  //and then removing them and adding back .open
  var reset = function (){
    for(var i = 0; i < $('.column').children().length; i++){
      if($($('.column').children()[i]).hasClass('red')){
        $($('.column').children()[i]).removeClass('red').addClass('open');
      };
      if($($('.column').children()[i]).hasClass('black')){
        $($('.column').children()[i]).removeClass('black').addClass('open');
      };
    };
    $('.scoreboard').html($player1 + ' : '  + player1Wins + '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' + $player2 + ' : ' + player2Wins);
    counter = 0;
  };

  //creating reset function when div is clicked
  $('.gameover').click(function(){
    reset();
  });

  //creating keyup function that acts the same as the submit function
  // when i press enter
  $(document).keyup(function(evt) {
    if (evt.keyCode == 13) {
      $player1 = $('#player1').val().toUpperCase();
      $player2 = $('#player2').val().toUpperCase();
      $('.playerturn').html($player1 + "'s TURN");
      $('.scoreboard').append($player1 + ' : '  + player1Wins + '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' + $player2 + ' : ' + player2Wins);
      $('.overlay').slideUp();
      $('.overlay2').slideUp();
    };
  });

//got rid of alert for winning
//added a overlay to annouce the winner and ti
  var popup1 = function (){
    $('.message').html($player1 + ' WINS!');
    $('.popup').fadeIn();
  };
  var popup2 = function (){
    $('.message').html($player2 + '&nbsp; WINS!');
    $('.popup').fadeIn();
  };
  var popuptie = function (){
    $('.message').html('NOBODY WINS!');
    $('.popup').fadeIn();
  };
  $('.again').click(function(){
    $('.popup').fadeOut();
    reset();
  })
});
