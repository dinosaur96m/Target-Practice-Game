
//we need to get our canvas, save it to a varible, so we can access and utilize it 
const game = document.getElementById('canvas')
//here we'll get the movement tracker
const moveDisplay = document.getElementById('movement')

//now w e need to get the game's context so we can dd to it , draw on it, create animations etc
//we do this with the built in canvas method, get Context

const ctx = game.getContext('2d')
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
const drawArrow = (xBase, yBase, xTip, yTip) => {
    drawShaft(xBase, yBase, xTip, yTip)
    drawHead(xTip,yTip)
}
//////////////////
///////////////
////////////


//rules for rendering
function arrow (x, y, color, width, height) {
    this.x = x
    this.y = y 
    this.color = color
    this.width = width
    this.height = height
    //then declare same type of render method
    this.render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}


window.addEventListener('DOMContentLoaded', (e) => {
    console.log("Hello HTML")
    //render bow
    drawBow(8)
    //render arrow
    drawArrow((game.width / 2), (game.height - 1), (game.width / 2), (game.height - 28))
})


