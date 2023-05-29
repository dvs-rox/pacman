'use strict'

const CHERRY = '🍒'

var gCherryInterval

function initCherries(){
    gCherryInterval = setInterval(() => {
        addCherry()
    }, 10000);
}

function addCherry(){
    var location = getRandomEmptyLocation()
    if(!location) return
    gBoard[location.i][location.j] = CHERRY
    renderCell(location,CHERRY)
}

function getRandomEmptyLocation() {
    var emptyLocations = []

    for (var i = 0; i < gBoard.length; i++){
        for(var j =0; j<gBoard[0].length; j++){
            if(gBoard[i][j]===EMPTY){
                emptyLocations.push({i,j})
            }
        }
    }

    console.log('emptyLocations :', emptyLocations)
    if(emptyLocations.length!=0)return emptyLocations[getRandomIntInclusive(0,emptyLocations.length-1)]
    return
}