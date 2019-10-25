/*jshint esversion: 6 */

var deck = generateCards();
var board =[];
var selection = [];
var score = 0;
fillBoard(board, deck);

/* for debugging */
// console.log(deck);
 console.log(board);
console.log(selection);


$("#start-btn").click(function() {
  gameStart(deck, board, selection);
  /* for debugging */
  // console.log(deck);
  // console.log(board);
  // console.log(selection);
});

$("#hint").click(function() {
  hint(board);
  /* for debugging */
  // console.log(deck);
  // console.log(board);
  // console.log(selection);
});



$(".btn").click(function() {
  //get the card attributes
  let selectedCard = $(this).find("img").attr("src");
  let pattern = selectedCard.substring(7, selectedCard.length - 4).split("_");
  let card = {number: pattern[0], shape: pattern[1], fill: pattern[2], color: pattern[3]};

  if($(this).hasClass("pressed")) {
    unselectCard(this);
    selection.splice(selection.indexOf(card));
    //console.log(selection);
  }
  else {
    if(selection.length < 3) {
      selectCard(this);
      selection.push(card);
      //console.log(selection);
    }
    if(selection.length == 3) {
      let test = isSet(selection);
      if(test) {
        alert("This is a set!");
        score++;
        document.getElementById('score').innerHTML= score;
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
