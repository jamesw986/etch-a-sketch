let grid = document.getElementById('grid');
let toggle = false;
let n = 16;
let colourMode = document.getElementById('colour');
let eraserMode = document.getElementById('eraser');
let rainbowMode = document.getElementById('rainbow');
let colour = document.getElementById('colour-picker');
let colourContainer = document.getElementById('colour-picker-container');
let gridSizeSelector = document.getElementById('grid-size-selector');
let gridSizeDisplay = document.getElementById('grid-size');

function toggleColourPicker() {
    if (colourMode.checked) {
        colourContainer.style.display = '';
    }
    else if (eraserMode.checked) {
        colourContainer.style.display = 'none';
    }
    else if (rainbowMode.checked) {
        colourContainer.style.display = 'none';
    }
}

function start() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // Create cell
            let cell = document.createElement('div');
            cell.style.width = '100%';
            cell.style.height = '100%';
            cell.classList.add('cell');
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
                        // TODO hide/unhide colour picker
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
gridSizeSelector.addEventListener('input', function() {
    clearGrid();
    n = gridSizeSelector.value;
    grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    gridSizeDisplay.innerHTML = `Grid Size: ${n} x ${n}`;
    start();
});

start();