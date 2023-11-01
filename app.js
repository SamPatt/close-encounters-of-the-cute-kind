console.log('We are here!')

/*----- constants -----*/
const MAP_LEVEL_ONE = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 4, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 4, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 5, 0, 0, 4, 0, 0, 0, 0, 1, 5, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 3, 1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const PLAYER_START = {
    fuelCells: 3,
    creaturesFound: 0,
    mazePosition: [1, 0],
    level: 1,
    hasWeapon: false
}

let player = {
    ...PLAYER_START,
    mazePosition: [...PLAYER_START.mazePosition]
}; // Sets the player object as a copy of the PLAYER_START object

const GRID_CLASSES = ['path', 'wall', 'player', 'enemy', 'encounter', 'creature']

const SPECIES_NAMES = ['Fluxorgon', 'Blipblorp', 'Cuddlexian', 'Quizzlit', 'Pluffigon', 'Wobblex', 'Zibzorb', 'Nuzzletron', 'Grizzlebee', 'Fluffinate', 'Glimblatt', 'Squizzelar', 'Mubbleflop', 'Zoopzop', 'Jibberjell', 'Wigglimon', 'Cluzzleclank', 'Blibberfudge', 'Fuzzlequark', 'Zumblezot', 'Plopplip', 'Quibquab', 'Buzzleboon', 'Dribbledorf', 'Flibblestix'];

const SPECIES_IMAGES = ['./imgs/species_1.png', './imgs/species_2.png', './imgs/species_3.png', './imgs/species_5.png', './imgs/species_4.png', './imgs/species_6.png']

const SPECIES_CONGRATS_TEXT = [`So cute!`, `OMG adorable!`, `Heart-meltingly sweet!`, `Too cute to handle!`, `Aww, precious!`, `What a cutie pie!`, `Absolutely charming!`, `Irresistibly cute!`, `Look at those eyes!`, `Overloaded with cuteness!`, `Squee-worthy!`, `That's just darling!`, `Cuteness level: 1000!`, `So fluffy and cute!`, `Melted my heart!`, `Could it get any cuter?`, `That's some next-level cuteness!`, `A bundle of joy!`, `Pure adorableness!`, `Such a sweetie!`, `Cuteness overload!`, `I'm in love!`, `Too sweet to be real!`, `A true cutie!`, `Gushing over this cuteness!`];

const RESTART_DELAY = 10000; 

const STORYLINE = `
    It's the year 2241, and humanity is... bored. <br><br>

    You're just launching your career as an space wildlife photographer, and you have a plan: find the 
    cutest creatures in the galaxy and share them with the world! <br><br>

    <b>But beware:</b> space is lawless, and if you aren't careful, your precious fuel cells will be stolen!
`;

