let wheat = 0;
let bread = 0;

function harvestWheat(number) {
    wheat += number;

    if (wheat > 0) {
        document.getElementById('wheat').innerHTML = "wheat: " + Math.floor(wheat);
    }
}

function bakeBread(number) {   

    if (bread >= 20 * number) {
        wheat -= 20 * number;
        bread += number;

        if (bread > 0){
            document.getElementById('bread').innerHTML = "bread: " + Math.floor(bread);
        }
    }
    
    document.getElementById('wheat').innerHTML = "wheat: " + Math.floor(wheat);
}