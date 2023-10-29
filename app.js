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
    fuelCells: 3,
    creaturesFound: 0,
    mazePosition: [1, 0],
    level: 1
}

const GRID_CLASSES = ['path', 'wall', 'player', 'enemy', 'obstacle', 'creature']

const SPECIES_NAMES = ['Fluxorgon', 'Blipblorp', 'Cuddlexian', 'Quizzlit', 'Pluffigon', 'Wobblex', 'Zibzorb', 'Nuzzletron', 'Grizzlebee', 'Fluffinate', 'Glimblatt', 'Squizzelar', 'Mubbleflop', 'Zoopzop', 'Jibberjell', 'Wigglimon', 'Cluzzleclank', 'Blibberfudge', 'Fuzzlequark', 'Zumblezot', 'Plopplip', 'Quibquab', 'Buzzleboon', 'Dribbledorf', 'Flibblestix'];

const SPECIES_IMAGES = ['./imgs/species_1.png', './imgs/species_2.png', './imgs/species_3.png', './imgs/species_5.png', './imgs/species_4.png', './imgs/species_6.png']

const STORYLINE = `
    It's the year 2241, and humanity is... bored. <br><br>

    You're just launching your career as an space wildlife photographer, and you have a plan: find the 
    cutest creatures in the galaxy and share them with the world! <br><br>

    But beware: there aren't any laws in deep space, and many "Starstreamers" are notorious for 
    stealing precious fuel cells. <b>Avoid other ships at all costs</b>.
`;

const speciesInstances = {};

/*----- state variables -----*/
let maze = MAP_LEVEL_ONE // Sets the maze as a copy of the MAP_LEVEL_ONE array
let shipDirection = '0deg'

const player = {
    ...PLAYER_START,
    mazePosition: [...PLAYER_START.mazePosition]
}; // Sets the player object as a copy of the PLAYER_START object

let speciesNames = [...SPECIES_NAMES] // Copies species names so that I can remove them from the array when found so they don't duplicate
let speciesImages = [...SPECIES_IMAGES ]
class Species {
    constructor(speciesName, image, levelDiscovered){
        this.speciesName = speciesName
        this.image = image
        this.levelDiscovered = levelDiscovered
    }
}

/*----- cached elements  -----*/
const mazeEl = document.querySelector('#maze')
const speciesPhotoTopEl = document.querySelector('#photo-top')
const speciesPhotoBottomEl = document.querySelector('#photo-bottom')
const speciesDescriptionTopEl = document.querySelector('#photo-top-description')
const speciesDescriptionBottomEl = document.querySelector('#photo-bottom-description')

/*----- event listeners -----*/
document.addEventListener("keydown", keyBehavior);

