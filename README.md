# The Game of Set Web App

## Overview

Set is a real-time card game designed by Marsha Falco in 1974 and published by Set Enterprises in 1991. The deck consists of 81 unique cards that vary in four features across three possibilities for each kind of feature: number of shapes (one, two, or three), shape (diamond, squiggle, oval), shading (solid, striped, or open), and color (red, green, or purple). Each possible combination of features (e.g. a card with [three] [striped] [green] [diamonds]) appears as a card precisely once in the deck. 

This project uses HTML, CSS and JavaScript to present this game through a web application format. You can access the game through the following link:

[https://feifan17.github.io/Game-of-Set-Web-App/](https://feifan17.github.io/Game-of-Set-Web-App/)

## Game Rules

The game starts from 12 cards. Each card has 4 attributes. Each attribute has 3 values:

    Number:     1           2           3
    Color:     red         green       purple
    Fill:       solid       stripe      empty
    Shape:      diamond     squiggle    pill

    There are totally 81 cards in the deck and each combination of features appears as a card precisely once.

    Rules:

    A player needs to identify a set of 3 cards satisfying all of these conditions:

    1. They all have the same number or have three different numbers.
    2. They all have the same shape or have three different shapes.
    3. They all have the same fill or have three different fills.
    3. They all have the same color or have three different colors.

    For example, the following cards form a set:

    1     green   stripe    diamond
    2     green   solid     diamond
    3     green   empty     diamond

    the following cards don't form a set:

    2     green   stripe    diamond
    2     green   solid     diamond
    3     green   empty     diamond

## Instructions for playing the game

* Click on a card to add it to your selection. After you select three cards, the game will tell you whether they are a set. Re-click the card to unselect.

* After you successfully identify a set, the three cards in your selection will be removed, and the game will automatically add three new cards shuffled from the deck. Your score and number of cards remaining will be updated, and are kept on the right.

* The game ends when there is no card left in the deck, and no existing set on board. When you identify such situation, click "HINT" button to end the game.

* Clicking on the "RESTAET" button will discard the game progress so far and restart the game. The timer will also be reset.

* Clicking on the "HINT" button will give a clue of possible set of cards. If there is no existing set on board, all cards will be put back to the deck and shuffle.

* Clicking on the "HELP" button to check the rules of the game.

## Developers:
* Bowen Li
* Feifan Lin
* Dana Shkokani
* Mengying Xie

## References
Sound effects obtained from https://www.zapsplat.com:

right.mp3: Game sound, climbing mallet, ascend 5

wrong.mp3: Classic game sound, one up, rising, positive. Version 3

pressed.mp3: Game tone, sci-fi, button, select or menu sound 1

cancel.mp3: Game, menu item select 3

restart.mp3: Warm, soft digital game tone with a positive feel, could be used for selection noise 50

hint.mp3: Warm, soft digital game tone with a positive feel, could be used for selection noise 46

help.mp3: Game sound, collect single coin 10

Images reference:
[X.png](https://en.wikipedia.org/wiki/File:Yellow_x.svg)

[card images](https://geekandsundry.com/the-card-game-that-puzzled-mathematicians-for-decades/)
