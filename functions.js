const MAX_GRID_SIZE = 100;
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_LINE_COLOUR = '#000000';

let alwaysOn = true;
let currentlyOn = true;
let lineColour = DEFAULT_LINE_COLOUR;

function setColor(colour){
    lineColour = colour;
}

function resetGrid(){
    const sideSetter = document.querySelector('#sideSetter');
    sideSetter.value = DEFAULT_GRID_SIZE;
    setGrid(DEFAULT_GRID_SIZE);
}

function changeGridSize(e){
    console.log(e.value);
}

function setGrid(sideLength){
    if(sideLength > MAX_GRID_SIZE){
        sideLength = MAX_GRID_SIZE;
    }
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
    cells.forEach(cell => cell.addEventListener('click', flipColour));
}

function createLine(lineLength){
    //First, create a line of appropriate length
    const lineDiv = document.createElement('div');
    lineDiv.classList.add('lineContainer');
    
    const paneWidth = 600;

    for(let i = 0; i < lineLength; i++){
        let nextCell = document.createElement('div');
        nextCell.classList.add('cell');
        nextCell.setAttribute('style', `width: ${paneWidth/lineLength}; min-height: ${paneWidth/lineLength}`);
        lineDiv.appendChild(nextCell);
    }
    console.log(lineDiv);
    return lineDiv;
}

function flipColour(e){
    if(alwaysOn || currentlyOn){ 
        this.setAttribute('style', `background-color: ${lineColour};`);
    }
}

function toggleOn(e){
    alwaysOn = !alwaysOn;
    currentlyOn = alwaysOn;
    if(alwaysOn){
        alwaysOnToggle.textContent = "Switch to draw on click";
    } else {
        alwaysOnToggle.textContent = "Switch to always on";
    }
}

function highlightButton(e){
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

const alwaysOnToggle = document.querySelector('#alwaysOn');
alwaysOnToggle.addEventListener('click', toggleOn);

const workArea = document.querySelector('#drawPane');
workArea.addEventListener('dblclick', toggleOn);

const w = document.querySelector('body');
w.addEventListener('mousedown', drawActive);
w.addEventListener('mouseup', drawDisable);

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', highlightButton));

setGrid(DEFAULT_GRID_SIZE);