/*jshint esversion: 6 */
var seconds = 0, minutes = 0, hours = 0;
var t;
var stopwatch = document.getElementById('stopwatch');

/*select a card*/
function selectCard(card) {
  $(card).addClass("pressed");
  playSound("pressed");

}

/*unselect a card*/
function unselectCard(card) {
  $(card).removeClass("pressed");
  playSound("cancel");
}


function startStopwatch(){
  function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    stopwatch.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
  }
  function timer() {
    t = setTimeout(add, 1000);
}
timer();
}

function pauseStopwatch(){
  clearTimeout(t);
}

function clearStopwatch(){
  stopwatch.textContent = "00:00:00";
  seconds = 0; minutes = 0; hours = 0;
  pauseStopwatch();
}

/*create a deck*/
function generateCards() {
  var cards = [];

  let numbers = ['1', '2', '3'];
  let colors = ['red', 'purple', 'green'];
  let fills = ['solid', 'striped', 'open'];
  let shapes = ['diamond', 'oval', 'squiggle'];

  numbers.forEach(function(number) {
    colors.forEach(function(color) {
      fills.forEach(function(fill) {
        shapes.forEach(function(shape) {
          cards.push({number: number, shape: shape, fill: fill, color: color});
        });
      });
    });
  });
  return  _.shuffle(cards);
}

/*find a card*/
function findCard(card) {

    let card_img = 'images/' + card.number + '_' + card.shape + '_' + card.fill + '_' + card.color + '.png';
    return card_img;

}

/*fill the board with 12 cards*/
function fillBoard(board, deck) {
    for(var i = 0; i < 12; i++) {
      let card = deck.shift();
      let number = card.number;
      let shape = card.shape;
      let fill = card.fill;
      let color = card.color;
      $('#' + i).prepend('<img class = "card" src="images/' + number + '_' + shape + '_' + fill + '_' + color + '.png"/>');
      board.push(card);
    }
}

/*reset the board with 12 cards*/
function resetBoard(board, deck) {

  for(var i = 0; i < 12; i++) {
    let card = deck.shift();
    let number = card.number;
    let shape = card.shape;
    let fill = card.fill;
    let color = card.color;
    $('#' + i).find("img").attr("src", 'images/' + number + '_' + shape + '_' + fill + '_' + color + '.png');
    board.push(card);
  }

}

/*compare attributes of cards*/
function compare_value(card1_attr, card2_attr, card3_attr){
  var check = false;
  if ((card1_attr === card2_attr && card2_attr === card3_attr) || (card1_attr !== card2_attr && card2_attr !== card3_attr && card1_attr !== card3_attr)){
    check = true;
  }
  return check;
}

/*validate if the three cards form a set*/
function isSet(selection, board) {

  let card1 = board[parseInt(selection[0], 10)];
  let card2 = board[parseInt(selection[1], 10)];
  let card3 = board[parseInt(selection[2], 10)];

  if(card1 == null || card2 == null || card3 == null) {
    return false;
  }

  if (!compare_value(card1.number,card2.number,card3.number)){
    return false;
  }
  else if (!compare_value(card1.color,card2.color,card3.color)){
    return false;
  }
  else if (!compare_value(card1.fill,card2.fill,card3.fill)){
    return false;
  }
  else if (!compare_value(card1.shape,card2.shape,card3.shape)){
    return false;
  }

  return true;
}

/*replace three cards on the board*/
function replaceThree(board, deck, selection) {

  let i1 = parseInt(selection[0], 10);
  let i2 = parseInt(selection[1], 10);
  let i3 = parseInt(selection[2], 10);

  let old1 = findCard(board[i1]);
  let old2 = findCard(board[i2]);
  let old3 = findCard(board[i3]);

  $("img[src='" + old1 + "']").parent().removeClass("pressed");
  $("img[src='" + old2 + "']").parent().removeClass("pressed");
  $("img[src='" + old3 + "']").parent().removeClass("pressed");

  if(deck.length > 0) {

    let card1 = deck.shift();
    let card2 = deck.shift();
    let card3 = deck.shift();

    board[i1] = card1;
    board[i2] = card2;
    board[i3] = card3;

    let new1 = findCard(card1);
    let new2 = findCard(card2);
    let new3 = findCard(card3);

    $("img[src='" + old1 + "']").attr("src", new1);
    $("img[src='" + old2 + "']").attr("src", new2);
    $("img[src='" + old3 + "']").attr("src", new3);
  }
  else {
    board[i1] = null;
    board[i2] = null;
    board[i3] = null;

    $("img[src='" + old1 + "']").attr("src", "images/X.png");
    $("img[src='" + old2 + "']").attr("src", "images/X.png");
    $("img[src='" + old3 + "']").attr("src", "images/X.png");
  }

}

/*generate a hint for the player*/
function hint(board) {
  var hint_arr = [];
  for(var i = 0; i < board.length - 2; i++) {
    for(var j = i + 1; j < board.length - 1; j++) {
      for(var k = j + 1; k < board.length; k++) {
          hint_arr.push(i.toString(), j.toString(), k.toString());
          if(isSet(hint_arr, board)) {
            return hint_arr;
          }
          hint_arr = [];
      }
    }
  }
  return hint_arr;
}

/*play sound when buttons get clicked*/
function playSound(sound) {
  switch (sound) {
    case "right":
      var right = new Audio("sounds/right.mp3");
      right.play();
      break;

    case "wrong":
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      break;

    case "pressed":
      var pressed = new Audio("sounds/pressed.mp3");
      pressed.play();
      break;

    case "cancel":
      var cancel = new Audio("sounds/cancel.mp3");
      cancel.play();
      break;

    case "restart":
      var restart = new Audio("sounds/restart.mp3");
      restart.play();
      break;

    case "hint":
      var hint = new Audio("sounds/hint.mp3");
      hint.play();
      break;

    case "help":
      var help = new Audio("sounds/help.mp3");
      help.play();
      break;

    default:

  }
}
