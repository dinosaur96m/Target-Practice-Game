
//we need to get our canvas, save it to a varible, so we can access and utilize it 
const game = document.getElementById('canvas')
//here we'll get the movement tracker
const moveDisplay = document.getElementById('movement')

//now w e need to get the game's context so we can dd to it , draw on it, create animations etc
//we do this with the built in canvas method, get Context
const ctx = game.getContext('2d')
///////////////////////
//render bow and arrow
///////////////////////
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
    ctx.lineWidth = 2
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
//////////////////
///////////////
////////////
const drawShaft = () => {

}

const drawFeathers = () => {

}

const drawHead = () => {

}
const drawArrow = () => {
    drawShaft()
    drawFeathers()
    drawHead()
}



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
    drawBow(8)
})


