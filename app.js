let container = document.getElementById('grid');

let n = 16;
let toggle = false;
let colour = document.querySelector('input');

function start() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let cell = document.createElement('div');
            cell.style.width = 'auto';
            cell.style.height = 'auto';
            cell.classList.add('cell');
            container.appendChild(cell);

            cell.addEventListener('mousedown', function () {
                toggle = true;
            });

            cell.addEventListener('mouseup', function () {
                toggle = false;
            });

            cell.addEventListener('mouseover', function () {
                if (toggle === true) {
                    cell.style.backgroundColor = colour.value;
                }
            });
        }
    }
}

let clear = document.getElementById('clear');

clear.addEventListener('click', function () {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    })

    // Prompt for grid size
    let gridSize = window.prompt("New grid size?");
    try {
        if (gridSize <= 100) {
            n = gridSize;
            let grid = document.getElementById('grid');
            grid.style.gridTemplateColumns = `repeat(${n}, auto)`;
            start();
        }
    }
    catch
    {
        window.alert('Input too high');
    }
});

start();