const ENCOUNTER_DESCRIPTIONS = {
    encounter1: {
        trigger: {
            title: `Mysterious Signal Echoes!`,
            image: `/imgs/encounter_1.png`,
            text: `Amid the silent void, your ship's radar detects a faint distress signal, pulsating from a distant derelict ship. The eerie silence is broken only by this beacon. Do you dare approach?`,
            option1: `Venture forth and investigate`,
            option2: `Steer clear; it could be a ruse`,
        },
        resolution1: {
            title: `A Grateful Traveler!`,
            image: `/imgs/encounter_1_resolution_1.png`,
            text: `Navigating through the wreckage, you discover a stranded traveler. His ship was attacked by space pirates, and he's been floating aimlessly ever since. Grateful for the timely rescue, he gifts you a fuel cell, a relic from his now-defunct ship.`,
            outcome: 'gain1'
        },
        resolution2: {
            title: `Cosmic Deception!`,
            image: `/imgs/encounter_1_resolution_2.png`,
            text: `Your instincts were right! As you steer clear of the signal, you notice rogue spacecrafts lurking nearby. It was indeed a trap!`,
            outcome: ''
        }
    },
    
    encounter2: {
        trigger: {
            title: `Cosmic Phenomenon Emerges!`,
            image: `/imgs/encounter_2.png`,
            text: `A mesmerizing and radiant interstellar event begins to manifest before your eyes, its origin and nature unknown. The beauty and mystery beckon. Do you seize the moment?`,
            option1: `Dive in and document!`,
            option2: `Exercise caution; maintain distance`,
        },
        resolution1: {
            title: `Stellar Photography!`,
            image: `/imgs/encounter_2_resolution_1.png`,
            text: `You navigate your ship closer, capturing breathtaking images of the phenomenon. Nearby, an alien reconnaissance vessel, captivated by your audacity, approaches in peace. Impressed by your images and courage, they reward you with a fuel cell.`,
            outcome: 'gain1'

        },
        resolution2: {
            title: `A Near Miss!`,
            image: `/imgs/encounter_2_resolution_2.png`,
            text: `Exercising prudence, you decide to keep your distance. As you leave, you notice the vast energies from the event create unpredictable spatial waves.`,
            outcome: ''
        }
    },
    

    encounter3: {
        trigger: {
            title: `Ethereal Nebula Sighting!`,
            image: `/imgs/encounter_3.png`,
            text: `The vastness of space reveals a captivating nebula, shimmering with a myriad of colors and teeming with undiscovered lifeforms. Your sensors detect unusual bio-signatures. Could this be the moment you've been waiting for?`,
            option1: `Venture closer for a rare photo opportunity`,
            option2: `Chart its coordinates but keep a safe distance`,
        },
        resolution1: {
            title: `Bad photo op!`,
            image: `/imgs/encounter_3_resolution_1.png`,
            text: `With bated breath, you approach the nebula. Suddenly, a magnetic surge from the nebula affects your ship's navigation systems. You're forced to use a fuel cell to recalibrate, and you leave, disappointed.`,
            outcome: 'lose1'
        },
        resolution2: {
            title: `Safety First!`,
            image: `/imgs/encounter_3.png`,
            text: `Recognizing the potential dangers of unknown territories, you log the nebula's coordinates for future reference and continue on your journey.`,
            outcome: ''

        }
    },
    

    encounter4: {
        trigger: {
            title: `Mysterious Merchant's Offer!`,
            image: `/imgs/encounter_4.png`,
            text: `A lone merchant ship, adorned with symbols from a distant galaxy, hails you. The captain offers you a weapon for one fuel cell. He also admires your colorful ship's appearance, and offers to buy the ship's blueprints from you for a fuel cell.`,
            option1: `Trade a fuel cell for the weapon`,
            option2: `Trade your blueprints for a fuel cell`,
        },
        resolution1: {
            title: `Galactic Armament Acquired!`,
            image: `/imgs/encounter_4_resolution_1.png`,
            text: `You decide to make the trade. The weapon is unlike anything you've seen before, pulsating with a mysterious energy. The merchant assures you of its potency against any space threats. As you hand over a fuel cell, you hope the trade proves to be worth it.`,
            outcome: 'lose1AndGainWeapon'
        },
        resolution2: {
            title: `Trust in Preparedness!`,
            image: `/imgs/encounter_4_resolution_2.png`,
            text: `You choose to sell your ship's blueprints. The merchant nods, and after receiving them sends you the fuel cell.`,
            outcome: 'gain1'
        }
    }
    ,

    encounter5: {
        trigger: {
            title: `The Inescapable Grasp of a Black Hole!`,
            image: `/imgs/encounter_5.png`,
            text: `The serenity of space is abruptly disrupted as your ship's alarms blare. You've unknowingly ventured too close to a black hole! Its gravitational pull is immense, and escape seems improbable. Your ship's AI suggests jettisoning a fuel cell to generate a massive thrust. The choice is yours.`,
            option1: `Jettison a fuel cell to aid escape`,
            option2: `Attempt to escape without sacrificing fuel`,
        },
        resolution1: {
            title: `Desperate Measures, Successful Escape!`,
            image: `/imgs/encounter_5_resolution_1.png`,
            text: `You make the tough call and jettison a fuel cell. The resulting explosion provides the necessary thrust, propelling your ship out of the black hole's formidable grasp. You're safe, albeit with one less fuel cell.`,
            outcome: 'lose1'
        },
        resolution2: {
            title: `Gravitational Struggle!`,
            image: `/imgs/obstacle_1.png`,
            text: `You decide to trust your ship's capabilities and attempt to escape without sacrificing any fuel. The struggle is intense, and the black hole's pull is relentless. By the time you manage to break free, the excessive energy consumption has drained two of your fuel cells.`,
            outcome: 'lose2'
        }
    }
    ,

    encounter6: {
        trigger: {
            title: `A Welcoming Space Station!`,
            image: `/imgs/encounter_6.png`,
            text: `As you traverse the vastness of space, a friendly transmission is received from a nearby space station. The station's commander invites you aboard for a short respite and mentions they have a busy cantina where wagers are made.`,
            option1: `Dock, rest, and trade for a fuel cell`,
            option2: `Visit the cantina and make a wager`,
        },
        resolution1: {
            title: `Successful Trade!`,
            image: `/imgs/encounter_6_resolution_1.png`,
            text: `You decide to dock and are warmly greeted by the inhabitants of the space station. After sharing stories of your adventures, you make a fair trade and secure a fuel cell. The station's inhabitants wish you well on your journey.`,
            outcome: 'gain1'
        },
        resolution2: {
            title: `A good wager!`,
            image: `/imgs/encounter_6_resolution_2.png`,
            text: `Eager to try your luck, you visit the cantina and spend the evening gambling. Luck is on your side, you win 2 fuel cells!`,
            outcome: 'gain2'

        }
    }
    
    
}
let speciesInstances = {};

