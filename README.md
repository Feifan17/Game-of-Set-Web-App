# Project 5
## The Game of Set, Reloaded


***

## Overview
In this project, the Code Fellas team redesigned the [Game of Set](https://github.com/cse3901-2019au-1020/proj2-code) using Javascript. The project runs on a single webpage.

## Additional Features
* Graphical User Interface
* Hint Generator
* Sound Effect
* Timer

## Game Rules
The game starts from 12 cards. Each card has 4 attributes. Each attribute has 3 values:

    Number:     1           2           3
    Colour:     red         green       purple
    Fill:       solid       stripe      empty
    Shape:      diamond     squiggle    pill
    
    There are totally 81 cards in the deck and each combination of features appears as a card precisely once.
    
    Rules:

    A player needs to identify a set of 3 cards satisfying all of these conditions:

    1. They all have the same number or have three different numbers.
    2. They all have the same shape or have three different shapes.
    3. They all have the same fill or have three different fills.
    3. They all have the same colour or have three different colours.

    For example, the following cards form a set:

    1     green   stripe    diamond
    2     green   solid     diamond
    3     green   empty     diamond
    
    the following cards don't form a set:
    
    2     green   stripe    diamond
    2     green   solid     diamond
    3     green   empty     diamond

## Instructions

### To Run the Game:
1. Clone the git repository into local machine.

2. Open file 'index.html' with any web browser.

### To Play the Game:
* Click on a card to add it to your selection. After you select three cards, the game will tell you whether they are a set. Re-click the card to unselect.

* After you successfully identify a set, the three cards in your selection will be removed, and the game will automatically add three new cards shuffled from the deck. Your score and number of cards remaining will be updated, and are kept on the right.

* The game ends when there is no card left in the deck, and no existing set on board. When you identify such situation, click "HINT" button to end the game.

* Clicking on the "RESTAET" button will discard the game progress so far and restart the game. The timer will also be reset.

* Clicking on the "HINT" button will give a clue of possible set of cards. If there is no existing set on board, all cards will be put back to the deck and shuffle.

* Clicking on the "HELP" button to check the rules of the game.

***

## Developers:
* Bowen Li
* Feifan Lin
* Dana Shkokani
* Mengying Xie

## References
Sound effects obtained from https://www.zapsplat.com:

Right: Game sound, climbing mallet, ascend 5

Wrong: Classic game sound, one up, rising, positive. Version 3

Pressed: Game tone, sci-fi, button, select or menu sound 1

Cancel: Game, menu item select 3

Restart: Warm, soft digital game tone with a positive feel, could be used for selection noise 50

Hint: Warm, soft digital game tone with a positive feel, could be used for selection noise 46

Help: Game sound, collect single coin 10

Images reference:
[yellow X](https://en.wikipedia.org/wiki/File:Yellow_x.svg)

[card images](https://geekandsundry.com/the-card-game-that-puzzled-mathematicians-for-decades/)
