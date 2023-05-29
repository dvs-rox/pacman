'use strict'

const GHOST = '👻'
var gGhosts
const GHOSTCOLORS = ['🔵', '🔴', '🟠', '🟡', '🟢', '🟣', '🟤']
var gCurrentGhostCount = 0
var gIntervalGhosts
var gGraveyard = []

function createGhost(board) {
    var ghost = {
        id: makeId(),
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        icon: GHOSTCOLORS[getRandomIntInclusive(0, GHOSTCOLORS.length - 1)]
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
    gCurrentGhostCount++
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = []
    gCurrentGhostCount = 0
    for (var i = gCurrentGhostCount; i < 3; i++) {
        createGhost(board)
    }
    // console.log('gGhosts:', gGhosts)

    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // console.log('ghost.location:', ghost.location)
    const moveDiff = getMoveDiff()
    // console.log('moveDiff:', moveDiff)

    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation:', nextLocation)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell:', nextCell)

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    // hitting a pacman? call gameOver
    if (nextCell === PACMAN && !gIsPowerful) {
        gameOver()
        return
    }

    // moving from current location:
    // update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location:
    // update the model (save cell contents)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost.icon))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    if (gIsPowerful) ghost = '🟦'
    return `<span>${ghost}</span>`
}
function onEaten(cell) {


    var ghostIdx = gGhosts.findIndex((ghost) => {
        return ghost.location.i === cell.i && ghost.location.j === cell.j
    })
    console.log('ghost :', ghostIdx)
    gGraveyard.push(gGhosts.splice(ghostIdx, 1)[0])
    console.log(gGraveyard)
    gCurrentGhostCount--
}
function revive() {
    // debugger
    console.log(gGraveyard)
    var length = gGraveyard.length
    for (var i = 0; i < length; i++) {
        gGhosts.push(gGraveyard.pop())
        gCurrentGhostCount++
    }
}