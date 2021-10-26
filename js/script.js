
///////////////////////////////////////////
//////////DOM Initializations/////////////////
//////////////////////////////////////////
//we need to get our canvas, save it to a varible, so we can access and utilize it 
const game = document.getElementById('canvas')
//get context
const ctx = game.getContext('2d')
//add bow image
const bowPic = new Image(27, 27);
bowPic.src = "css/arhcers_bow.png"
//Player Points Displays
const p1pointsDisplay = document.getElementById("p1points")
const p2pointsDisplay = document.getElementById("p2points")
const p1Box = document.getElementById("p1-btm-left")
const p2Box = document.getElementById("p2-btm-right")
//Start button area
const startButton = document.getElementById("startButton")
const buttonSub = document.getElementById("buttonSub")

////////////////////////////////////////
///////////Functions needed before/////////
///////////declaring universal variables/////
/////////////////////////////////////////

//get the math in a function that can reassaign or return the xTip and yTip for a given arrow
const angleToX = (angle, radius) => {
    let x = ( radius * Math.sin(angle *  0.0174532925) ) + 150
    return x
}
const angleToY = (angle, radius) => {
    radius
    let y = radius * Math.cos(angle * 0.0174532925) + 149
    return y
}

///////////////////////////////////////////
//////////Universal Variables/////////////////
//////////////////////////////////////////
// const theBow = new Bow(8, (game.width / 2), (game.height - 16), 
//     (game.width / 2), (game.height - 28), 
//     ((game.width/ 2) + 8), (game.height - (16)),
//     ((game.width / 2) - 8), (game.height - (16))
// )
const firstArrowXy= [(game.width / 2), (game.height - 1), (game.width / 2), (game.height - 28)]
console.log(firstArrowXy)
let loadedArrow =  new Arrow(firstArrowXy[0],firstArrowXy[1], 180)
let firedArrows = []
let targets = [new Target(40, -15), new Target(110, -30), new Target(210, -60), new Target(260, -90)]
let playerOne = {
    name: "Player 1",
    isUp: true,
    points: 0,
    isWinner: false
}
let playerTwo = {
    name: "Player 2",
    points: 0,
    isWinner: false
}
let isP1up = true
let gameInterval


/////TESTING TESTING TESTING 123////


///////////////////////////////////////////
//////////Functions//////////////////////////
//////////////////////////////////////////

/////////////////////////////////
//draw bow
/////////////////////////////////
// const drawRightString = (x, y) => {
//     ctx.lineWidth = 1
//     ctx.beginPath()
//     ctx.moveTo((game.width / 2), (game.height - 1))
//     ctx.lineTo(x, y)
//     ctx.strokeStyle = "black"
//     ctx.stroke()
//     ctx.closePath()
// }

// const drawLeftString = (x, y) => {
//     ctx.lineWidth = 1
//     ctx.beginPath()
//     ctx.moveTo((game.width / 2), (game.height - 1))
//     ctx.lineTo(x, y)
//     ctx.stroke()
//     ctx.closePath()
// }

// //call prior functions to put the bow together 
// const drawBow = (xRight, yRight, xLeft, yLeft) => {
//     //right string
//     drawRightString(xRight, yRight)
//     //left string
//     drawLeftString(xLeft, yLeft)
// }
///////////////////////////
////Draw Arrows
///////////////////////////

const drawShaft = (xBase, yBase, xTip, yTip) => {
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(xBase, yBase)
    ctx.lineTo(xTip, yTip)
    ctx.strokeStyle = "black"
    // "#652A0E"
    ctx.stroke()
    ctx.closePath()
}

const drawHead = (xTip,yTip) => {
    ctx.lineWidth = 1
    ctx.beginPath()
    //draw a triangle
    ctx.moveTo(xTip, yTip - 2)
    ///////////^^^^^^^^^^^^^^//////////////////TRACK THE ABOVE COORDINATE for BULLSEYE
    ctx.lineTo((xTip + 2), (yTip + 2))
    ctx.lineTo((xTip - 2), (yTip + 2))
    ctx.strokeStyle = "black"
    ctx.stroke()
    ctx.fillStyle = "black"
    ctx.fill()
    ctx.closePath()
}

//call prior funcitons to put arrow together
const drawArrow = (xBase, yBase, xTip, yTip) => {
    drawShaft(xBase, yBase, xTip, yTip)
    // drawHead(xTip,yTip)
}
//////////////////
//Draw Targets
////////////
const drawYellow = (x,y) => {
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.arc(x,y, 5, 0, Math.PI * 2, true)
    ctx.strokeStyle = "red"
    ctx.stroke()
    ctx.fillStyle = "yellow"
    ctx.fill()
    ctx.closePath()
}

const drawBlue = (x, y) => {
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(x,y, 15, 0, Math.PI * 2, true)
    ctx.strokeStyle = "black"
    ctx.stroke()
    ctx.fillStyle = "blue"
    ctx.fill()
    ctx.closePath()
}

