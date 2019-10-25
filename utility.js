/*jshint esversion: 6 */

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
    for(var i = 1; i <= 12; i++) {
      let card = deck.shift();
      let number = card.number;
      let shape = card.shape;
      let fill = card.fill;
      let color = card.color;
      $('#btn' + i).prepend('<img class = "card" src="images/' + number + '_' + shape + '_' + fill + '_' + color + '.png"/>');
      board.push(card);
    }
}

function resetBoard(board, deck, score) {
  score = 0;
  document.getElementById('score').innerHTML= score;
  for(var i = 1; i <= 12; i++) {
    let card = deck.shift();
    let number = card.number;
    let shape = card.shape;
    let fill = card.fill;
    let color = card.color;
    $('#btn' + i).find("img").attr("src", 'images/' + number + '_' + shape + '_' + fill + '_' + color + '.png');
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
function isSet(selection) {
  //console.log(check);
  //console.log(selection);
  if (!compare_value(selection[0].number,selection[1].number,selection[2].number)){
    return false;
  }
  else if (!compare_value(selection[0].color,selection[1].color,selection[2].color)){
    return false;
  }
  else if (!compare_value(selection[0].fill,selection[1].fill,selection[2].fill)){
    return false;
  }
  else if (!compare_value(selection[0].shape,selection[1].shape,selection[2].shape)){
    return false;
  }
  //console.log(selection);
  //console.log(check);
  return true;
}


//hint for player
function hint(board) {
  var hint_arr = [];
  for(var i = 0; i < board.length - 2; i++) {
    for(var j = i + 1; j < board.length - 1; j++) {
      for(var k = j + 1; k < board.length; k++) {
          hint_arr.push(board[i],board[j],board[k]);
          if(isSet(hint_arr)) {
            //$("#"+i).effect( "shake", {times:4}, 1000 );
            return hint_arr;
          }
          hint_arr = [];
      }
    }
  }
  return hint_arr;
}
