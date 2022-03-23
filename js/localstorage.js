// saving function (localstorage), fires every minute + can be fired manually (button)

function saveGame(){
    
    let gameSave = {
        resources: resources,
        resourcesPerSec: resourcesPerSec,
        storage: storage,
        population: population,
        buildings: buildings,
        equipment: equipment,
        prices: prices,
        hidden: hidden,
        rates: rates
    }

    localStorage.setItem('gameSaveData', JSON.stringify(gameSave))
}

// loading function - fires at window.onload

function loadGame(){
    
    let savedGame = JSON.parse(localStorage.getItem('gameSaveData'))

    if(typeof savedGame.resources !== undefined) resources = savedGame.resources
    if(typeof savedGame.storage !== undefined) storage = savedGame.storage
    if(typeof savedGame.population !== undefined) population = savedGame.population
    if(typeof savedGame.resourcesPerSec !== undefined) resourcesPerSec = savedGame.resourcesPerSec
    if(typeof savedGame.buildings !== undefined) buildings = savedGame.buildings
    if(typeof savedGame.equipment !== undefined) equipment = savedGame.equipment
    if(typeof savedGame.prices !== undefined) prices = savedGame.prices
    if(typeof savedGame.hidden !== undefined) hidden = savedGame.hidden
    if(typeof savedGame.rates !== undefined) rates = savedGame.rates

    updateNumbers();    
    updatePrices();
}


function resetGame(){

    if(window.confirm("Do you really want to reset the game? Your progress will be lost.")){
        
        localStorage.clear()
        location.reload()
    }           
}