//call prior functions to put arrow together 
const drawTarget = (x, y) => {
    drawBlue(x, y)
    drawYellow(x, y)
/////^^^^^^^////////////////////////////////////////////Track Yellow for Bullseye!!
}

////////////////////////////////
///////Track Moving Objects
///////////////////////////////
// shift every arrow on the board 5 pixels along its given path
const arrowThruster = (arrow) => {
    if (arrow.isBullseye === true) {
        arrow.radius += 5
        arrow.xTip = angleToX(arrow.angle, arrow.radius)
        arrow.yTip = angleToY(arrow.angle, arrow.radius)
        arrow.xBase = angleToX(arrow.angle, (arrow.radius - 27))
        arrow.yBase = angleToY(arrow.angle, arrow.radius -27)
        //arrow not rendered but still moved so it doesnt earn another point 
    } else if (arrow.isBullseye === false) {
        arrow.radius += 5
        arrow.xTip = angleToX(arrow.angle, arrow.radius)
        arrow.yTip = angleToY(arrow.angle, arrow.radius)
        arrow.xBase = angleToX(arrow.angle, (arrow.radius - 27))
        arrow.yBase = angleToY(arrow.angle, arrow.radius -27)
        arrow.render()
}

}

const arrowTrafficControl = () => {
    for (let i = 0; i < firedArrows.length; i++ ) {
        if (firedArrows[i].yBase < 0 || firedArrows[i].yBase < 0) {
        
        } else {
            arrowThruster(firedArrows[i])
        }
    }
    }

const targetPusher = () => {
    for (let i = 0; i < targets.length; i++)
    if ((targets[i].y - 15) > game.height) {
        targets[i].y = -16
    } else {
        targets[i].y++
    }
}

///////////////////////////////////////////
//////////CLASSES//////////////////////////
//////////////////////////////////////////

//curve: ctx.arc((game.width / 2), (game.height - (radius * 2)), radius, 0, Math.PI, true)
//arrow line to: ((game.width / 2), (game.height - (radius * 3.5)))
//right string to: (((game.width / 2) + radius ), (game.height - (radius *2)))
//left string to: ((game.width / 2) - radius), (game.height - (radius * 2)))

//building the bow
// function Bow (xRight, yRight, xLeft, yLeft) {
//     this.xRight = xRight
//     this.yRight = yRight
//     this.xLeft = xLeft
//     this.yLeft = yLeft
//     this.render = function () {
//         drawBow(xRight, yRight, xLeft, yLeft)
//     }
// }

//Class for generating new targets
function Target (x, y) {
    this.x = x
    this.y = y
    //then declare same type of render method
    this.render = function () {
        drawTarget(this.x, this.y)
    }
}

//Class for generating new arrows
function Arrow (xBase, yBase, angle) {
    this.xBase = xBase
    this.yBase = yBase
    this.xTip = angleToX(angle, 27)
    this.yTip = angleToY(angle, 27)
    this.angle = angle
    this.radius = 27
    this.isBullseye = false
    //then declare same type of render method
    this.render = function () {
        drawArrow(this.xBase, this.yBase, this.xTip, this.yTip)
    }
}


/////////////////////////////////
////////Event handlers/////////
////////////////////////////////
const spaceBarHandler = (e) => {
    if (e.keyCode === 32) {
        console.log('space bar released!')
        //generate a new arrow with Arrow class
        firedArrows[`${firedArrows.length}`] = new Arrow(firstArrowXy[0],firstArrowXy[1], loadedArrow.angle)
        let index = firedArrows.length - 1
        //move the newly fired arrow forward on its journey
        arrowThruster(firedArrows[index])
        }
    }

const leftRightHandler = (e) => {
    switch (e.keyCode) {
        case (81):
            console.log('Q detected!')
            //move Left
            loadedArrow.angle+= 5
            loadedArrow.xTip = angleToX(loadedArrow.angle, loadedArrow.radius)
            loadedArrow.yTip = angleToY(loadedArrow.angle, loadedArrow.radius)
            if (loadedArrow.angle >= 270) {
                loadedArrow.angle = 270
                loadedArrow.xTip = angleToX(270, loadedArrow.radius)
                loadedArrow.yTip = angleToY(270, loadedArrow.radius)
            }
            break
        case (69):
            console.log('E detected!')
            //move Right
            loadedArrow.angle-= 5
            loadedArrow.xTip = angleToX(loadedArrow.angle, loadedArrow.radius)
            loadedArrow.yTip = angleToY(loadedArrow.angle, loadedArrow.radius)
            if (loadedArrow.angle <= 90 ) {
                loadedArrow.angle = 90
                loadedArrow.xTip = angleToX(90, loadedArrow.radius)
                loadedArrow.yTip = angleToY(90, loadedArrow.radius)
            } 
            break
    }
}

