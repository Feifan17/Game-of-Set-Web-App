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
    let card1 = 'images/' + hint_arr[0].number + '_' + hint_arr[0].shape + '_' + hint_arr[0].fill + '_' + hint_arr[0].color + '.png';
    let card2 = 'images/' + hint_arr[1].number + '_' + hint_arr[1].shape + '_' + hint_arr[1].fill + '_' + hint_arr[1].color + '.png';
    let card3 = 'images/' + hint_arr[2].number + '_' + hint_arr[2].shape + '_' + hint_arr[2].fill + '_' + hint_arr[2].color + '.png';

    $("img[src='" + card1 + "']").parent().toggleClass("hint");
    $("img[src='" + card2 + "']").parent().toggleClass("hint");
    $("img[src='" + card3 + "']").parent().toggleClass("hint");
    setTimeout(function(){
      $("img[src='" + card1 + "']").removeClass("hint");
    },500);
    setTimeout(function(){
      $("img[src='" + card2 + "']").removeClass("hint");
    },500);
    setTimeout(function(){
      $("img[src='" + card3 + "']").removeClass("hint");
    },500);
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
