'use strict';

// var gBoard =
//     [
//         { minesAroundCount: 4, isShown: false, isMine: false, isMarked: false }, { minesAroundCount: 4, isShown: false, isMine: false, isMarked: false }, { minesAroundCount: 4, isShown: false, isMine: false, isMarked: false }, { minesAroundCount: 4, isShown: false, isMine: false, isMarked: false },
//     ]
var gBoard = [];
var gMine = '💥';
var gGame = {
    isOn: false,
    shownCount: 0, markedCount: 0, secsPassed: 0
}
var gLevel = {
    Size: 4,
    Mines: 2,
};
//easy: size:4,mines:2.
//hard: size:8, mines:12.\
//extreme12, mines:30


// gBoard=[
// [1,2,3,4,5,6],
// [1,2,3,4,5,5],
// [,1,2,3,34,4]
// ];
// easy1 = [{}];
// easy2 = [];
// easy3 = [];
// easy4 = [];
// easy5 = [];
// hard1 = [];
// hard2 = [];
// hard3 = [];
// hard4 = [];
// hard5 = [];
// extreme1 = [];
// extreme2 = [];
// extreme3 = [];
// extreme4 = [];
// extreme5 = [];
//document.querySelector('body').
//ther player chooses a level and amap number, which will be enterd to play and then renderl
// function renderBoard(board) {
//     var elBoard = document.querySelector('.board'); var strHTML = '';
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>\n';
//         for (var j = 0; j < board[0].length; j++) {
//             var currCell = board[i][j];
//             var cellClass = 'cell-' + i + '-' + j + ' ';
//             strHTML += '\t<td class="cell ' + cellClass +
//                 '" onclick="moveTo(' + i + ',' + j + ')" >\n';

//             strHTML += currCell;
//             strHTML += '\t</td>\n';
//         }
//         strHTML += '</tr>\n';
//     }
//     elBoard.innerHTML = strHTML;
// }
//Step1 – the seed app:
//1. Create a 4x4 gBoard Matrix containing Objects. Place 2 mines manually when each cell’s isShown set to true.
//2. Present the mines using renderBoard() function.
// function createBoard(size) {
//     var board = [];
//     for (var i = 1; i <= size; i++) {
//         for (var j = 1; j <= size; J++) {
//             board[i][j] =
//         }

//     }
// }
function init() {
    gBoard = buildBoard(gLevel);
    renderBoard(gBoard);
}
//buildBoard();
function buildBoard(gLevel) {
    var board = [];
    //var mines = g.Level.mines;
    var length = gLevel.Size;
    for (var i = 0; i < length; i++) {
        board[i] = [];
        //var row = length[i];
        for (var j = 0; j < gLevel.Size; j++) {
            //    if (([i] === 1 && [j] === 1)||([i] === 3 && [j] === 2)) board[i][j] = { minesAroundCount: 5, isShown: true, isMine: true, isMarked: false };
            //var mine = (getRandomInt(0, gLevel.mines) > 1) ? true : false
            //  else if ([i] === 3 && [j] === 2) board[i][j] = { minesAroundCount: 5, isShown: true, isMine: true, isMarked: false };

            board[i][j] = { minesAroundCount: null, isShown: false, isMine: false, isMarked: false };
        }
    }

    // board[0][0] = {minesAroundCount: checkMinesAround([i][j]), isShown: true, isMine: false, isMarked: false}
    console.table(board);
    setMines(board, gLevel);
    for (var k = 0; k < gLevel.Size; k++) {
        for (var l = 0; l < gLevel.Size; l++) {
          board[k][l].minesAroundCount= checkNeibs(k, l, board);
        }
    }
    return board;
}
function setMines(board, gLevel, countMines) {
    var countMines = 0;
    var biggerNumber = (gLevel.Size * gLevel.Size);
    while (countMines < gLevel.Mines) {
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if ((getRandomInt(0, biggerNumber)) < gLevel.Mines) {
                    board[i][j].isMine = true;
                    countMines++;
                    //if(countMines===gLevel.Mines)return;
                }
            }
        }
    }
    return board;
}
// function setMines(board, gLevel,countMines) {
//     //var countMines = 0;
//     var biggerNumber = (gLevel.Size * gLevel.Size);
//     //while (countMines < gLevel.Mines) {
//         for (var i = 0; i < board.length; i++) {
//             for (var j = 0; j < board[i].length; j++) {
//                 if ((getRandomInt(0, biggerNumber)) < gLevel.Mines) {
//                     board[i][j].isMine = true;
//                     countMines++;
//                     //if(countMines===gLevel.Mines)return;
//                 }
//             }
//         }
//    // }
//    return countMines; 
// }
function getRandomInt(num1, num2) {
    var max = (num1 > num2) ? num1 : num2;
    var min = (num2 > num1) ? num1 : num2;
    return (Math.floor(Math.random() * (max - min)) + min);
}

function renderBoard(board) {
    var elBoard = document.querySelector('.board')
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j];
            var elCell=document.querySelector('.board');
            //var signStr
            //var cellClass = getClassName({i:i, j:j})
            if (currCell.isMine === true) {
                strHTML += '\t<td class="cell" onclick="cellClicked(elCell, i, j)"> ' + gMine + '</td>';
                console.table('board during loop', board);
            }
            //signStr+= '💥';
            else if (currCell.isMine === false) strHTML += '\t<td class="cell" onclick="cellClicked(elCell, i, j)"> ' + currCell.minesAroundCount + '</td>';
        }
        strHTML += '</tr>\n';
    }
    console.table('before numbers: ', board);




    elBoard.innerHTML = strHTML;
}
// function renderBoard() {
//     var board=buildBoard();
//     var elBoard = document.querySelector('.board'); var strHTML = '';
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>\n';
//         for (var j = 0; j < board[0].length; j++) {
//             var currCell = board[i][j];
//             var cellClass = 'cell-' + i + '-' + j + ' ';
//             strHTML += '\t<td class="cell ' + cellClass +
//                 '" onclick="moveTo(' + i + ',' + j + ')" >\n';

//             strHTML += currCell;
//             strHTML += '\t</td>\n';
//         }
//         strHTML += '</tr>\n';
//     }
//     elBoard.innerHTML = strHTML;
// }

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
// function cellClicked(elCell, i, j) {
// if elCell.minesAroundCount
// }
