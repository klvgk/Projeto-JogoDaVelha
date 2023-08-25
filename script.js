//Initial Data;
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player = '';
let warning = '';
let playing = false;

reset();

//Events;
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

//Functions;
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if(playing && square[item] === ''){
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
};

//Clear the board;
function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';

    for (let i in square) {
        square[i] = '';
    };

    playing = true;

    renderSquare();
    renderInfo();
};

//Render the board with the options;
function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    };
    checkGame();
};

//Render the informations and warnings;
function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
};

//Change the player turn;
function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
};

//Check if the game has finished;
function checkGame() {
    if(checkWinnerFor('x')) {
        warning = '"x" Won!';
        playing = false;
    }else if(checkWinnerFor('o')) {
        warning = '"o" Won!';
        playing = false;
    } else if(isFull()) {
        warning = "Draw";
        playing = false;
    };
};

//Check if somebody won the game;
function checkWinnerFor(player) {
    let pos = [
        //Horizontal;
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        //Vertical;
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        // X
        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) {
        let pArray = pos[w].split(','); //a1, a2, a3;
        let hasWon = pArray.every(option => square[option] === player);

        if(hasWon){
            return true;
        }
    }

    return false;
};

//Check if all the options were marked;
function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        };
    };

    return true;
}