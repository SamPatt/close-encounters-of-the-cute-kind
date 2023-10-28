console.log('We are here!')

/*----- constants -----*/
const MAP_LEVEL_ONE = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 5, 0, 0, 4, 0, 0, 0, 0, 1, 5, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const PLAYER_START = {
    lives: 3,
    creaturesFound: 0,
    mazePosition: [1, 0]
}

const gridClasses = ['path', 'wall', 'player', 'enemy', 'obstacle', 'creature']

/*----- state variables -----*/
let maze = MAP_LEVEL_ONE // Sets the maze as a copy of the MAP_LEVEL_ONE array
const player = PLAYER_START // Sets the player object as a copy of the PLAYER_START object





/*----- cached elements  -----*/
const mazeEl = document.querySelector('#maze')

/*----- event listeners -----*/
document.addEventListener("keydown", keyBehavior);

function keyBehavior(e) {
  if (e.key === "ArrowUp") {
    movePlayer('up')
  } else if (e.key === "ArrowDown") {
    movePlayer('down')
  } else if (e.key === "ArrowRight") {
    movePlayer('right')
  } else if (e.key === "ArrowLeft") {
    movePlayer('left')
  }
}

/*----- functions -----*/

// This function checks if the user is trying to make a valid move
function checkMazeMovement(movementDirection){
    
    let desiredCell;
    if(movementDirection === 'up'){
        desiredCell = maze[player.mazePosition[0] - 1][player.mazePosition[1]];
        console.log(desiredCell)
        if (desiredCell === 1){
            console.log('Wall; no movement')
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}

function movePlayer(direction){
    if(!checkMazeMovement(direction)){ // TODO - tie into keypress event handler
        return
    } else {
        console.log('Valid move')

    }
}

function makeMazeDiv(classValue){
    const divEl = document.createElement('div')
    // ICEBOX - Allow for more wall styling which doesn't update with each render
    // if(classValue === 1){
    //     const randomChoice = Math.random() < 0.5 ? 'wall-asteroid' : 'wall-stars';
    //     divEl.classList.add(randomChoice)
    // }
    divEl.classList.add(gridClasses[classValue])
    mazeEl.appendChild(divEl)
}

function renderMaze(){
    mazeEl.innerHTML = ''
    for(row of maze){
        for(value of row){
            makeMazeDiv(value)
        }
        
    }
}

function renderPhoto(){

}

function render(){

}

function init(){

}

renderMaze()