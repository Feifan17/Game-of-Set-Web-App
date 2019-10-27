/*jshint esversion: 6 */

//start the game when the page is loaded
var deck = generateCards();
var board =[];
var selection = [];
var score = 0;
fillBoard(board, deck);
var remain = deck.length;
startStopwatch();

//logic when user clicks the restart button
$("#restart-btn").click(function() {
  playSound("restart");
  clearStopwatch();
  startStopwatch();
  $(".pressed").removeClass("pressed");
  score = 0;
  document.getElementById('score').innerHTML= score;
  deck = generateCards();
  board = [];
  selection = [];
  resetBoard(board, deck);
  remain = deck.length;
  document.getElementById('remain').innerHTML= remain;
});

//logic when user clicks the hint button
$("#hint").click(function() {
  playSound("hint");
  let hint_arr = hint(board);

  //if there is a set on the board, give the user hint
  if(hint_arr.length > 0) {

    let card1 = findCard(board[parseInt(hint_arr[0], 10)]);
    let card2 = findCard(board[parseInt(hint_arr[1], 10)]);
    let card3 = findCard(board[parseInt(hint_arr[2], 10)]);

    $("img[src='" + card1 + "']").parent().toggleClass("hint");
    $("img[src='" + card2 + "']").parent().toggleClass("hint");
    $("img[src='" + card3 + "']").parent().toggleClass("hint");
    setTimeout(function(){
      $("img[src='" + card1 + "']").parent().removeClass("hint");
    },200);
    setTimeout(function(){
      $("img[src='" + card2 + "']").parent().removeClass("hint");
    },200);
    setTimeout(function(){
      $("img[src='" + card3 + "']").parent().removeClass("hint");
    },200);

  }// if there is no set on the board, put the cards on the board back to the deck, reshuffle, and refill the board.
  else {
    if(deck.length > 0) {
      alert("No set exists. The board will be reset!");
      deck = deck.concat(board);
      deck = _.shuffle(deck);
      board = [];
      resetBoard(board, deck);
    }
    else {
      alert("Game over!! There are no more sets ");
      clearStopwatch();
      startStopwatch();
      score = 0;
      document.getElementById('score').innerHTML= score;
      deck = generateCards();
      board = [];
      selection = [];
      resetBoard(board, deck);
      remain = deck.length;
      document.getElementById('remain').innerHTML= remain;
    }
  }
});

//pop up game instruction when the user clicks on the help button.
$("#help").click(function() {
  playSound("help");
  if($("#description").hasClass("hidden")) {
    $("#description").removeClass("hidden");
  }
  else {
    $("#description").fadeToggle("slow");
  }
});

//logic when the user clicks on the cards on the board.
$(".btn").click(function() {
  //get the card attributes
  let selectedCard = $(this).find("img").attr("src");
  let id = $(this).attr("id");
  let pattern = selectedCard.substring(7, selectedCard.length - 4).split("_");
  let card = {number: pattern[0], shape: pattern[1], fill: pattern[2], color: pattern[3]};

  //if the card is selected already, unselect it.
  if($(this).hasClass("pressed")) {
    unselectCard(this);
    selection.splice(selection.indexOf(id), 1);
  }
  else {
    //if the card is not selected and user has less than 3 cards in the selection, select it.
    if(selection.length < 3) {
      selectCard(this);
      selection.push(id);
    }
    //if user selected three cards, test if these cards form a set.
    if(selection.length == 3) {
      let test = isSet(selection, board);
      //if the cards form a set, add 1 points and replace those cards.
      if(test) {
        playSound("right");
        score++;
        document.getElementById('score').innerHTML= score;
        replaceThree(board, deck, selection);
        remain = deck.length;
        document.getElementById('remain').innerHTML= remain;
      }
      else {
        playSound("wrong");
      }
      //clear selection.
      selection = [];
      $(".pressed").removeClass("pressed");

      //check if the board still has cards
      var resume = 0;
      if(deck.length == 0) {
        for(var i = 0; i <  board.length; i++) {
          if(board[i] != null) {
            resume = 1;
            break;
          }
        }
        //if board has no more cards, end the game.
        if(resume == 0) {
          alert("Game over!! There are no more sets ");
          clearStopwatch();
          startStopwatch();
          score = 0;
          document.getElementById('score').innerHTML= score;
          deck = generateCards();
          board = [];
          selection = [];
          resetBoard(board, deck);
          remain = deck.length;
          document.getElementById('remain').innerHTML= remain;
        }
      }
    }
  }
  
});
