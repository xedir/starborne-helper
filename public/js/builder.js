function build(value) {

    switch (value) {

        case 'buildMF': {

            const hex = grid.get(0);

            var candidate = grid[0];
            var highscore = 0;

            grid.forEach(element => {
                if (!element.hasRss && !element.station && element.claimed) {
                    var count = 0;
                    var harvest = grid.hexesInRange(element, 1, false);

                    harvest.forEach(hex => {

                            hex.metal ? count=count+hex.metal : count+0;
                            hex.gas ? count=count+hex.gas : count+0;
                            hex.crystal ? count=count+hex.crystal : count+0;
                            hex.labor ? count=count+hex.labor : count+0;
                        
                    })
                    if (count > highscore) {
                        highscore = count;
                        candidate = element;
                    }

                }
            })

            candidate.building = 'mf';
            candidate.yield = highscore;
            candidate.drawHex();

        }
            break;


    }

}