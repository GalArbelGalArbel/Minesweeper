'use strict';


var gBoard = [];
var gMine = '💥';
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gNextId = 0;
var gLevel = {
    Size: 4,
    Mines: 2,
};


var hello=new Audio('sound/hello.wav');
function chooseLevelEasy() {
    document.body.style.backgroundImage = "url('css/img/borat1.jpg')";
   gLevel = {
        Size: 4,
        Mines: 2,
    };
    gGame.isOn = true;
    
            hello.play();
    init(gLevel, gGame);
}
function chooseLevelHard() {
    document.body.style.backgroundImage = "url('css/img/borat1.jpg')";
    gLevel = {
        Size: 8,
        Mines: 12,
    };
    hello.play();
    gGame.isOn = true;
    init(gLevel, gGame);
}
function chooseLevelExtreme() {
    document.body.style.backgroundImage = "url('css/img/borat1.jpg')";
    gLevel = {
        Size: 12,
        Mines: 30,
    };
    hello.play();
    gGame.isOn = true;
    init(gLevel, gGame);
}
function init(gLevel) {
    
    gGame.isOn = true;
    gBoard = buildBoard(gLevel);
    renderBoard(gBoard);
}



function checkIfVictory() {
    var cellsShown = 0;
    var markedForGood = 0;
    var matSize = (gLevel.Size * gLevel.Size);
    console.log(matSize);
    console.log(matSize, 'this was matsize');
    console.table(gBoard);
    console.log('glevel', gLevel);
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j];
            if (cell.isMarked === true && cell.isMine === true) markedForGood++;
            if (cell.isShown === true) cellsShown++;
          
        }
    }
    console.log(cellsShown, ':cells showmn');

    console.log(markedForGood, 'marked');
    if (cellsShown === matSize && markedForGood === gLevel.Mines) {
        alert('Great Success');
        var gSuccess=new Audio('sound/great sucesses.wav');
        gSuccess.play();
        gGame.isOn = false;
        ResetGlobalVariables();
    }
}
function buildBoard(gLevel) {
    var board = [];
    //var mines = g.Level.mines;
    var length = gLevel.Size;
    for (var i = 0; i < length; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.Size; j++) {
            board[i][j] = { minesAroundCount: null, isShown: false, isMine: false, isMarked: false };
        }
    }
    console.table(board);
    setMines(board, gLevel);
    for (var k = 0; k < gLevel.Size; k++) {
        for (var l = 0; l < gLevel.Size; l++) {
            board[k][l].minesAroundCount = checkNeibs(k, l, board);
        }
    }
    return board;
}
function setMines(board, gLevel) {
    var countMines = 0;
    var biggerNumber = (gLevel.Size * gLevel.Size);
    while (countMines < gLevel.Mines) {
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if ((getRandomInt(0, biggerNumber)) < gLevel.Mines) {
                    board[i][j].isMine = true;
                    countMines++;
                    if (countMines === gLevel.Mines) return;
                }
            }
        }
    }
    return board;
}
function getRandomInt(num1, num2) {
    var max = (num1 > num2) ? num1 : num2;
    var min = (num2 > num1) ? num1 : num2;
    return (Math.floor(Math.random() * (max - min)) + min);
}
//render without icons inside
function renderBoard(board) {//render without icons inside
    var elBoard = document.querySelector('.board')
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j];
            //var signStr
            //var cellClass = getClassName({i:i, j:j})
            currCell.id = gNextId++;
            console.log('point', currCell, 'id= ', currCell.id);
            var className = 'cell cell' + i + '-' + j;
            if (currCell.isMine === true) {
                strHTML += '\t<td class="' + className + '" id="' + currCell.id + '" onclick="cellClicked(' + currCell.id + ',' + i + ',' + j + ')" oncontextmenu="cellMarked(' + currCell.id + ',' + i + ',' + j + ')">' + "🕎" + '</td>';
                // + gMine
            }
            else if (currCell.isMine === false) {
                strHTML += '\t<td class="' + className + '" id="' + currCell.id + '" onclick="cellClicked(' + currCell.id + ',' + i + ',' + j + ')" oncontextmenu="cellMarked(' + currCell.id + ',' + i + ',' + j + ')">' + currCell.minesAroundCount + '</td>';
            }
            console.log('this is currcell', currCell);
            console.log('this id is', currCell.id);
            //var elCell = document.querySelector('.cell');
            console.table('board during loop', board);

            //signStr+= '💥';

        }
        strHTML += '</tr>\n';
    }
    console.table('before numbers: ', board);
    elBoard.innerHTML = strHTML;
}
function checkNeibs(cellI, cellJ, mat) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (mat[i][j].isMine === true) neighborsSum++;
        }
    }
    return neighborsSum;
}
function cellClicked(id, i, j) {
    if (gGame.isOn != true) return;
    var elCell = document.getElementById(id);
    console.log('before:', gBoard[i][j]);
    revealMines(elCell, i, j);
    if (gBoard[i][j].isMine === true) gameOver();
    //check neighbors
    if (gBoard[i][j].minesAroundCount === 0) {
        expandShown(gBoard, i, j);
         checkIfVictory();
    }
}
function expandShown(board, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gLevel.Size) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gLevel.Size) continue;
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].isMine === false) {
                //    if (board[i][j].minesAroundCount === 0) { expandShown(board, i, j); }
                var currId = board[i][j].id;
                var elCell = document.getElementById(currId)
                revealMines(elCell, i, j);
                //     if (board[i][j].minesAroundCount != 0) { 
                //         continue;
                //     }
                //     else {expandShown(board, i, j);}
            }
        }
    }
}
function cellMarked(id, i, j,) {
    if (gGame.isOn != true) return;
    var elCell = document.getElementById(id);
    console.log('before:', gBoard[i][j]);
    elCell.innerText = '🇰🇿';
    gBoard[i][j].isMarked = true;
    gBoard[i][j].isShown = true;
    console.log(elCell);
    revealMines(elCell, i, j);
    console.log('after:', gBoard[i][j]);
    gGame.markedCount++;
    checkIfVictory();

}


function revealMines(elCell, i, j) {
    // var elCell = document.getElementById(id);
    elCell.style.textAlign = "center";
    elCell.style.textIndent = "0";
    gBoard[i][j].isShown = true;
    gGame.shownCount++;

}

function getCellById(id) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var thisCell = gBoard[i][j];
            if (thisCell.id === id) return thisCell;
        }
        return null;
    }
}
function gameOver() {
    gGame.isOn = false
    console.log('Game Over');
    ResetGlobalVariables();
    revealAllBoard();
    var elBody=document.getElementById('#bod');
    document.body.style.backgroundImage = "url('css/img/3.jpg')";
    alert('Borat was taken by the jews...');

}

function revealAllBoard() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            gBoard[i][j].isShown = true;
            revealMines(elCell,i,j);
            var currId = gBoard[i][j].id;
            var elCell = document.getElementById(currId);
            revealMines(elCell,i,j);
            elCell.style.textAlign = "center";
            elCell.style.textIndent = "0";
        }
    }
}
function ResetGlobalVariables() {
    //list of all the variables with original attributes here
    gBoard = [];

    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gNextId = 0;
}