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
    mazePosition: [1, 0],
    level: 1
}

const gridClasses = ['path', 'wall', 'player', 'enemy', 'obstacle', 'creature']

const STORYLINE = `
    It's the year 2241, and humanity is... bored. <br><br>

    You're just launching your career as an space wildlife photographer, and you have a plan: find the 
    cutest creatures in the galaxy and share them with the world! <br><br>

    But beware: there aren't any laws in deep space, and many "Starstreamers" are notorious for 
    their cutthroat tactics. <b>Avoid other ships at all costs</b>.
`;


/*----- state variables -----*/
let maze = MAP_LEVEL_ONE // Sets the maze as a copy of the MAP_LEVEL_ONE array
const player = {
    ...PLAYER_START,
    mazePosition: [...PLAYER_START.mazePosition]
}; // Sets the player object as a copy of the PLAYER_START object





/*----- cached elements  -----*/
const mazeEl = document.querySelector('#maze')

/*----- event listeners -----*/
document.addEventListener("keydown", keyBehavior);

function keyBehavior(e) {
    e.preventDefault(); // The browser scrolling on keypress is annoying so this prevents it
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

// TODO: Determine the flow for updating map / triggering actions after movement
    // event listener calls movePlayer, which calls checkMazeMovement to check for a valid move
        // where to add in player position update and check if collisions with non-wall cells?
        // already in checkMazeMovement, could extend


function movePlayer(direction){
    let desiredCell = getDesiredMoveCell(direction)
    console.log(desiredCell)
    let desiredCellValue = maze[desiredCell[0]][desiredCell[1]]
    if(desiredCellValue === 1){
        return
    } else if(desiredCellValue === 0){
        moveOnPath(desiredCell)
    } else if(desiredCellValue === 3){
        moveIntoEnemy(desiredCell)
    } else if(desiredCellValue === 4){
        moveIntoObstacle(desiredCell)
    } else if(desiredCellValue === 5){
        moveIntoCreature(desiredCell)
    }
    return
}

function moveOnPath(desiredCell){
    let cellMovedFrom = player.mazePosition
    maze[cellMovedFrom[0]][cellMovedFrom[1]] = 0
    player.mazePosition = desiredCell
    maze[player.mazePosition[0]][player.mazePosition[1]] = 2
    // let desiredCellValue = maze[desiredCell[0]][desiredCell[1]]
    render()

}

function moveIntoEnemy(){
    let cellMovedFrom = player.mazePosition
    maze[cellMovedFrom[0]][cellMovedFrom[1]] = 0
    enemyCollision()
}

function moveIntoObstacle(desiredCell){
    let cellMovedFrom = player.mazePosition
    maze[cellMovedFrom[0]][cellMovedFrom[1]] = 0
    player.mazePosition = desiredCell
    maze[player.mazePosition[0]][player.mazePosition[1]] = 2
    obstacleCollision()
}

function moveIntoCreature(desiredCell){
    let cellMovedFrom = player.mazePosition
    maze[cellMovedFrom[0]][cellMovedFrom[1]] = 0
    player.mazePosition = desiredCell
    maze[player.mazePosition[0]][player.mazePosition[1]] = 2
    creatureCollision()
}

function getDesiredMoveCell(directionOfMove) {
    let desiredPosition;
    if (directionOfMove === 'up') {
        desiredPosition = [player.mazePosition[0] - 1, player.mazePosition[1]];
    } else if (directionOfMove === 'down') {
        desiredPosition = [player.mazePosition[0] + 1, player.mazePosition[1]];
    } else if (directionOfMove === 'right') {
        desiredPosition = [player.mazePosition[0], player.mazePosition[1] + 1];
    } else if (directionOfMove === 'left') {
        desiredPosition = [player.mazePosition[0], player.mazePosition[1] - 1];
    }
    return desiredPosition;
}

function enemyCollision(){
    player.lives -= 1
    console.log(player.lives)
    if(player.lives < 0){
        triggerGameOver('enemy')
    } else {
        renderEnemyModal()
    }
    player.mazePosition = PLAYER_START.mazePosition
    maze[player.mazePosition[0]][player.mazePosition[1]] = 2
}



function obstacleCollision(){
    // minigame asteroid destruction
    // if player succeeds, clear obstacle and continue
    // if fail, lose life
        // if no lives, triggerGameOver('obstacle')
        render()
}

function creatureCollision(){
    player.creaturesFound += 1

    render()
}

function updatePlayerPosition(){

}

function triggerGameOver(){

}

function triggerNextLevel(){

}

function updateMaze(){
    
}



function makeMazeDiv(classValue){
    const divEl = document.createElement('div')
    divEl.classList.add(gridClasses[classValue])
    mazeEl.appendChild(divEl)
}

function randomNumber(max){
    return Math.floor(Math.random() * max);
}

function renderEnemyModal(){
    const enemyImages = ['./imgs/enemy_1.png', './imgs/enemy_2.png', './imgs/enemy_3.png']
    const enemyText = [`"You're brave coming out here in that, kid. Stupid though."`, `"Space isn't big enough for the both of us."`, `"My followers love a good explosion."`, `"Oh good, fresh content."`, `"What a pathetic sub count. I'll put you out of your misery."` ]
    let randomImage = enemyImages[randomNumber(enemyImages.length)]
    let randomText = enemyText[randomNumber(enemyText.length)]
    showModal('Another ship attacked you!', randomImage, `${randomText} <br><br> Lives remaining: ${player.lives}`, 'enemy');
    
}


function showModal(title, imgSrc, description, type) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-image').src = imgSrc;
    document.getElementById('modal-description').innerHTML = description;

    // Additional logic based on type
    if (type === 'enemy') {
        // enemy-specific logic
    } else if (type === 'intro') {
    }
    //... handle other types similarly

    document.getElementById('modal').classList.remove('hidden');

    // Add event listeners to close modal
    document.addEventListener('keydown', closeModal);
    document.getElementById('modal').addEventListener('click', handleModalClickOutside);
}


function closeModal() {
    document.getElementById('modal').classList.add('hidden');
    render();

    // Remove the event listeners
    document.removeEventListener('keydown', closeModal);
    document.getElementById('modal').removeEventListener('click', handleModalClickOutside);
}

function handleModalClickOutside(event) {
    if (event.target === document.getElementById('modal')) {
        closeModal();
    }
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
    renderMaze()
    renderPhoto()
}

function init(){
    showModal("Close Encounters of the Cute Kind", "./imgs/hero2.png", STORYLINE, 'intro');
}

render()
init()



/**TODO
 * Add obstacle photos and modal
 * Add creature photos and modal
 * add obstacle mini-game
 * add in game over modal
 * create a reset
 * add sounds
 * 
 *  */ 
    



/** OLD CODE
 * 
 * // This function checks if the user is trying to make a valid move
// function checkIfWall(movementDirection){
    
//     let desiredCell;
//     if(movementDirection === 'up'){
//         desiredCell = maze[player.mazePosition[0] - 1][player.mazePosition[1]];
//         console.log(desiredCell)
//         if (desiredCell === 1){
//             console.log('Wall; no movement')
//             return false
//         } else {
//             return true
//         }
//     } else {
//         return true
//     }
// }

    // ICEBOX - Allow for more wall styling which doesn't update with each render
    // if(classValue === 1){
    //     const randomChoice = Math.random() < 0.5 ? 'wall-asteroid' : 'wall-stars';
    //     divEl.classList.add(randomChoice)
    // }

 */