const MAX_GRID_SIZE = 100;
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_LINE_COLOUR = '#000';

let alwaysOn = true;
let currentlyOn = true;
let randomColours = false;
let lineColour = DEFAULT_LINE_COLOUR;
let shading = false;

function setColor(colour){
    lineColour = colour;
}

function resetGrid(){
    const sideSetter = document.querySelector('#sideSetter');
    sideSetter.value = DEFAULT_GRID_SIZE;
    setGrid(DEFAULT_GRID_SIZE);
}

function setGrid(sideLength){
    if(sideLength > MAX_GRID_SIZE){
        sideLength = MAX_GRID_SIZE;
    }
    lineColour = cPicker.value;
    const sizePanel = document.querySelector('#gridSize');
    sizePanel.textContent = `Grid size: ${sideLength} x ${sideLength}`;
    const drawPane = document.querySelector('#drawPane');
    drawPane.replaceChildren();
    for(let i = 0; i < sideLength; i++){
        let line = createLine(sideLength);
        drawPane.appendChild(line);
    }
    drawPane.addEventListener('doubleclick', toggleOn);
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('mouseover', flipColour));
}

function createLine(lineLength){
    const lineDiv = document.createElement('div');
    lineDiv.classList.add('lineContainer');
    
    const paneWidth = 600;

    for(let i = 0; i < lineLength; i++){
        let nextCell = document.createElement('div');
        nextCell.classList.add('cell');
        nextCell.setAttribute('style', `width: ${paneWidth/lineLength}; min-height: ${paneWidth/lineLength}`);
        lineDiv.appendChild(nextCell);
    }
    return lineDiv;
}

function flipColour(e){
    if(alwaysOn || currentlyOn){
        let currentColor = window.getComputedStyle(this).getPropertyValue('background-color');
        let currentOpacity = (window.getComputedStyle(this).getPropertyValue('opacity')) * 1;
        if(randomColours) { 
            lineColour = '#' + Math.floor(Math.random()*16777215).toString(16); 
            currentOpacity = 1;
        } else {
            if(currentOpacity < 1 && shading){
                currentOpacity += 0.1;
            } else if (shading){
                currentOpacity = 0.1;
            } else {
                currentOpacity = 1;
            }
        }
        this.setAttribute('style', `background-color: ${lineColour}; opacity: ${currentOpacity};`);
    }
}

function toggleOn(e){
    alwaysOn = !alwaysOn;
    currentlyOn = alwaysOn;
}

function highlightButton(e) {
    if(!this.classList.contains('selected')){
        this.classList.add('selected');
    } else {
        this.classList.remove('selected');
    }
}

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetGrid);

const sideSetter = document.querySelector('#sideSetter');
sideSetter.oninput = function() {
    setGrid(this.value);
}

const cPicker = document.querySelector('#cPicker');
cPicker.oninput = function() {
    setColor(this.value);
}

function drawActive() { currentlyOn = true; }

function drawDisable() { currentlyOn = false; }

function toggleRandomise() { 
    randomColours = !randomColours;
    setColor(cPicker.value);
    if(shading){
        shading = false;
        document.querySelector('#shading').classList.remove('selected');
    }
    console.log(`RANDOMISER: ${shading}:${randomColours}`);
}


const alwaysOnToggle = document.querySelector('#alwaysOn');
alwaysOnToggle.addEventListener('click', toggleOn);

const workArea = document.querySelector('#drawPane');
workArea.addEventListener('dblclick', function() {alwaysOnToggle.click();});

const w = document.querySelector('body');
w.addEventListener('mousedown', drawActive);
w.addEventListener('mouseup', drawDisable);

const randomButton = document.querySelector('#randomColour');
randomButton.addEventListener('click', toggleRandomise);
randomButton.addEventListener('click', highlightButton);

const toggles = document.querySelectorAll('.toggles');
toggles.forEach(toggle => toggle.addEventListener('click', highlightButton));

const shadingToggle = document.querySelector('#shading');
shadingToggle.addEventListener('click', 
    function(){ 
        shading = !shading;
        if(randomColours){
            randomColours = false;
            randomButton.classList.remove('selected');
        }
        setColor(cPicker.value);
    });

setGrid(DEFAULT_GRID_SIZE);