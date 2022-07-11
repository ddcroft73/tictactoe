# Tic Tac Toe(2 player, with AI)
The two player is pretty much done. 

### App Structure:
The app is built using several objects and design patters:
- Player object: factory function pattern.
- gameboard object: Module pattern (revealing)
- game (or "match") object : factory function.
<br>
Again I have tried to seperate my logic into several modules:
- AI.js obvious
- DOM.js:  where I try to handle all the interface interaction.
-logic.js: this is where all objects are except except AI.
- utils.js: anything that is just used to facilitate the other objects that doesn't really have any definite object relations.


### A few small bugs. 
- Sometimes on the first round a winner is not detected. 
- Need to finish developing the "win" screen
  - the winning pieces will flash 3 times.
- Need to make a spinning modal that screams "Tie" when a tie.

### AI
I have started developing the AI. I am going to try not to use a premade algorythm. I think I can make up my own, or I'm going to try. So far the structure seems to fit in as expected and I seem to have a good start.
