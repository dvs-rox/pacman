'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWERFOOD = '*'

const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gIsPowerful = false

function onInit() {
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard)
    initCherries()
    document.querySelector('.modal').style.visibility = 'hidden'
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            if (i === 1 && j === 1 || i === 1 && j === size - 2
                || j === 1 && i === size - 2 ||j===size-2&& i===size-2) {
                board[i][j] = POWERFOOD
            }
        }
    }
    console.log('board:', board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    renderCell(gPacman.location, EMPTY)
    var score = countVictoryScore(gBoard)
    if (score === 0) {
        document.querySelector('.modal').style.visibility = 'visible'
        document.querySelector('.modal span').innerText = `Victory! Your score is: ${gGame.score}`
    } else {
        document.querySelector('.modal').style.visibility = 'visible'
        document.querySelector('.modal span').innerText = `Game over! Your score is: ${gGame.score}`
    }
}
function onPowerFood(){
    gIsPowerful = true
    setTimeout(() => {
        gIsPowerful = false
        revive()
    }, 5000);
}