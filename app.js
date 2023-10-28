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
    [1, 0, 0, 3, 1, 0, 0, 0, , 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const PLAYER_START = {
    lives: 3,
    creaturesFound: 0
}

const gridClasses = ['path', 'wall', 'player', 'enemy', 'obstacle', 'creature']

/*----- state variables -----*/
let maze = MAP_LEVEL_ONE // Sets the maze as a copy of the MAP_LEVEL_ONE array
const player = PLAYER_START // Sets the player object as a copy of the PLAYER_START object





/*----- cached elements  -----*/
const mazeEl = document.querySelector('#maze')

/*----- event listeners -----*/


/*----- functions -----*/

function movePlayer(){

}

function makeMazeDiv(classValue){
    const divEl = document.createElement('div')
    divEl.classList.add(gridClasses[classValue])
    divEl.innerText = 'YAY'
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