////////////////////////////
/////////Game Loop////////////
///////////////////////////
const freshScreen = () => {
    //clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
    //re-center loaded arrow
    loadedArrow.xBase = firstArrowXy[0]
    loadedArrow.yBase = firstArrowXy[1]
    loadedArrow.angle = 180
    //move fired arrows off board
    for (let i = 0; i < firedArrows.length; i++) {
        firedArrows[i].radius = 550
    }
    //re-set Targets
    targets[0].x = 40
    targets[0].y = -15
    targets[1].x = 110
    targets[1].y = -30
    targets[2].x = 210
    targets[2].y = -60
    targets[3].x = 260
    targets[3].y = -90
    //re-draw Bow
    ctx.drawImage(bowPic, (150 - (loadedArrow.radius / 2 + 20)), (game.height - 35), (loadedArrow.radius * 2.5), (loadedArrow.radius * 2.5))
    //render loaded arrow
    drawArrow(firstArrowXy[0], firstArrowXy[1], firstArrowXy[2], firstArrowXy[3])  
}
const checkForWinner = (player) => {
    if (player.points >= 10) {
        player.isWinner = true
        clearInterval(gameInterval)
        console.log(player.name + "is the winner!")
    }
}
const bullsEyeDetector = () => {
    //check every arrow
    for (let i = 0; i < firedArrows.length; i++) {
        //in relation to every target
        for (let j = 0; j < targets.length; j++) {
            //is the arrow withing the bullseye (a saquare that fits inside)?
            if (firedArrows[i].xTip < (targets[j].x + 3.54) && 
                firedArrows[i].xTip > (targets[j].x - 3.54) &&
                firedArrows[i].yTip < (targets[j].y + 3.54) &&
                firedArrows[i].yTip > (targets[j].y - 3.54)
            ) { if (playerOne.isUp === true) {
                firedArrows[i].isBullseye = true
                playerOne.points++
                p1pointsDisplay.innerText = playerOne.points
                console.log("playerOne has " + playerOne.points)
                checkForWinner(playerOne)
            } else if (playerOne.isUp === false) {
                firedArrows[i].isBullseye = true
                playerTwo.points++
                p2pointsDisplay.innerText = playerTwo.points
                console.log("playerTwo has " + playerTwo.points)
                checkForWinner(playerTwo)
                }
            }
        }
    }
}

const switchTurns = () => {
    if (playerOne.isUp === true) {
        clearInterval(gameInterval)
        clearInterval(turnInterval)
        p1Box.style.backgroundColor = "whitesmoke"
        p2Box.style.backgroundColor = "#00DCDC"
        playerOne.isUp = false
        console.log("player 2 is up now!")
        startButton.disabled = false
        freshScreen()
    } else if (playerOne.isUp === false) {
        clearInterval(gameInterval)
        clearInterval(turnInterval)
        p1Box.style.backgroundColor = "#00DCDC"
        p2Box.style.backgroundColor = "whitesmoke"
        playerOne.isUp = true
        console.log("player 1's Turn now!")
        startButton.disabled = false
        freshScreen()
    }
}

const gameLoop = () => {
    //clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
    //re-draw Bow
    ctx.drawImage(bowPic, (150 - (loadedArrow.radius / 2 + 20)), (game.height - 35), (loadedArrow.radius * 2.5), (loadedArrow.radius * 2.5))
    //render targets
    targetPusher()
    for (let i = 0; i < targets.length; i++)
    {
        targets[i].render()
    }
    //render loaded arrow
    drawArrow(loadedArrow.xBase, loadedArrow.yBase, loadedArrow.xTip, loadedArrow.yTip)     
    //move and render fired arrows
    arrowTrafficControl()
    //check bullseye and win conditions
    bullsEyeDetector()
}

/////////////////////
/////Event Listeners
///////////////////
window.addEventListener('DOMContentLoaded', (e) => {
    console.log("Hello HTML")
    //create and render arrows
    loadedArrow.render()
    //load other objs
})

document.addEventListener('keyup', spaceBarHandler)
document.addEventListener('keydown', leftRightHandler)
bowPic.addEventListener('load', e => {
    ctx.drawImage(bowPic, (150 - (loadedArrow.radius / 2 + 13)), (game.height - 28), (loadedArrow.radius * 2), (loadedArrow.radius * 2))
})
startButton.addEventListener('click', (e) => {
    console.log("R2P clicked!")
    gameInterval = setInterval(gameLoop, 70)
    turnInterval = setInterval(switchTurns, 30000)
    for (let i = 0; i < targets.length; i++)
    {
        targets[i].render()
    }
    startButton.disabled = true
})


///////TO DO's


//implement a start button for the beginning of each turn
//set a winning threshold at which poin the game stops
//display the winning message (+refresh to replay)

/////////^^^^^^^^//////////////////
/////MVP will be achieved when above steps are complete!////
/////////////////////////////////////////

////////////////////////////////////
//unlisted and simple STRETCH Goals
//////////////////////////////////
//make winning arrows fall with their target for the rest of a turn
//implement a 'Play again' button with the winning message
//display a timer counting down each players turn
//display message telling the player their turn is up