/*----- state variables -----*/
let maze = MAP_LEVEL_ONE.map(row => row.slice()); // deep copy
let encounters = JSON.parse(JSON.stringify(ENCOUNTER_DESCRIPTIONS)); // Copies encounters object so I can remove encounters as they occur
console.log(encounters)
let shipDirection = '0deg'
let isPlayerViewingModal = false // This is used to prevent movement while viewing a modal
let currentSelectedOption = 'option1';
let encounterToRemove = null;
let isGameOver = false
let speciesNames = [...SPECIES_NAMES] // Copies species names so that I can remove them from the array when found so they don't duplicate
let speciesImages = [...SPECIES_IMAGES ]
let speciesCongratsText = [...SPECIES_CONGRATS_TEXT]
class Species {
    constructor(speciesName, image, levelDiscovered, title, text){
        this.speciesName = speciesName
        this.image = image
        this.levelDiscovered = levelDiscovered
        this.title = title
        this.text = text
    }
}

/*----- cached elements  -----*/
const mazeEl = document.querySelector('#maze')
const speciesPhotoTopEl = document.querySelector('#photo-top')
const speciesPhotoBottomEl = document.querySelector('#photo-bottom')
const speciesDescriptionTopEl = document.querySelector('#photo-top-description')
const speciesDescriptionBottomEl = document.querySelector('#photo-bottom-description')
const fuelContainerEl1 = document.querySelector('#fuel1')
const fuelContainerEl2 = document.querySelector('#fuel2')

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

