const draw = SVG().addTo('#map').size('100%', '100%')
const Hex = Honeycomb.extendHex({
    size: 30,

    render(draw) {
        const {x, y} = this.toPoint()
        const corners = this.corners()

        this.draw = draw
            .polygon(corners.map(({x, y}) => `${x},${y}`))
            .fill('none')
            .stroke({width: 1, color: '#999'})
            .translate(x, y)
    },

    highlight() {
        this.draw
            // stop running animation
            .fill({opacity: 0.2, color: 'aquamarine'})
            .animate(1000)
            .fill({opacity: 0, color: 'none'})
    },

    drawRssColor(value) {
        this.draw
            .fill({opacity: 0.4, color: value});
    },

    drawNumbers(value){
        const position = this.toPoint()
        const centerPosition = this.center().add(position)
        this.draw = draw;
        
        fontSize = 12;

        this.draw
        .plain(`${this.metal ? this.metal : 0},${this.gas ? this.gas : 0},${this.crystal ? this.crystal : 0},${this.labor ? this.labor : 0}`)
        .font({
            size: fontSize,
            anchor: 'middle',
            leading: 1.4,
            fill: '#69c'
        })
        .translate(position.x + 25 , position.y - fontSize + 45 ).build(false)
    },

    drawClaim() {
        this.draw
            .fill({opacity: 1, color: 'lightblue'})

    },

    removeColor() {
        this.draw
            .fill('none')
    },


})


const Grid = Honeycomb.defineGrid(Hex)

const grid = Grid.hexagon({
    radius: 5,
    center: [5,5],
    // render each hex, passing the draw instance
    onCreate(hex) {
        hex.render(draw)
    }
})
