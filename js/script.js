
///////////////////////////////////////////
//////////DOM Initializations/////////////////
//////////////////////////////////////////
//we need to get our canvas, save it to a varible, so we can access and utilize it 
const game = document.getElementById('canvas')
//here we'll get the movement tracker
const moveDisplay = document.getElementById('movement')

//now w e need to get the game's context so we can dd to it , draw on it, create animations etc
//we do this with the built in canvas method, get Context
const ctx = game.getContext('2d')
////////////////////////////////////////
///////////Functions needed before/////////
///////////declaring universal variables/////
/////////////////////////////////////////

//get the math in a function that can reassaign or return the xTip and yTip for a given arrow
const angleToX = (angle, radius) => {
    let x = ( radius * Math.sin(angle *  0.0174532925) ) + 150
    console.log('angleToX: x= ', x)
    return x
}
const angleToY = (angle, radius) => {
    radius
    let y = radius * Math.cos(angle * 0.0174532925) + 149
    console.log('angleToY: y= ' + y)
    return y
}

///////////////////////////////////////////
//////////Universal Variables/////////////////
//////////////////////////////////////////
const theBow = new Bow(8, (game.width / 2), (game.height - 16), 
    (game.width / 2), (game.height - 28), 
    ((game.width/ 2) + 8), (game.height - (16)),
    ((game.width / 2) - 8), (game.height - (16))
)
const firstArrowXy= [(game.width / 2), (game.height - 1), (game.width / 2), (game.height - 28)]
console.log(firstArrowXy)
let loadedArrow =  new Arrow(firstArrowXy[0],firstArrowXy[1], 180)
let arrow225 = new Arrow (firstArrowXy[0], firstArrowXy[1], 225)
let arrow270 = new Arrow (firstArrowXy[0], firstArrowXy[1], 270)
let testTarget = new Target(40, 40)
let firedArrows = []


/////TESTING TESTING TESTING 123////


///////////////////////////////////////////
//////////Functions//////////////////////////
//////////////////////////////////////////

/////////////////////////////////
//draw bow
/////////////////////////////////
const drawCurve = (radius, x, y) => {
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI, true)
    ctx.strokeStyle = "blueviolet"
    ctx.stroke()
    ctx.fillStyle = "blueviolet"
    ctx.fill()
    ctx.closePath()

}

const drawArrowLine = (x, y) => {
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo((game.width / 2), (game.height - 1))
    ctx.lineTo(x, y)
    ctx.strokeStyle = "blueviolet"
    ctx.stroke()
    ctx.closePath()
}

const drawRightString = (x, y) => {
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo((game.width / 2), (game.height - 1))
    ctx.lineTo(x, y)
    ctx.strokeStyle = "black"
    ctx.stroke()
    ctx.closePath()
}

const drawLeftString = (x, y) => {
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo((game.width / 2), (game.height - 1))
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.closePath()
}

//call prior functions to put the bow together 
const drawBow = (radius, xCenter, yCenter, xTip, yTip, xRight, yRight, xLeft, yLeft) => {
    console.log(`xTip = ${xTip}\n yTip = ${yTip}\n xCenter = ${xCenter}\n yCenter = ${yCenter}`)
    console.log(`Bottom x = ${game.width / 2}\n Bottom y = ${game.height - 1}`)
    //draw bow curve
    drawCurve(radius, xCenter, yCenter)
    //draw arrow line on bow
    drawArrowLine(xTip, yTip)
    //right string
    drawRightString(xRight, yRight)
    //left string
    drawLeftString(xLeft, yLeft)
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
arrow.radius += 5
arrow.xTip = angleToX(arrow.angle, arrow.radius)
arrow.yTip = angleToY(arrow.angle, arrow.radius)
arrow.xBase = angleToX(arrow.angle, (arrow.radius - 27))
arrow.yBase = angleToY(arrow.angle, arrow.radius -27)
console.log('new arrow coOrds:' + arrow.xBase + arrow.yBase + arrow.xTip + arrow.yTip)
arrow.render()
}



const arrowTrafficControl = () => {
    for (let i = 0; i < firedArrows.length; i++ ) {
        if (firedArrows[i].yBase < 0 || firedArrows[i].yBase < 0) {
        
        } else {
            arrowThruster(firedArrows[i])
        }
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
function Bow (radius, xCenter, yCenter, xTip, yTip, xRight, yRight, xLeft, yLeft) {
    this.radius = radius
    this.xCenter = xCenter
    this.yCenter = yCenter
    this.xTip = xTip
    this.yTip = yTip
    this.xRight = xRight
    this.yRight = yRight
    this.xLeft = xLeft
    this.yLeft = yLeft
    this.render = function () {
        drawBow(radius, xCenter, yCenter, xTip, yTip, xRight, yRight, xLeft, yLeft)
    }
}

//Class for generating new targets
function Target (x, y) {
    this.x = x
    this.y = y
    //then declare same type of render method
    this.render = function () {
        drawTarget(x, y)
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
    //then declare same type of render method
    this.render = function () {
        drawArrow(this.xBase, this.yBase, this.xTip, this.yTip)
    }
}


/////////////////////////////////
////////Movement handler/////////
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

////////////////////////
//////////Game Loop
///////////////////////
const gameLoop = () => {
    //clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
    //re-draw Target
    testTarget.render()
    //re-draw Bow
    drawBow(theBow.radius, theBow.xCenter, theBow.yCenter, theBow.xTip, theBow.yTip, theBow.xRight, theBow.yRight, theBow.xLeft, theBow.yLeft)
    // theBow.render()
    //render arrows
    drawArrow(loadedArrow.xBase, loadedArrow.yBase, loadedArrow.xTip, loadedArrow.yTip)
    //test arrows
    // arrow225.render()
    // arrow270.render()           
    //move fired arrows
    arrowTrafficControl()
    //render targets
    testTarget.render()
}

/////////////////////
/////Event Listeners
///////////////////
window.addEventListener('DOMContentLoaded', (e) => {
    console.log("Hello HTML")
    //create and render arrows
    loadedArrow.render()
    // arrow225.render()
    // arrow270.render()
    //load other objs
    theBow.render()
    testTarget.render()
    let gameInterval = setInterval(gameLoop, 70)
})

document.addEventListener('keyup', spaceBarHandler)
document.addEventListener('keydown', leftRightHandler)

///////TO DO's
///////ensure new arrows render correctly according to bow position
    //incoproate angle into the Arrow class so new arrows can folow the path (or they get it from the
    //current state of loaded Arrow)

//detect a tip-bullseye collision
//make targets move
////////ensure tip-bullseye collisions are detected on moving targets!

//increment player 1 points when bullseye detected
//set a timer to switch player turns after 30 secons
//highlight the point counter of the player who's up
//implement a start button for the beginning of each turn
//set a winning threshold at which poin the game stops
//display the winning message (+refresh to replay)

/////////^^^^^^^^//////////////////
/////MVP will be achieved when above steps are complete!////
/////////////////////////////////////////

//unlisted and simple STRETCH Goals
//implement a 'Play again' button with the winning message
//display a timer counting down each players turn
//display message telling the player their turn is up
