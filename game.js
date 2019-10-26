/*jshint esversion: 6 */

var deck = generateCards();
var board =[];
var selection = [];
var score = 0;
fillBoard(board, deck);

/* for debugging */
// console.log(deck);



$("#start-btn").click(function() {
  gameStart(deck, board, selection);
  clearStopwatch();
  startStopwatch();
  /* for debugging */
  // console.log(deck);
  // console.log(board);
  // console.log(selection);
});

$("#hint").click(function() {

  let hint_arr = hint(board);
  console.log(hint_arr);

  if(hint_arr.length > 0) {

    let card1 = 'images/' + board[parseInt(hint_arr[0], 10)].number + '_' + board[parseInt(hint_arr[0], 10)].shape + '_' + board[parseInt(hint_arr[0], 10)].fill + '_' + board[parseInt(hint_arr[0], 10)].color + '.png';
    let card2 = 'images/' + board[parseInt(hint_arr[1], 10)].number + '_' + board[parseInt(hint_arr[1], 10)].shape + '_' + board[parseInt(hint_arr[1], 10)].fill + '_' + board[parseInt(hint_arr[1], 10)].color + '.png';
    let card3 = 'images/' + board[parseInt(hint_arr[2], 10)].number + '_' + board[parseInt(hint_arr[2], 10)].shape + '_' + board[parseInt(hint_arr[2], 10)].fill + '_' + board[parseInt(hint_arr[2], 10)].color + '.png';

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
  }
  else {
    alert("The board has no set!");
  }
  /* for debugging */
  // console.log(deck);
  // console.log(board);
  // console.log(selection);
});

$(".btn").click(function() {
  //get the card attributes
  let selectedCard = $(this).find("img").attr("src");
  let id = $(this).attr("id");
  let pattern = selectedCard.substring(7, selectedCard.length - 4).split("_");
  let card = {number: pattern[0], shape: pattern[1], fill: pattern[2], color: pattern[3]};

  if($(this).hasClass("pressed")) {
    unselectCard(this);
    selection.splice(selection.indexOf(id), 1);
  }
  else {
    if(selection.length < 3) {
      selectCard(this);
      selection.push(id);
    }
    if(selection.length == 3) {
      let test = isSet(selection, board);
      if(test) {
        alert("This is a set!");
        score++;
        document.getElementById('score').innerHTML= score;
        replaceThree(board, deck, selection);

      }
      else {
        alert("This is not a set!");
      }
      selection = [];
    }
  }
  /* for debugging */
  // console.log(selection);
});
