let selectedRss = 'none'

function rssSelect(value) {
    selectedRss = value;
    console.log(value);
}

window['map'].addEventListener('click', (event) => {
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;
    leftClick(offsetX, offsetY);
  });

window['map'].addEventListener('contextmenu', (event) => {
    event.preventDefault();
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;
    rightClick(offsetX, offsetY);
});


function rightClick(offsetX, offsetY){
    const hexCoordinates = Grid.pointToHex([offsetX, offsetY]);
    const hex = grid.get(hexCoordinates);

    var hexString = ("Hex stats: \n metal: " + hex.metal + "\n gas: " + hex.gas + "\n crystal: " + hex.crystal + "\n labor: " + hex.labor + "\n station: " + hex.station + "\n claimed:" + hex.claimed + "\n building:" + hex.building+ "\n yield:" + hex.yield);

    //console.log
    document.getElementById("p1").innerHTML = hexString;

}

function leftClick(offsetX, offsetY){
    const hexCoordinates = Grid.pointToHex([offsetX, offsetY])
    const hex = grid.get(hexCoordinates)

    if (hex) {
        switch (selectedRss) {
            case 'metal': {
                if (!hex.metal) {
                    hex.metal = 0;
                    hex.hasRss = true;
                }
                hex.metal++;
                hex.drawRssColor('grey');
                hex.drawNumbers();
            }
                break;
            case 'gas': {
                if (!hex.gas) {
                    hex.gas = 0;
                    hex.hasRss = true;
                }
                hex.gas++;
                hex.drawRssColor('blue');
            }
                break;
            case 'crystal': {
                if (!hex.crystal) {
                    hex.crystal = 0;
                    hex.hasRss = true;
                }
                hex.crystal++;
                hex.drawRssColor('green');
            }
                break;
            case 'labor': {
                if (!hex.labor) {
                    hex.labor = 0;
                    hex.hasRss = true;
                }
                hex.labor++;
                hex.drawRssColor('red');
            }
                break;
            case 'station': {
                if (!hex.station) {
                    hex.station = true;
                    hex.metal = 0;
                    hex.gas = 0;
                    hex.crystal = 0;
                    hex.labor = 0;
                }
                hex.station = true;
                hex.drawRssColor('black')
                var hexes = grid.hexesInRange(hex, 4, true);
                hexes.forEach(element => {
                    element.claimed = true
                    if (!element.metal && !element.gas && !element.crystal && !element.labor && !element.station && !element.yield) {
                        element.drawClaim()
                    }
                })
            }
                break;
            default:
                console.log('no rss selected');
        }


        // const hexes = grid.hexesInRange(hex, 2, false)
        // hexes.forEach(element => element.highlight())


        // rssFields.metal.forEach(element => element.drawRssColor());
        // console.log(rssFields.metal[rssFields.metal.length-1])
    }

}

