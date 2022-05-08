const MAX_GRID_SIZE = 100;
const DEFAULT_GRID_SIZE = 16;

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
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('mouseover', flipColour));
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
    this.setAttribute('style', 'background-color: black;');
}


setGrid(DEFAULT_GRID_SIZE);

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetGrid);

const sideSetter = document.querySelector('#sideSetter');
sideSetter.oninput = function() {
    setGrid(this.value);
}