/*jshint esversion: 6 */

function selectCard(card) {
  $(card).addClass("pressed");
}

function unselectCard(card) {
  $(card).removeClass("pressed");
}

/*start the game*/
function gameStart() {
  fillBoard(deck);
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

/*validate if the three cards form a set*/
function isSet(selection) {

}