function keyBehavior(e) {
    e.preventDefault(); // The browser scrolling on keypress is annoying so this prevents it
  if (e.key === "ArrowUp") {
    shipDirection = '270deg'
    movePlayer('up')
  } else if (e.key === "ArrowDown") {
    shipDirection = '90deg'
    movePlayer('down')
  } else if (e.key === "ArrowRight") {
    shipDirection = '0deg'
    movePlayer('right')
  } else if (e.key === "ArrowLeft") {
    shipDirection = '180deg'
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

function updateMazeAndPlayerPosition(desiredCell){
    let cellMovedFrom = player.mazePosition
    maze[cellMovedFrom[0]][cellMovedFrom[1]] = 0
    player.mazePosition = desiredCell
    maze[player.mazePosition[0]][player.mazePosition[1]] = 2
    render()
}

function moveOnPath(desiredCell){
    updateMazeAndPlayerPosition(desiredCell)

}

function moveIntoEnemy(){
    let cellMovedFrom = player.mazePosition
    maze[cellMovedFrom[0]][cellMovedFrom[1]] = 0
    enemyCollision()
}

function moveIntoObstacle(desiredCell){
    updateMazeAndPlayerPosition(desiredCell)
    obstacleCollision()
}

function moveIntoCreature(desiredCell){
    updateMazeAndPlayerPosition(desiredCell)
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
    player.fuelCells -= 1
    console.log(player.fuelCells)
    if(player.fuelCells < 0){
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
        // if no fuelCells, triggerGameOver('obstacle')
        render()
}

function creatureCollision(){
    player.creaturesFound += 1
    renderCreatureModal()
    render()
}


function triggerGameOver(){
    showModal('GAME OVER', './imgs/fuel3.png', `You ran out of fuel!`, 'gameOver');
}

function triggerNextLevel(){

}




function makeMazeDiv(classValue, isPlayer, direction) {
    const divEl = document.createElement('div');
    divEl.classList.add(GRID_CLASSES[classValue]);
    if (isPlayer) {
        divEl.style.transform = `rotate(${direction})`;
    }
    mazeEl.appendChild(divEl);
}


function randomNumber(max){
    return Math.floor(Math.random() * max);
}

function renderCreatureModal(){
    let randomNumSpeciesName = randomNumber(speciesNames.length)
    let randomNumSpeciesImage = randomNumber(speciesImages.length)
    let randomSpecies = speciesNames[randomNumSpeciesName]
    let randomImage = speciesImages[randomNumSpeciesImage]
    speciesInstances[randomSpecies] = new Species(randomSpecies, randomImage, player.level);

    console.log(speciesInstances)
    const congratsText = [`So cute!`, `OMG adorable!`, `Heart-meltingly sweet!`, `Too cute to handle!`, `Aww, precious!`, `What a cutie pie!`, `Absolutely charming!`, `Irresistibly cute!`, `Look at those eyes!`, `Overloaded with cuteness!`, `Squee-worthy!`, `That's just darling!`, `Cuteness level: 1000!`, `So fluffy and cute!`, `Melted my heart!`, `Could it get any cuter?`, `That's some next-level cuteness!`, `A bundle of joy!`, `Pure adorableness!`, `Such a sweetie!`, `Cuteness overload!`, `I'm in love!`, `Too sweet to be real!`, `A true cutie!`, `Gushing over this cuteness!`];
    let randomCongratsText = congratsText[randomNumber(congratsText.length)]

    speciesNames.splice(randomNumSpeciesName, 1)  // Removes the used species name so that it can't be duplicated later
    speciesImages.splice(randomNumSpeciesImage, 1)
    renderPhoto(randomSpecies)
    showModal("You found a new species!", randomImage, `${randomCongratsText} You decide to name them: <h2>${randomSpecies}</h2>Well done! New species found: ${player.creaturesFound}`, 'creature');

}

function renderEnemyModal(){
    const enemyImages = ['./imgs/enemy_1.png', './imgs/enemy_2.png', './imgs/enemy_3.png']
    const enemyText = [`"You're brave coming out here in that, kid. Stupid though."`, `"Space isn't big enough for the both of us."`, `"You're just wasting fuel out here, loser."`, `"Oh good, fresh content."`, `"I know it's wrong but ... meh, I don't really care."` ]
    let randomImage = enemyImages[randomNumber(enemyImages.length)]
    let randomText = enemyText[randomNumber(enemyText.length)]
    showModal('Another ship attacked you!', randomImage, `${randomText} <br><br>-1 Fuel cells. Fuel Cells remaining: ${player.fuelCells}`, 'enemy');
    
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
    // TODO: add in a fuel cell check and the gameover call here  so that it won't interrupt other modals
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
            if(value !== 2){
            makeMazeDiv(value)
            } else {
                makeMazeDiv(value, true, shipDirection);

            }
        }
        
    }
}

function renderPhoto(name){
    if(speciesPhotoTopEl.classList.contains('blank')){
        speciesPhotoTopEl.src = speciesInstances[name].image
        speciesPhotoTopEl.classList.remove('blank')
        speciesDescriptionTopEl.innerHTML = `Species: <b>${name}</b>`
    } else {
        speciesPhotoBottomEl.classList.contains('blank')
            speciesPhotoBottomEl.src = speciesInstances[name].image
            speciesPhotoBottomEl.classList.remove('blank')
            speciesDescriptionBottomEl.innerHTML = `Species: <b>${name}</b>`
    }
}

function render(){
    renderMaze()
 

}

function init(){
    showModal("Close Encounters of the Cute Kind", "./imgs/hero2.png", STORYLINE, 'intro');
}

render()
init()



/**TODO
 * Add obstacle photos and modal
 * Add creature photos and modal - DONE
 * add obstacle mini-game
 * add in game over modal
 * create a reset
 * add sounds
 * rotate ship on movement - DONE, hard!
 * animation between cells
 * enemy movement
 * update walls so they look more uniform and less repetitive
 * fog of war
 * make obstacles and creatures unknown initially
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