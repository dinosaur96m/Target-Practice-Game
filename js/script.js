///////////////////////////////////////////
//////////DOM Initializations/////////////////
//////////////////////////////////////////

//access the canvas
const game = document.getElementById('canvas')
//get context
const ctx = game.getContext('2d')
//Player Points Displays
const p1Title = document.getElementById("p1")
const p2Title = document.getElementById("p2")
const p1pointsDisplay = document.getElementById("p1points")
const p2pointsDisplay = document.getElementById("p2points")
const p1Box = document.getElementById("p1-btm-left")
const p2Box = document.getElementById("p2-btm-right")
//Replay Button
const replayButton = document.getElementById("replayButton")
//Start button area
const startButton = document.getElementById("startButton")
const buttonSub = document.getElementById("buttonSub")
const buttonBox = document.getElementById("top-right")
//Top Left, Clock
let clock = document.getElementById("clock")
let title = document.getElementById("title")
//+1
const plusOne = new Image(10, 10);
plusOne.src = "css/yellowOne2.png"
plusOne.style.display = "none"
document.querySelector('body').appendChild(plusOne)
let displayedOnes = []

////////////////////////////////////////
///////////Functions needed before/////////
///////////declaring universal variables/////
/////////////////////////////////////////

//find x and y coordinates for an arrow's endpoints, given their angle
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
let targets = [new Target(40, -23), new Target(110, -38), new Target(210, -60), new Target(260, -90)]
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
//game logic
let isP1up = true
let gameInterval
let turnInterval
let countDownInterval
let timer = 29


///////////////////////////////////////////
//////////Functions//////////////////////////
//////////////////////////////////////////

/////////////////////
/////Draw Bow/////////
/////////////////////

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
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(xBase, yBase)
    ctx.lineTo(xTip, yTip)
    ctx.strokeStyle = "black"
    ctx.stroke()
    ctx.closePath()
}

//call prior funcitons to put arrow together
//drawHead() elimated, not refactoring in order to focus on 
//game functionality and appearance
const drawArrow = (xBase, yBase, xTip, yTip) => {
    drawShaft(xBase, yBase, xTip, yTip)
}

//////////////////
//Draw Targets
////////////

//draw bulseye with red border
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

//draw blue cirlce with white border to complete target appearance
const drawBlue = (x, y) => {
    ctx.lineWidth = 10
    ctx.beginPath()
    ctx.arc(x,y, 15, 0, Math.PI * 2, true)
    ctx.strokeStyle = "white"
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

//move arrows along the correct path
const arrowThruster = (arrow) => {
    //winning arrows should fall with their targets until off-canvas
    if (arrow.isBullseye === true) {
        arrow.yBase++
        arrow.yTip++
        arrow.render()
    //all other arrows on canvas should follow their angle five more pixels
    } else if (arrow.isBullseye === false) {
        arrow.radius += 5
        arrow.xTip = angleToX(arrow.angle, arrow.radius)
        arrow.yTip = angleToY(arrow.angle, arrow.radius)
        arrow.xBase = angleToX(arrow.angle, (arrow.radius - 27))
        arrow.yBase = angleToY(arrow.angle, arrow.radius -27)
        arrow.render()
    }
}

//filter out off-canvas arrows and then move all the others 
const arrowTrafficControl = () => {
    for (let i = 0; i < firedArrows.length; i++ ) {
        if (firedArrows[i].yBase < 0 || firedArrows[i].xBase < 0 || firedArrows[i].yTip > game.height) {
        
        } else {
            arrowThruster(firedArrows[i])
        }
    }
}

//move target coordinates down the canvas
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

//fire an arrow when space bar is released
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

//move bow to the left or right using "q" and "e" keys
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
                //don't let loadedArrow move off the page
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
                //don't let loadedArrow move off the page
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

//reset the screen to window-load state
const freshScreen = () => {
    //clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
    //re-center loaded arrow
    loadedArrow.xBase = firstArrowXy[0]
    loadedArrow.yBase = firstArrowXy[1]
    loadedArrow.angle = 180
    loadedArrow.xTip = firstArrowXy[2]
    loadedArrow.yTip = firstArrowXy[3]
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
    targets[0].y = -23
    targets[1].x = 110
    targets[1].y = -38
    targets[2].x = 210
    targets[2].y = -60
    targets[3].x = 260
    targets[3].y = -90
    //re-center Bow
    theBow.centerAngle = 180
    theBow.rightAngle = 154
    theBow.leftAngle = 207
    //render bow
    theBow.render()
    //render loaded arrow
    drawArrow(firstArrowXy[0], firstArrowXy[1], firstArrowXy[2], firstArrowXy[3])
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
        buttonBox.style.backgroundColor = "#FF006E"
        buttonSub.style.fontSize = "xx-large"
        buttonSub.innerText = `${player.name} is the winner!`
        //display 'play again' button
        p1Title.style.display = "none"
        p1pointsDisplay.style.display = "none"
        p1Box.style.backgroundColor = "#6AA84F"
        p2Box.style.backgroundColor = "#6AA84F"
        replayButton.style.display = "block"
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
    let instance = [(target.x + 20), (target.y - 5 ), 10, 10]
    displayedOnes.push(instance)
    //draw instance
    let index = displayedOnes.length - 1
    ctx.drawImage(plusOne, displayedOnes[index][0], displayedOnes[index][1], displayedOnes[index][2], displayedOnes[index][3])
    //set interval to make it disappear
    let splicer = () => {
        displayedOnes.splice((displayedOnes.length - 1), 1)
    }
    setTimeout(splicer, 500)
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
                    animateBullseye(targets[j], j)
                    checkForWinner(playerOne)
                //give points to 2 if it's their turn
                } else if (playerOne.isUp === false) {
                    firedArrows[i].isBullseye = true
                    playerTwo.points++
                    p2pointsDisplay.innerText = playerTwo.points
                    console.log("playerTwo has " + playerTwo.points)
                    animateBullseye(targets[j], j)
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
        p1Box.style.backgroundColor = "#6AA84F"
        p2Box.style.backgroundColor = "#FF006E"
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
        p1Box.style.backgroundColor = "#FF006E"
        p2Box.style.backgroundColor = "#6AA84F"
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
    if (displayedOnes.length >= 1){ 
        for (let i = 0; i < displayedOnes.length; i++) {
            console.log("displyaed ones at " + i + " " + displayedOnes[i])
            ctx.drawImage(plusOne, displayedOnes[i][0], displayedOnes[i][1], displayedOnes[i][2], displayedOnes[i][3])
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
    theBow.render()
    loadedArrow.render()
    console.log(theBow.curveRadius)
    //load other objs
})

//listen for key events to move and fire bow
document.addEventListener("keyup", spaceBarHandler)
document.addEventListener("keydown", leftRightHandler)

//begin the current player's turn
startButton.addEventListener("click", (e) => {
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

replayButton.addEventListener("click", (e) => {
    //clear all fired arrows from array
    firedArrows.splice(0, firedArrows.length)
    //reset players
    playerOne.points = 0
    playerTwo.points = 0
    p1pointsDisplay.innerText = "0"
    p2pointsDisplay.innerText = "0"
    playerTwo.isWinner = false
    playerOne.isWinner = false
    playerOne.isUp = false
    //fresh screen
    switchTurns()
    freshScreen
    //p1 Box
    replayButton.style.display = "none"
    p1Title.style.display = "block"
    p1pointsDisplay.style.display = "block"
    //button box
     //startButton Box
    buttonBox.style.backgroundColor = "#6AA84F"
    buttonSub.innerText = "First to 15 points wins!"
} )
