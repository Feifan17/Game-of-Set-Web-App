/*jshint esversion: 6 */

var deck = generateCards();
var board =[];
var selection = [];
fillBoard(board, deck);

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
      //call isSet();
    }
  }
  console.log(selection);
});

// console.log(deck);
// console.log(board);
