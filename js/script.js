
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
//Top Left, Clock
let clock = document.getElementById("clock")
let title = document.getElementById("title")
//+1
const plusOne = new Image(10, 10);
plusOne.src = "css/plusOne.png"
// plusOne.style.display = "none"
document.querySelector('body').appendChild(plusOne)
// const plusOne = document.getElementById("pluseOne")
let displayedOnes = []




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
//bow
let theBow = new Bow(8, 180, 154, 207)
let startAngle
let endAngle

//arrows
const firstArrowXy= [(game.width / 2), (game.height - 1), (game.width / 2), (game.height - 28)]
console.log(firstArrowXy)
let loadedArrow =  new Arrow(firstArrowXy[0],firstArrowXy[1], 180)
let firedArrows = []
//targets
let targets = [new Target(40, -15), new Target(110, -30), new Target(210, -60), new Target(260, -90)]
//players
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
let turnInterval
let countDownInterval
let timer = 29


/////TESTING TESTING TESTING 123////


///////////////////////////////////////////
//////////Functions//////////////////////////
//////////////////////////////////////////

///////////////////////////////
// /draw bow
///////////////////////////////
    const drawCurve = (curveRadius, centerAngle, rightAngle, leftAngle) => {
        //get coordinates for center of cricle
        let x = angleToX(centerAngle, 15)
        let y = angleToY(centerAngle, 15)
        //draw circle
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(x, y, curveRadius,  (0 * 0.0174532925),  (360 * 0.0174532925), true)
        ctx.strokeStyle = "blueviolet"
        ctx.stroke()
        ctx.fillStyle = "blueviolet"
        ctx.fill()
        ctx.closePath()
    
    }

const drawRightString = (angle) => {
    let x = angleToX(angle, 18)
    let y = angleToY(angle, 18)
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo((game.width / 2), (game.height - 1))
    ctx.lineTo(x, y)
    ctx.strokeStyle = "black"
    ctx.stroke()
    ctx.closePath()
}

const drawLeftString = (angle) => {
    let x = angleToX(angle, 18)
    let y = angleToY(angle, 18)
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo((game.width / 2), (game.height - 1))
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.closePath()
}

//call prior functions to put the bow together 
    const drawBow = (curveRadius, centerAngle, rightAngle, leftAngle) => {
        //draw bow curve
        drawCurve(curveRadius, centerAngle, rightAngle, leftAngle)
        //right string
        drawRightString(rightAngle)
        //left string
        drawLeftString(leftAngle)
    }

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

// const drawHead = (xTip,yTip) => {
//     ctx.lineWidth = 1
//     ctx.beginPath()
//     //draw a triangle
//     ctx.moveTo(xTip, yTip - 2)
//     ctx.lineTo((xTip + 2), (yTip + 2))
//     ctx.lineTo((xTip - 2), (yTip + 2))
//     ctx.strokeStyle = "black"
//     ctx.stroke()
//     ctx.fillStyle = "black"
//     ctx.fill()
//     ctx.closePath()
// }

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
}

///////////////////////////////////////////
//////////CLASSES//////////////////////////
//////////////////////////////////////////

// building the bow
function Bow (curveRadius, centerAngle, rightAngle, leftAngle) {
    this.curveRadius = curveRadius
    this.centerAngle = centerAngle
    this.rightAngle = rightAngle
    this.leftAngle = leftAngle
    this.render = function () {
        drawBow(this.curveRadius, this.centerAngle, this.rightAngle, this.leftAngle)
    }
}


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

