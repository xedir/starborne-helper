function build(value) {

    var range=document.getElementById("range").innerHTML;

    switch (value) {

        case 'buildMF': {

            const hex = grid.get(0);

            var candidate = grid[0];
            var highscore = 0;

            grid.forEach(element => {
                if (!element.hasRss && !element.station && element.claimed) {
                    var count = 0;
                    var harvest = grid.hexesInRange(element, 3, false);
                    harvest.forEach(hex => {
                        if(hex.metal){count=count+hex.metal}
                        if(hex.gas){count=count+hex.gas}
                        if(hex.crystal) {count=count+hex.crystal}
                        if(hex.labor){count=count+hex.labor}
                    })
                    if (count >= highscore) {
                        highscore = count;
                        candidate = element;
                        console.log(highscore);
                    }

                }
            })
            console.log(range);
            candidate.building = 'mf';
            candidate.yield = highscore;
            candidate.drawHex();

        }
        break;

        case 'buildHD': {
            const hex = grid.get(0);

            var candidate = grid[0];
            var highscore = 0;

            grid.forEach(element => {
                if (!element.hasRss && !element.station && element.claimed) {
                    var count = 0;
                    var harvest = grid.hexesInRange(element, 4, false);

                    harvest.forEach(hex => {
                            hex.labor ? count=count+hex.labor : count+0;
                        
                    })
                    if (count > highscore) {
                        highscore = count;
                        candidate = element;
                    }

                }
            })

            candidate.building = 'HD';
            candidate.yield = highscore;
            candidate.drawHex();


        }
        break;


    }

}