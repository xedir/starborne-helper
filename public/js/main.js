const app = new PIXI.Application({ transparent: true, antialias: true })
const graphics = new PIXI.Graphics()




const Hex = Honeycomb.extendHex({ 
    size: 30,
    resources: '',
    status:'',

    render() {
        const point = this.toPoint()
        // add the hex's position to each of its corner points
        const corners = this.corners().map(corner => corner.add(point))
        // separate the first from the other corners
        const [firstCorner, ...otherCorners] = corners
    
        // move the "pencil" to the first corner
        graphics.moveTo(firstCorner.x, firstCorner.y)
        // draw lines to the other corners
        otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y))
        // finish at the first corner
        graphics.lineTo(firstCorner.x, firstCorner.y)
    
        app.stage.addChild(graphics)

    },

    drawRssColor(value){

        this.resources
            .setTransform(this.toPoint().x + 5, this.toPoint().y + 15, 0.5, 0.5)
            .setText(`${this.metal ? this.metal : 0},${this.gas ? this.gas : 0},${this.crystal ? this.crystal : 0},${this.labor ? this.labor : 0}`)
        
        app.stage.addChild(this.resources);

    },

    drawBuilding(){
        this.status
            .setTransform(this.toPoint().x + 10, this.toPoint().y + 35, 0.45, 0.45)
            .setText(`${this.building ? this.building + ' ' : ''  + this.yield ? this.yield : ''}`)
    
        app.stage.addChild(this.status);
    },

    drawStatus(){
        this.status
            .setTransform(this.toPoint().x + 20, this.toPoint().y + 35, 0.5, 0.5)
            .setText(`${this.claimed ? 'C' : ''}`)
        
        app.stage.addChild(this.status);
    },

    drawHex(){
        if(this.metal || this.gas || this.crystal || this.labor){ this.drawRssColor()}
        if(this.status){this.drawStatus()}
        if(this.building){this.drawBuilding()}
    },

    toJSON(){
        var returnObject ={}
        returnObject.metal = this.metal;
        returnObject.gas = this.gas;
        returnObject.crystal = this.crystal;
        returnObject.labor = this.labor;
        returnObject.station = this.station;
        returnObject.claimed = this.claimed;
        returnObject.building = this.building;
        returnObject.yield = this.yield;
        
        
        return returnObject;
        
    }



})

const Grid = Honeycomb.defineGrid(Hex)

document.getElementById('map').appendChild(app.view)
// set a line style of 1px wide and color #999
graphics.lineStyle(2, 0x999999)

const grid = Grid.hexagon({
    radius: 5,
    center: [5,5],
    // render each hex, passing the draw instance
    onCreate(hex) {
        hex.render()
        hex.resources = new PIXI.Text("");
        hex.status = new PIXI.Text("");

    }
})

function loadGrid(){
    var newGrid = document.getElementById("myText").value;
    const newDeserializedGrid = JSON.parse(newGrid)

    for (i = 0; i < grid.length; i++) {
        var obj = newDeserializedGrid[i]


        if(obj.metal || obj.gas || obj.crystal || obj.labor || obj.claimed || obj.station || obj.building){

            if(obj.building)  grid[i].building=obj.building
            if(obj.metal)  grid[i].metal=obj.metal
            if(obj.gas)  grid[i].gas=obj.gas
            if(obj.crystal)  grid[i].crystal=obj.crystal
            if(obj.labor)  grid[i].labor=obj.labor
            if(obj.claimed)  grid[i].claimed=obj.claimed
            if(obj.station)  grid[i].station=obj.station
            if(obj.yield)  grid[i].yield=obj.yield

            
        }
        grid[i].drawHex()
        
      }

    console.log(newDeserializedGrid);
    console.log(newDeserializedGrid[0].metal);

    
    
}

function exportGrid(){

    const exportGrid = grid;

    const newSerializedGrid = JSON.stringify(exportGrid);
    //JSON.stringify(grid);
    document.getElementById("exportText").innerHTML = newSerializedGrid;

}
