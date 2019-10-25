/*jshint esversion: 6 */

var deck = generateCards();
var board =[];
var selection = [];
fillBoard(board, deck);

/* for debugging */
// console.log(deck);
// console.log(board);
// console.log(selection);

$("#start-btn").click(function() {
  gameStart(deck, board, selection);
  /* for debugging */
  // console.log(deck);
  // console.log(board);
  // console.log(selection);
});

$(".btn").click(function() {
  //get the card attributes
  let selectedCard = $(this).find("img").attr("src");
  let pattern = selectedCard.substring(7, selectedCard.length - 4).split("_");

  if($(this).hasClass("pressed")) {
    unselectCard(this);
    selection.splice(selection.indexOf(pattern));
  }
  else {
    if(selection.length < 3) {
      selectCard(this);
      selection.push(pattern);
    }
    else {
      let test = isSet(selection);
      if(test) {
        console.alert("This is a set!");
      }
      else {
        console.alert("This is not a set!");
      }
      selection = [];
    }
  }
  /* for debugging */
  // console.log(selection);
});
