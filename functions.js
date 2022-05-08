function setGrid(sideLength){
    const drawPane = document.querySelector('#drawPane');
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


setGrid(2);