////////////////////////////////
///////Track Moving Objects
///////////////////////////////
// shift every arrow on the board 5 pixels along its given path
const arrowThruster = (arrow) => {
    if (arrow.isBullseye === true) {
        arrow.yBase++
        arrow.yTip++
        arrow.render()
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
        if (firedArrows[i].yBase < 0 || firedArrows[i].xBase < 0 || firedArrows[i].yTip > game.height) {
        
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

/////////////////////////////////
////////Event handlers/////////
////////////////////////////////
const spaceBarHandler = (e) => {
    //only react to keyup when a turn is being played
    if (startButton.style.display === "none") {
        if (e.keyCode === 32) {
            console.log('space bar released!')
            //generate a new arrow with Arrow class
            firedArrows[`${firedArrows.length}`] = new Arrow(firstArrowXy[0],firstArrowXy[1], loadedArrow.angle)
            let index = firedArrows.length - 1
            //move the newly fired arrow forward on its journey
            arrowThruster(firedArrows[index])
            console.log(`loadedArrow angle is: ${loadedArrow.angle}`)
            }
    //dont react to keyup if a turn is not being played
    } else if (startButton.style.display === "block") {

    }
}

const leftRightHandler = (e) => {
    if (startButton.style.display === "none") {
        switch (e.keyCode) {
            case (81):
                console.log('Q detected!')
                //move Left
                //move arrow
                loadedArrow.angle+= 5
                loadedArrow.xTip = angleToX(loadedArrow.angle, loadedArrow.radius)
                loadedArrow.yTip = angleToY(loadedArrow.angle, loadedArrow.radius)
                //move bow
                theBow.centerAngle +=5
                theBow.rightAngle +=5
                theBow.leftAngle += 5
                if (loadedArrow.angle >= 270) {
                    //arrow boundary
                    loadedArrow.angle = 270
                    loadedArrow.xTip = angleToX(270, loadedArrow.radius)
                    loadedArrow.yTip = angleToY(270, loadedArrow.radius)
                    //bow boundary
                    theBow.centerAngle = 270
                    theBow.rightAngle = 270 - 26
                    theBow.leftAngle = 270 + 26
                }
                break
            case (69):
                console.log('E detected!')
                //move Right
                //move arrow
                loadedArrow.angle-= 5
                loadedArrow.xTip = angleToX(loadedArrow.angle, loadedArrow.radius)
                loadedArrow.yTip = angleToY(loadedArrow.angle, loadedArrow.radius)
                //move bow
                theBow.centerAngle -=5
                theBow.rightAngle -=5
                theBow.leftAngle -=5
                if (loadedArrow.angle <= 90 ) {
                    //arrow boundary
                    loadedArrow.angle = 90
                    loadedArrow.xTip = angleToX(90, loadedArrow.radius)
                    loadedArrow.yTip = angleToY(90, loadedArrow.radius)
                    //bow boundary
                    theBow.centerAngle = 90
                    theBow.rightAngle = 90 - 26
                    theBow.leftAngle = 90 + 26
                } 
                break
        }
    } else if (startButton.style.display === "block") {

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
        if (firedArrows[i].isBullseye === true) {
            firedArrows[i].yBase = -100
            firedArrows[i].yTip = -100
        } else {
            firedArrows[i].radius = 550
        }
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
    theBow.centerAngle = 180
    theBow.rightAngle = 154
    theBow.leftAngle = 207
    // ctx.drawImage(bowPic, (150 - (loadedArrow.radius / 2 + 20)), (game.height - 35), (loadedArrow.radius * 2.5), (loadedArrow.radius * 2.5))
    //render loaded arrow
    drawArrow(firstArrowXy[0], firstArrowXy[1], firstArrowXy[2], firstArrowXy[3])
    //render bow
    theBow.render()
    //render targets
    for (let i = 0; i < targets.length; i++)
    {
        targets[i].render()
    }
    //bring back button
    buttonSub.style.display = "none" 
    startButton.style.display = "block"
}

const checkForWinner = (player) => {
    if (player.points >= 15) {
        //give player winning status
        player.isWinner = true
        console.log(player.name + "is the winner!")
        //stop game loop and turn countdown
        clearInterval(gameInterval)
        clearInterval(turnInterval)
        clearInterval(countDownInterval)
        //display winning message
        buttonSub.innerText = `${player.name} is the winner!`
        p1pointsDisplay.innerText = "Refresh to play again!"
        //reset the screen
        freshScreen()
        startButton.style.display = "none"
        buttonSub.style.display = "block"
        clock.style.display = "none"
        clock.innerText = ":29"
        timer = 29
        title.style.display = "block"
    }
}

const animateBullseye = (target) => {
    //store drawing parameters in an array to be re-drawn by game loop
    let instance = [plusOne, (target.x + 20), (target.y - 5 ), 10, 10]
    displayedOnes.push(instance)
    //draw instance
    ctx.drawImage(plusOne, displayedOnes[0][1], displayedOnes[0][2], displayedOnes[0][3], displayedOnes[0][4])
    //set interval to make it disappear
    setTimeout(displayedOnes.pop, 3000)
}

const bullsEyeDetector = () => {
    //check every arrow
    for (let i = 0; i < firedArrows.length; i++) {
        //filter out already-winning arrows
        if (firedArrows[i].isBullseye === true) {
        
        } else {
            //in relation to every target
            for (let j = 0; j < targets.length; j++) {
                //is the arrow withing the bullseye (a saquare that fits inside)?
                if (firedArrows[i].xTip < (targets[j].x + 3.54) && 
                    firedArrows[i].xTip > (targets[j].x - 3.54) &&
                    firedArrows[i].yTip < (targets[j].y + 3.54) &&
                    firedArrows[i].yTip > (targets[j].y - 3.54)
                //give points to P1 if it's their turn
                ) { if (playerOne.isUp === true) {
                    firedArrows[i].isBullseye = true
                    playerOne.points++
                    p1pointsDisplay.innerText = playerOne.points
                    console.log("playerOne has " + playerOne.points)
                    animateBullseye(targets[j])
                    checkForWinner(playerOne)
                //give points to 2 if it's their turn
                } else if (playerOne.isUp === false) {
                    firedArrows[i].isBullseye = true
                    playerTwo.points++
                    p2pointsDisplay.innerText = playerTwo.points
                    console.log("playerTwo has " + playerTwo.points)
                    animateBullseye(targets[j])
                    checkForWinner(playerTwo)
                    }
                }
            }
        }
    }
}

const countDown = () => {
    if (timer > 0) {
        clock.innerText = `:${timer}`
        timer--
    } else if (timer === 0) {
        timer = 29
        clearInterval(countDownInterval)
    }

}

const switchTurns = () => {
    if (playerOne.isUp === true) {
        //stop game loop and turn countdown
        clearInterval(gameInterval)
        clearInterval(turnInterval)
        //switch two player two's turn
        p1Box.style.backgroundColor = "whitesmoke"
        p2Box.style.backgroundColor = "#00DCDC"
        playerOne.isUp = false
        console.log("player 2 is up now!")
        //swap clock for title
        clock.style.display = "none"
        title.style.display = "block"
        //enable start button
        startButton.disabled = false
        //reset canvas
        freshScreen()
    } else if (playerOne.isUp === false) {
        //stop game loop and turn countdown
        clearInterval(gameInterval)
        clearInterval(turnInterval)
        //switch to player one's turn
        p1Box.style.backgroundColor = "#00DCDC"
        p2Box.style.backgroundColor = "whitesmoke"
        playerOne.isUp = true
        console.log("player 1's Turn now!")
        //swap clock for title
        clock.style.display = "none"
        title.style.display = "block"
        startButton.disabled = false
        //reset canvas
        freshScreen()
    }
}

const gameLoop = () => {
    //clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
    //re-draw Bow
    theBow.render()
    // ctx.drawImage(bowPic, (150 - (loadedArrow.radius / 2 + 20)), (game.height - 35), (loadedArrow.radius * 2.5), (loadedArrow.radius * 2.5))
    //render targets
    targetPusher()
    for (let i = 0; i < targets.length; i++)
    {
        targets[i].render()
    }
    //render plusOnes
    if (displayedOnes.length >= 1) {
        for (let i = 0; i < displayedOnes.length; i++) {
            ctx.drawImage(plusOne, displayedOnes[i][1], displayedOnes[i][2], displayedOnes[i][3], displayedOnes[i][4])
        }
    }
    //render loaded arrow
    drawArrow(loadedArrow.xBase, loadedArrow.yBase, loadedArrow.xTip, loadedArrow.yTip)     
    //move and render fired arrows
    arrowTrafficControl()
    //check bullseye and win conditions
    bullsEyeDetector()
}

///////////////////////
/////Event Listeners/////
/////////////////////
window.addEventListener('DOMContentLoaded', (e) => {
    console.log("Hello HTML")
    //create and render arrows
    loadedArrow.render()
    theBow.render()
    console.log(theBow.curveRadius)
    //load other objs
})

document.addEventListener('keyup', spaceBarHandler)
document.addEventListener('keydown', leftRightHandler)
// bowPic.addEventListener('load', e => {
//     ctx.drawImage(bowPic, (150 - (loadedArrow.radius / 2 + 13)), (game.height - 28), (loadedArrow.radius * 2), (loadedArrow.radius * 2))
// })
startButton.addEventListener('click', (e) => {
    console.log("R2P clicked!")
    //make sure the screen is clear 
    freshScreen()
    //start the game loop
    gameInterval = setInterval(gameLoop, 70)
    //begin tracking turns
    turnInterval = setInterval(switchTurns, 30000)
    //replace title with clock
    timer = 29
    clock.innerText = `:${timer}`
    countDownInterval = setInterval(countDown, 1000)
    title.style.display = "none"
    clock.style.display = "block"
    //replace start button
    startButton.disabled = true
    startButton.style.display = "none"
    buttonSub.style.display = "block"
})


///////TO DO's



/////////^^^^^^^^//////////////////
/////MVP will be achieved when above steps are complete!////
/////////////////////////////////////////

////////////////////////////////////
//unlisted and simple STRETCH Goals
//////////////////////////////////
//implement a 'Play again' button with the winning message
//display message telling the player their turn is up
