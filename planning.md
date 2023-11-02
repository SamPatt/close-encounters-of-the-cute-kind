# Close Encounters of the Cute Kind

![wireframe](./imgs/closeEncounterswireframe.png)

## Description

This is a maze navigation game. The player controls a space explorer who is searching for and documenting the cutest alien lifeforms in the entire galaxy. Using WASD keyboard controls, the user will move their character through the maze, avoiding the dreaded JoyVoids (who despise cuteness), in order to find the adorable space creatures. If they find them all, they win. If they hit JoyVoids or other obstacles, they lose a life, and eventually the game is over.

## Requirements

1. Maze
2. Player token
3. Enemy tokens / dangerous obstacles
4. Cute Creature tokens
5. Ability to navigate player token through maze and to creatures
6. Win condition
7. Lose life condition and game over condition

## Stretch goals

1. Maze is procedurally generated, allowing unlimited levels
2. Enemies move / fire
3. Player can fire / have special moves
4. "Fog of war" limiting vision to near player
5. Screens with art images displaying intro, win condition, and game over
6. Adding sound
7. Add animations
8. Player select (boy or girl)

## User stories

### Exploration and Navigation

- As a player, I want to move my character through the maze because that's how I explore the level and win.
- As a player, I want to use the WASD/Arrow keys to control my character because it provides a familiar and intuitive control scheme.

### Interaction with Entities

- As a player, I want to locate and document cute alien lifeforms because finding them all is my primary objective.
- As a player, I want to avoid JoyVoids and other obstacles because they can cause me to lose lives and eventually the game.

### Game Progression and Feedback

- As a player, I want to know how many lives I have left because it tells me how close I might be to losing.
- As a player, I want visual and auditory feedback when I find a cute creature because it reinforces my progress and achievement.
- As a player, I want to be notified when I win or lose because it concludes the gameplay and provides closure.

## Pseudocode

```




maze = array of arrays 
    - values: space (path), walls, player, enemy, unknown (when revealed, either creature or obstacle(wormhole?))
    - manually initialize to ensure usability

for each row in maze:
    for each cell in row:
        if cell value is space:
            assign CSS class for space
        if cell value is wall:
            assign CSS class for wall
        if cell value is player:
            assign CSS class for player
        if cell value is enemy:
            assign CSS class for enemy
        if cell value is unknown:
            two creatures per maze, two obstacles
                assign CSS class for creature or obstacle when revealed

display maze using CSS grid/flexbox/HTML Table (TBD)


playerPosition = starting position in maze

attach event listeners for WASD/Arrow keys:
    on keypress:
        determine direction of movement
        get cell value in desired direction:
            if cell is path:
                swap player and path values (move player)
            if cell is wall:
                do nothing (block movement)
            if cell is enemy:
                decrease player lives by 1
                if lives are 0:
                    trigger game over
                else:
                    reset player position to start
            if cell is creature:
                check if all creatures found:
                    if all are found:
                        trigger win condition
                    else:
                        display positive UI indicator
                        (stretch) display modal with creature, post image on edge of screen, play camera sound, mark creature as found


display player lives in top corner

for each life lost:
    hide one life from display

(stretch) add click listeners to intro/win/game over screens to dismiss them

/**TODO
 * Add encounter photos and modal - DONE
 * Add creature photos and modal - DONE
 * add in game over modal - DONE
 * create a reset - DONE
 * species photos styling improvements
 * add new level
 * add all encounter images - DONE
 * add sounds - DONE
 * rotate ship on movement - DONE, hard!
 * animation between cells
 * enemy movement - DONE, hard!
 * update walls so they look more uniform and less repetitive
 * fog of war
 * make encounters and creatures unknown initially - DONE
 * refactor to use two separate modals to fix event listener hell - DONE
 * fix deletion of encounters - DONE
 * improve borders - DONE
 * fix photo reset on new game
 * mobile  make one column layout, make button to trigger slideout nav as overlay or modal, crop for icon, full species name
 *  */ 
 ```