let grid = document.getElementById('grid');
let toggle = false;
let n = 16;
let colourMode = document.getElementById('colour');
let eraserMode = document.getElementById('eraser');
let rainbowMode = document.getElementById('rainbow');
let shaderMode = document.getElementById('shader');
let shaderModeIncrementDiv = document.getElementById('shader-increment-div');
let shaderModeIncrement = document.getElementById('shader-increment');
let brightenMode = document.getElementById('brighten');
let brightenModeIncrement = document.getElementById('brighten-increment');
let brightenModeIncrementDiv = document.getElementById('brighten-increment-div');
let colour = document.getElementById('colour-picker');
let colourContainer = document.getElementById('colour-picker-container');
let gridSizeSelector = document.getElementById('grid-size-selector');
let gridSizeDisplay = document.getElementById('grid-size');

function toggleColourPicker() {
    if (colourMode.checked) {
        colourContainer.style.display = '';
        shaderModeIncrementDiv.style.display = 'none';
        brightenModeIncrementDiv.style.display = 'none';
    }
    else if (eraserMode.checked) {
        colourContainer.style.display = 'none';
        shaderModeIncrementDiv.style.display = 'none';
        brightenModeIncrementDiv.style.display = 'none';
    }
    else if (rainbowMode.checked) {
        colourContainer.style.display = 'none';
        shaderModeIncrementDiv.style.display = 'none';
        brightenModeIncrementDiv.style.display = 'none';
    }
    else if (shaderMode.checked) {
        colourContainer.style.display = 'none';
        shaderModeIncrementDiv.style.display = 'block';
        brightenModeIncrementDiv.style.display = 'none';
    }
    else if (brightenMode.checked) {
        colourContainer.style.display = 'none';
        shaderModeIncrementDiv.style.display = 'none';
        brightenModeIncrementDiv.style.display = 'block';
    }
}

function shade(colour, increment) {
    let oldColour = colour;
    console.log(`oldColour = ${oldColour}`);

    let nums = oldColour.slice(4, oldColour.length - 1);
    console.log(`nums = ${nums}`);

    let numsArr = nums.split(',').map(function(item) {
        return parseInt(item, 10);
    });
    console.log(`numsArr = ${numsArr}`);

    let newArr = [];
    for (let i = 0; i < numsArr.length; i++) {
        newArr[i] = numsArr[i] - increment;
    }
    console.log(`newArr = ${newArr}`);
    return `rgb(${newArr[0]}, ${newArr[1]}, ${newArr[2]})`;
}

function start() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // Create cell
            let cell = document.createElement('div');
            cell.style.width = '100%';
            cell.style.height = '100%';
            cell.classList.add('cell');
            cell.style.backgroundColor = 'rgb(255, 255, 255)';
            grid.appendChild(cell);

            cell.addEventListener('mousedown', function () {
                toggle = true;
            });

            cell.addEventListener('mouseup', function () {
                toggle = false;
            });

            cell.addEventListener('mouseover', function () {
                if (toggle === true) {
                    if (colourMode.checked) {
                        cell.style.backgroundColor = colour.value;
                    }
                    if (eraserMode.checked) {
                        cell.style.backgroundColor = 'white';
                    }
                    if (rainbowMode.checked) {
                        let colourR = Math.floor(Math.random() * 256);
                        let colourG = Math.floor(Math.random() * 256);
                        let colourB = Math.floor(Math.random() * 256);
                        cell.style.backgroundColor = `rgb(${colourR}, ${colourG}, ${colourB})`;
                    }
                    if (shaderMode.checked) {
                        cell.style.backgroundColor = shade(cell.style.backgroundColor, shaderModeIncrement.value);
                    }
                    if (brightenMode.checked) {
                        cell.style.backgroundColor = shade(cell.style.backgroundColor, -shaderModeIncrement.value);
                    }
                }
            });
        }
    }
}

function clearGrid() {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
}

let clear = document.getElementById('clear');
clear.addEventListener('click', clearGrid);

// Set new grid size based on slider value
gridSizeSelector.addEventListener('input', function () {
    clearGrid();
    n = gridSizeSelector.value;
    grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    gridSizeDisplay.innerHTML = `Grid Size: ${n} x ${n}`;
    start();
});

start();