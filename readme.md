# Tic Tac Toe(2 player, with AI)
The two player is pretty much done. 

### App Structure:
The app is built using several objects and design patters:
- Player object: factory function pattern.
- gameboard object: Module pattern (revealing)
- game (or "match") object : factory function.
- score object. Reavealing module pattern
<br>
Again I have tried to seperate my logic into several modules:
- AI.js obvious
- DOM.js:  where I try to handle all the interface interaction.
-logic.js: this is where all objects are except except AI.
- utils.js: anything that is just used to facilitate the other objects that doesn't really have any definite object relations.



### AI
I am hanging back on the AI. Yeh maybe Im wussing out but there is a much more desirable project I need to start.