function movePlayer(direction){
    if(isPlayerViewingModal){
        return
    }
    let desiredCell = getDesiredMoveCell(direction)
    let desiredCellValue = maze[desiredCell[0]][desiredCell[1]]
    if(desiredCellValue === 1){
        return
    } else if(desiredCellValue === 0){
        moveOnPath(desiredCell)
    } else if(desiredCellValue === 3){
        moveIntoEnemy(desiredCell)
    } else if(desiredCellValue === 4){
        moveIntoEncounter(desiredCell)
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

function moveIntoEncounter(desiredCell){
    updateMazeAndPlayerPosition(desiredCell)
    encounterTrigger()
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
    if(!player.hasWeapon){
        changeFuel(-1)
    }
    
    console.log(player.fuelCells)
    if(player.fuelCells < 1){
        console.log('ran into enemy and out of fuel')
        if(!isGameOver){
            triggerGameOver('enemy')
        } else {
            console.log('game is already over')
        }
    } else {
        renderEnemyModal()
    }
    // player.mazePosition = PLAYER_START.mazePosition
    maze[player.mazePosition[0]][player.mazePosition[1]] = 2
}



function encounterTrigger(){
    console.log('encounter collision');
    const encounterKeys = Object.keys(encounters);  
    const randomIndex = randomNumber(encounterKeys.length); 
    const randomEncounterKey = encounterKeys[randomIndex];   

    encounterToRemove = randomEncounterKey;
    const currentEncounter = encounters[randomEncounterKey]; 

    console.log('launching first encounter modal with encounterTrigger');
    showChoicesModal('encounterTrigger', currentEncounter);
}


function creatureCollision(){
    player.creaturesFound += 1
    renderCreatureModal()
    render()
}


function triggerGameOver(){
    // closeDisplayModal(); 
    closeDisplayModal()
    isGameOver = true;
    player.mazePosition = PLAYER_START.mazePosition;
    console.log('triggergameover');
    const obj = {
        title: 'GAME OVER',
        img: './imgs/fuel3.png',
        text: `You ran out of fuel! <br><br> Creatures found: ${player.creaturesFound}<br><br> Restarting in <b><span id="countdown">10</span></b> seconds...`,
    }
    document.body.classList.add('shake-effect');
    setTimeout(function() {
        document.body.classList.remove('shake-effect');
        showDisplayModal('gameOver', obj); 
    }, 3000);
    restartGameAfterDelay();
}


function restartGameAfterDelay(){
    let timeLeft = RESTART_DELAY / 1000;
    countdownInterval = setInterval(function() {
        console.log('countdown begun')
        timeLeft -= 1;
        if(document.getElementById('countdown')){
            document.getElementById('countdown').innerText = timeLeft;
        }

        if(timeLeft <= 0) {
            console.log('countdown ended')
            clearInterval(countdownInterval); 
            restartGame();
        }
    }, 1000); // Update every second
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

function encounterResolution(currentEncounter, selectedOption){
    closeModal('choices-modal')
    currentSelectedOption = 'option1' // resets this for the new choices modal display
    const currentResolution = currentEncounter['resolution'+selectedOption]
    let outcome = currentResolution.outcome
    console.log('outcome = ' + outcome)
    if(outcome){
        if(outcome === 'gain1'){
            changeFuel(1)
        } else if (outcome === 'gain2'){
            changeFuel(2)
        } else if (outcome === 'lose1'){
            changeFuel(-1)
        } else if (outcome === 'lose2'){
            changeFuel(-2)
        } else if (outcome === 'lose1AndGainWeapon'){
            changeFuel(-1)
            player.hasWeapon = true
        }
    } else {
        console.log('no change')
    }
    delete encounters[encounterToRemove]
    showDisplayModal('encounterResolution', currentResolution);

}

function renderCreatureModal(){
    let randomNumSpeciesName = randomNumber(speciesNames.length)
    let randomNumSpeciesImage = randomNumber(speciesImages.length)
    let randomNumSpeciesCongratsText = randomNumber(speciesCongratsText.length)
    let randomSpecies = speciesNames[randomNumSpeciesName]
    let randomImage = speciesImages[randomNumSpeciesImage]
    let randomCongratsText = speciesCongratsText[randomNumSpeciesCongratsText]
    let title = 'You found a new species!'
    let text = `${randomCongratsText} You decide to name them: <br><br> <span class="center"><h2>${randomSpecies}</h2></span><br>Well done! New species found: ${player.creaturesFound}`

    speciesInstances[randomSpecies] = new Species(randomSpecies, randomImage, player.level, title, text);

console.log(speciesInstances[randomSpecies])

    speciesNames.splice(randomNumSpeciesName, 1)  // Removes the used species name so that it can't be duplicated later
    speciesImages.splice(randomNumSpeciesImage, 1)
    renderPhoto(randomSpecies)
    showDisplayModal('creature', speciesInstances[randomSpecies], );

}

function renderEnemyModal(){
    const enemyImages = ['./imgs/enemy_1.png', './imgs/enemy_2.png', './imgs/enemy_3.png']
    const enemyText = [`"You're brave coming out here in that, kid. Stupid though."`, `"Space isn't big enough for the both of us."`, `"You're just wasting fuel out here, loser."`, `"Oh good, fresh content."`, `"I know it's wrong but ... meh, I don't really care."` ]
    let randomImage = enemyImages[randomNumber(enemyImages.length)]
    let randomText = enemyText[randomNumber(enemyText.length)]
    const enemyObj = {
        title: 'Another ship attacked you!',
        image: randomImage,
        text: `${randomText}. <br><br> They stole a fuel cell!`
    }
    const weaponObj = {
        title: 'Weapons test',
        image: './imgs/weapon.png',
        text: `You're not going down without a fight. You line up your weapon and fire: It's a hit! The enemy ship flees.`
    }

    if(player.hasWeapon){
        showDisplayModal('enemy', weaponObj);
    } else {
    showDisplayModal('enemy', enemyObj);
    }
    
}

function showChoicesModal(type, currentEncounter) {
    isPlayerViewingModal = true
    fuelRender()
    document.getElementById('option1').classList.add('highlight');
    document.getElementById('option2').classList.remove('highlight');
    // Caching elements
    let modalTitleEl = document.getElementById('choices-modal-title');
    let modalImageEl = document.getElementById('choices-modal-image');
    let modalDescriptionEl = document.getElementById('choices-modal-description');
    let choice1 = document.getElementById('option1');
    let choice2 = document.getElementById('option2');
    
    // Adding event listeners to exit modal

    document.getElementById('option1').addEventListener('click', function(){  
        encounterResolution(currentEncounter, 1)
        }, { once: true });
    document.getElementById('option2').addEventListener('click', function(){
        encounterResolution(currentEncounter, 2)
        }, { once: true });
    document.addEventListener('keydown', handleChoicesKeypress)

    // Show modal
    document.getElementById('choices-modal').classList.remove('hidden');
    
    // Conditionals
    if(type === 'encounterTrigger'){
        modalTitleEl.innerText = currentEncounter.trigger.title
        modalImageEl.src = currentEncounter.trigger.image
        modalDescriptionEl.innerHTML = currentEncounter.trigger.text
        choice1.innerText = currentEncounter.trigger.option1
        choice2.innerText = currentEncounter.trigger.option2
    } 
}

function showDisplayModal(type, currentEncounter) {
    isPlayerViewingModal = true
    fuelRender()
    // Caching elements
    let modalTitleEl = document.getElementById('display-modal-title');
    let modalImageEl = document.getElementById('display-modal-image');
    let modalDescriptionEl = document.getElementById('display-modal-description');
    
    // Adding event listeners to exit modal only if game is still running
    if(!isGameOver){
        document.addEventListener('keydown', closeDisplayModal);
        document.getElementById('display-modal').addEventListener('click', closeDisplayModal)
    }
    

    // Show modal
    document.getElementById('display-modal').classList.remove('hidden');
    
    // Conditionals
    if(type === 'intro'){
        modalTitleEl.innerText = "Close Encounters of the Cute Kind"
        modalImageEl.src = "./imgs/hero2.png"
        modalDescriptionEl.innerHTML = STORYLINE
    } else if (type === 'encounterResolution'){
        modalTitleEl.innerText = currentEncounter.title
        modalImageEl.src = currentEncounter.image
        modalDescriptionEl.innerHTML = currentEncounter.text
    } else if (type === 'creature'){
        modalTitleEl.innerText = currentEncounter.title
        modalImageEl.src = currentEncounter.image
        modalDescriptionEl.innerHTML = currentEncounter.text
    } else if (type === 'gameOver'){
        modalTitleEl.innerText = currentEncounter.title
        modalImageEl.src = currentEncounter.img
        modalDescriptionEl.innerHTML = currentEncounter.text
    } else if (type === 'enemy'){
        modalTitleEl.innerText = currentEncounter.title
        modalImageEl.src = currentEncounter.image
        modalDescriptionEl.innerHTML = currentEncounter.text
    }
}

function handleChoicesKeypress(e) {
    
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") {
        // Toggle the selected option
        document.getElementById(currentSelectedOption).classList.remove('highlight'); 
        currentSelectedOption = currentSelectedOption === 'option1' ? 'option2' : 'option1'; 
        document.getElementById(currentSelectedOption).classList.add('highlight'); 
    } else if (e.key === "Enter" || e.key === " ") {
        // Trigger the selected option's click event
        document.getElementById(currentSelectedOption).click();
    }
    console.log(document.getElementById(currentSelectedOption))
}

function closeDisplayModal() {
    document.getElementById('display-modal').classList.add('hidden');
    isPlayerViewingModal = false;
    // Remove the listeners once the modal is closed
    document.removeEventListener('keydown', closeDisplayModal);
    document.getElementById('display-modal').removeEventListener('click', closeDisplayModal)
    document.removeEventListener('keydown', handleChoicesKeypress)
}

function closeModal() {
    isPlayerViewingModal = false
    document.getElementById('choices-modal').classList.add('hidden');
    document.removeEventListener('keydown', handleChoicesKeypress)
}

function handleModalClickOutside(elId, event) {
    if (event.target === document.getElementById(elId)) {
        closeModal(elId);
    }
}

function changeFuel(amount){
    player.fuelCells += amount; 
    if(player.fuelCells <= 0){
        if(!isGameOver){
            triggerGameOver();
        } else {
            console.log('game is already over')
        }
    } else {
        fuelRender();
    }
}

function fuelRender(){
    fuelContainerEl1.innerHTML = ''
    fuelContainerEl2.innerHTML = ''
    console.log(player.fuelCells)

    for(let i = 0; i < player.fuelCells; i++){
        let imgEl1 = document.createElement('img');
        let imgEl2 = document.createElement('img');
        imgEl1.src = "./imgs/fuel_small.png";
        imgEl2.src = "./imgs/fuel_small.png";
        fuelContainerEl1.appendChild(imgEl1);
        fuelContainerEl2.appendChild(imgEl2);
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

function restartGame(){
    // Logic to restart the game
    speciesPhotoTopEl.src = "./imgs/blankphoto.png"
    speciesPhotoBottomEl.src = "./imgs/blankphoto.png"
    speciesDescriptionTopEl.innerText = 'Species: Undiscovered. No entry in photo archives'
    speciesDescriptionBottomEl.innerText = 'Species: Undiscovered. No entry in photo archives'
    document.getElementById('display-modal').classList.add('hidden'); // Hide the game over modal
    
    console.log('restart')
    maze = MAP_LEVEL_ONE.map(row => row.slice());
    shipDirection = '0deg'
    isPlayerViewingModal = false // This is used to prevent movement while viewing a modal
    currentSelectedOption = 'option1';
    encounterToRemove = null; 
    speciesNames = [...SPECIES_NAMES] // Copies species names so that I can remove them from the array when found so they don't duplicate
    speciesImages = [...SPECIES_IMAGES ]
    speciesCongratsText = [...SPECIES_CONGRATS_TEXT]
    speciesInstances = {};
    isGameOver = false
    player = {
        ...PLAYER_START,
        mazePosition: [...PLAYER_START.mazePosition]
    };
    init()

}
function triggerNextLevel(){

}


function render(){
    renderMaze()
 

}

function init(){

    render()
    showDisplayModal('intro');
}

render()
init()



/**TODO
 * Add encounter photos and modal - DONE
 * Add creature photos and modal - DONE
 * add in game over modal - DONE
 * create a reset - DONE
 * species photos styling improvements
 * add new level
 * add all encounter images - DONE
 * add sounds
 * rotate ship on movement - DONE, hard!
 * animation between cells
 * enemy movement
 * update walls so they look more uniform and less repetitive
 * fog of war
 * make encounters and creatures unknown initially - DONE
 * refactor to use two separate modals to fix event listener hell - DONE
 * fix deletion of encounters - DONE
 * mobile  make one column layout, make button to trigger slideout nav as overlay or modal, crop for icon, full species name
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

        // let modalOptions = document.getElementById('modal-options');

    // 
    

    // // Additional logic based on type
    // if (type === 'encounterTrigger') {
    //     // Highlights first button option
    //     let currentSelectedOption = 'option1';
    //     document.getElementById(currentSelectedOption).classList.add('highlight'); 
        

    //     document.getElementById('option1').textContent = currentEncounter.trigger.option1;
    //     document.getElementById('option2').textContent = currentEncounter.trigger.option2;
    //     modalOptions.style.display = "block";
    //     // Remove existing event listeners to forces the player to chose an option and not dismiss modal
    //     document.removeEventListener('keydown', closeModal); 
    //     document.getElementById('modal').removeEventListener('click', handleModalClickOutside);
    //     // Add event listeners to check for encounter buttons
    //     document.getElementById('option1').addEventListener('click', function(){
    //         encounterResolution(currentEncounter, 1)
    //     } );
    //     document.getElementById('option2').addEventListener('click', function(){
    //         encounterResolution(currentEncounter, 2)
    //     });
    //     modalOptions.focus()
    //     modalOptions.addEventListener('keydown', function(e) {
    //         if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") {
    //             // Toggle the selected option
    //             document.getElementById(currentSelectedOption).classList.remove('highlight'); 
    //             currentSelectedOption = currentSelectedOption === 'option1' ? 'option2' : 'option1'; 
    //             document.getElementById(currentSelectedOption).classList.add('highlight'); 
    //         } else if (e.key === "Enter" || e.key === " ") {
    //             // Trigger the selected option's click event
    //             document.getElementById(currentSelectedOption).click();
    //         }
    //     });
        
    // } else if (type === 'encounterResolution') {
    //     modalOptions.style.display = "none";


    //     } else if(type === 'intro'){
    //         // Add event listeners to close modal
    // modalOptions.style.display = "none";
    // }
    // else {
    //     modalOptions.style.display = "none";

    // }
    // //... handle other types similarly