
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
///////////////////////////////////////////
//////////Universal Variables/////////////////
//////////////////////////////////////////
const theBow = new Bow(8, (game.width / 2), (game.height - 16), 
    (game.width / 2), (game.height - 28), 
    ((game.width/ 2) + 8), (game.height - (16)),
    ((game.width / 2) - 8), (game.height - (16))
)
const testTarget = new Target(40, 40)
const loadedArrowXy= [(game.width / 2), (game.height - 1), (game.width / 2), (game.height - 28)]
console.log(loadedArrowXy)
const loadedArrow =  new Arrow(loadedArrowXy[0],loadedArrowXy[1],loadedArrowXy[2], loadedArrowXy[3])
let firedArrows = []

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
    ctx.strokeStyle = "#652A0E"
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
    drawHead(xTip,yTip)
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
const arrowTrafficControl = () => {
    for (let i = 0; i < firedArrows.length; i++ ) {
        if (firedArrows[i].yBase < 0 || firedArrows[i].yBase < 0) {
        
        } else {
            firedArrows[i].yBase -= 5
            firedArrows[i].yTip -= 5
            console.log(`drawing arrow from (${firedArrows[i].xBase}, ${firedArrows[i].yBase}) to (${firedArrows[i].xTip}, ${firedArrows[i].yTip})`)
            drawArrow(firedArrows[i].xBase, firedArrows[i].yBase, firedArrows[i].xTip, firedArrows[i].yTip)   
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
function Arrow (xBase, yBase, xTip, yTip) {
    this.xBase = xBase
    this.yBase = yBase
    this.xTip = xTip
    this.yTip = yTip
    //then declare same type of render method
    this.render = function () {
        drawArrow(xBase, yBase, xTip, yTip)
    }
}


/////////////////////////////////
////////Movement handler/////////
////////////////////////////////
const spaceBarHandler = (e) => {
    if (e.keyCode === 32) {
        console.log('space bar released!')
        //generate a new arrow with Arrow class
        firedArrows[`${firedArrows.length}`] = new Arrow(loadedArrowXy[0],loadedArrowXy[1],loadedArrowXy[2], loadedArrowXy[3])
        let index = firedArrows.length - 1
        //move the newly fired arrow forward on its journey
        firedArrows[`${index}`].yBase -= 5
        firedArrows[`${index}`].yTip -= 5
        console.log('new arrow coOrds:' + firedArrows[index].xBase + firedArrows[index].yBase + firedArrows[index].xTip + firedArrows[index].yTip)
        drawArrow(firedArrows[index].xBase, firedArrows[index].yBase, firedArrows[index].xTip, firedArrows[index].yTip)
    }
    }

const leftRightHandler = (e) => {
    switch (e.keyCode) {
        case (81):
            console.log('Q detected!')
            //move Left
            theBow.xCenter--
            theBow.yCenter++
            theBow.xTip--
            theBow.yTip++
            theBow.xRight--
            theBow.yRight++
            theBow.xLeft--
            theBow.yLeft++
            break
        case (69):
            console.log('E detected!')
            //move Right
            theBow.xCenter++
            theBow.yCenter++
            theBow.xTip++
            theBow.yTip++
            theBow.xRight++
            theBow.yRight++
            theBow.xLeft++
            theBow.yLeft++
            break
    }
}

//////////Game Loop///////////////
const gameLoop = () => {
    //clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
    //re-draw Target
    testTarget.render()
    //re-draw Bow
    drawBow(theBow.radius, theBow.xCenter, theBow.yCenter, theBow.xTip, theBow.yTip, theBow.xRight, theBow.yRight, theBow.xLeft, theBow.yLeft)
    // theBow.render()
    //render arrows
    loadedArrow.render()             
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
    //render initial board
    theBow.render()
    loadedArrow.render()
    testTarget.render()
    let gameInterval = setInterval(gameLoop, 70)

})

document.addEventListener('keyup', spaceBarHandler)
document.addEventListener('keydown', leftRightHandler)


///////TO DO's
//make bow roatate on 180 axis
///////ensure new arrows render correctly according to bow position

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
