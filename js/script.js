///////////////////////////////////////////
//////////Universal Variables/////////////////
//////////////////////////////////////////


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
//////////Functions//////////////////////////
//////////////////////////////////////////

/////////////////////////////////
//draw bow
/////////////////////////////////
const drawCurve = (radius) => {
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc((game.width / 2), (game.height - (radius * 2)), radius, 0, Math.PI, true)
    ctx.strokeStyle = "blueviolet"
    ctx.stroke()
    ctx.fillStyle = "blueviolet"
    ctx.fill()
    ctx.closePath()

}

const drawArrowLine = (radius) => {
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo((game.width / 2), (game.height - 1))
    ctx.lineTo((game.width / 2), (game.height - (radius * 3.5)))
    ctx.strokeStyle = "blueviolet"
    ctx.stroke()
    ctx.closePath()
}

const drawRightString = (radius) => {
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo((game.width / 2), (game.height - 1))
    ctx.lineTo(((game.width / 2) + radius ), (game.height - (radius *2)))
    ctx.strokeStyle = "black"
    ctx.stroke()
    ctx.closePath()
}

const drawLeftString = (radius) => {
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo((game.width / 2), (game.height - 1))
    ctx.lineTo(((game.width / 2) - radius), (game.height - (radius * 2)))
    ctx.stroke()
    ctx.closePath()
}

//call prior functions to put the bow together 
const drawBow = (radius) => {
    //draw bow curve
    drawCurve(radius)
    //draw arrow line on bow
    drawArrowLine(radius)
    //right string
    drawRightString(radius)
    //left string
    drawLeftString(radius)
}
///////////////////////////
////Draw Arrows
///////////////////////////
const drawShaft = (xBase, yBase, xTip, yTip) => {
    console.log(`drawing shaft from (${xBase}, ${yBase}) to (${xTip}, ${yTip})`)
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(xBase, yBase)
    ctx.lineTo(xTip, yTip)
    ctx.strokeStyle = "#652A0E"
    ctx.stroke()
    ctx.closePath()
}

const drawHead = (xTip,yTip) => {
    console.log("drawing head")
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


///////////////////////////////////////////
//////////CLASSES//////////////////////////
//////////////////////////////////////////

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


window.addEventListener('DOMContentLoaded', (e) => {
    console.log("Hello HTML")
    //render bow
    drawBow(8)
    //render arrow
    const loadedArrow =  new Arrow((game.width / 2), (game.height - 1), (game.width / 2), (game.height - 28))
    loadedArrow.render()
    const testTarget = new Target(40, 40)
    testTarget.render()
})


