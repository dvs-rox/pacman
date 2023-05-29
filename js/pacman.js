'use strict'

const PACMAN = getPacmanHTML()
var gPacman
var gDirectionClass
function createPacman(board) {
    gPacman = {
        location: {
            i: 7,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev)
    console.log('nextLocation:', nextLocation)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost? call gameOver
    if (countVictoryScore(gBoard) === 0 || nextCell === GHOST) {
        if (gIsPowerful) {
            onEaten(nextLocation)
        } else {
            gameOver()
            return
        }
    }
    if (nextCell === FOOD) {
        updateScore(1)
    }
    if (nextCell === CHERRY) {
        updateScore(10)
    }
    if (nextCell === POWERFOOD && !gIsPowerful) {
        onPowerFood()
    }
    else if (nextCell === POWERFOOD) {
        return
    }
    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, getPacmanHTML())
    getRandomEmptyLocation()
}
function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // console.log('eventKeyboard.code:', eventKeyboard.code)
    // debugger
    var elPacman = document.getElementById("pacman")
    console.log(elPacman.className)
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            gDirectionClass = 'up'
            break
        case 'ArrowDown':
            nextLocation.i++
            gDirectionClass = 'down'
            break
        case 'ArrowRight':
            nextLocation.j++
            gDirectionClass = 'right'
            break
        case 'ArrowLeft':
            nextLocation.j--
            gDirectionClass = 'left'
            break
        default: return null
    }

    return nextLocation
}
function countVictoryScore(board) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === FOOD) {
                count++
            }
        }
    }
    return count
}
function getPacmanHTML() {
    var elPacman = document.querySelector('.pacman img')
    return `<span ><img style="width:30px;height:30px;" class="${gDirectionClass}" id="pacman" src="img/pacman.png"></span>`
}