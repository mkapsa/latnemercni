let wheat = 0;

function harvestWheat(number) {
    wheat += number;

    if (wheat > 0) {
        document.getElementById('wheat').innerHTML = "wheat: " + Math.floor(wheat);
    }
}