/*jshint esversion: 6 */
var seconds = 0, minutes = 0, hours = 0;
var t;
var stopwatch = document.getElementById('stopwatch');

function selectCard(card) {
  $(card).addClass("pressed");
}

function unselectCard(card) {
  $(card).removeClass("pressed");
}

/*start the game*/
function gameStart(deck, board, selection, score) {
  deck = generateCards();
  board = [];
  selection = [];
  score = 0;
  resetBoard(board, deck);
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

function resetBoard(board, deck, score) {
  score = 0;
  document.getElementById('score').innerHTML= score;
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

function compare_value(card1_attr, card2_attr, card3_attr){
  var check = false;
  if ((card1_attr === card2_attr && card2_attr === card3_attr) || (card1_attr !== card2_attr && card2_attr !== card3_attr && card1_attr !== card3_attr)){
    check = true;
  }
  return check;
}

/*validate if the three cards form a set*/
function isSet(selection, board) {
  //console.log(check);
  //console.log(selection);
  let card1 = board[parseInt(selection[0], 10)];
  let card2 = board[parseInt(selection[1], 10)];
  let card3 = board[parseInt(selection[2], 10)];


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
  //console.log(selection);
  //console.log(check);
  return true;
}

function replaceThree(board, deck, selection) {

  let card1 = deck.shift();
  let card2 = deck.shift();
  let card3 = deck.shift();

  let i1 = parseInt(selection[0], 10);
  let i2 = parseInt(selection[1], 10);
  let i3 = parseInt(selection[2], 10);

  let old1 = 'images/' + board[i1].number + '_' + board[i1].shape + '_' + board[i1].fill + '_' + board[i1].color + '.png';
  let old2 = 'images/' + board[i2].number + '_' + board[i2].shape + '_' + board[i2].fill + '_' + board[i2].color + '.png';
  let old3 = 'images/' + board[i3].number + '_' + board[i3].shape + '_' + board[i3].fill + '_' + board[i3].color + '.png';

  board[i1] = card1;
  board[i2] = card2;
  board[i3] = card3;

  let new1 = 'images/' + card1.number + '_' + card1.shape + '_' + card1.fill + '_' + card1.color + '.png';
  let new2 = 'images/' + card2.number + '_' + card2.shape + '_' + card2.fill + '_' + card2.color + '.png';
  let new3 = 'images/' + card3.number + '_' + card3.shape + '_' + card3.fill + '_' + card3.color + '.png';

  $("img[src='" + old1 + "']").parent().removeClass("pressed");
  $("img[src='" + old2 + "']").parent().removeClass("pressed");
  $("img[src='" + old3 + "']").parent().removeClass("pressed");

  $("img[src='" + old1 + "']").attr("src", new1);
  $("img[src='" + old2 + "']").attr("src", new2);
  $("img[src='" + old3 + "']").attr("src", new3);


}

//hint for player
function hint(board) {
  var hint_arr = [];
  for(var i = 0; i < board.length - 2; i++) {
    for(var j = i + 1; j < board.length - 1; j++) {
      for(var k = j + 1; k < board.length; k++) {
          hint_arr.push(i.toString(), j.toString(), k.toString());
          if(isSet(hint_arr, board)) {
            //$("#"+i).effect( "shake", {times:4}, 1000 );
            return hint_arr;
          }
          hint_arr = [];
      }
    }
  }
  return hint_arr;
}
