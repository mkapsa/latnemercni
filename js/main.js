
resources = {
    food:0,
    wood:0,
    ore:0,
    iron:0,
    knowledge:0
}

resourcesPerSec = {
    food:0,
    wood:0,
    ore:0,
    iron:0,
    knowledge:0
}

storage = {
    food:100,
    wood:600,
    ore:300,
    iron:200,
    knowledge:200
}

population = {
    max:10,
    total:0,
    unemployed:0,
    hunters:0,
    woodcutters:0,
    miners:0,
    scientists:0
}

buildings = {
    pantry:0,
    barn:0,
    woodenhut:0,
    stonehut:0
}

equipment = {
    coldblastfurnace: {
        total:0,
        running:0
    }
}

prices = {

    // building prices

    pantry: {
        food:0,
        wood:300,
        ore:100,
        iron:0,
        knowledge:0
    },
    barn: {
        food:0,
        wood:400,
        ore:250,
        iron:0,
        knowledge:0
    },
    woodenhut: {
        food:0,
        wood:150,
        ore:50,
        iron:0,
        knowledge:0,
    },
    stonehut: {
        food:0,
        wood:200,
        ore:300,
        iron:0,
        knowledge:0
    },

    // upgrade prices

    stoneaxe: {
        food:0,
        wood:300,
        ore:300,
        iron:0,
        knowledge:100
    },

    metallurgy: {
        food:0,
        wood:0,
        ore:0,
        iron:0,
        knowledge:200
    },

    // equipment prices

    coldblastfurnace: {
        food:0,
        wood:0,
        ore:100,
        iron:0,
        knowledge:50
    }
}

hidden = {
    tiles:{
        equipment:false
    },
    upgrades: {
        stoneaxe:false,
        ironaxe:true
    },
    equipment: {
        coldblastfurnace: true
    }
}

rates = {
    hunterRate: 1,
    woodcutterRate: 0.5,
    minerRate: 0.3,
    scientistRate: 0.2,

    // equipment net rates

    coldblastfurnace: {
        wood:-1.5,
        ore:-1,
        iron:0.25
    }
}



//worker rate coefficients

hunterRate = 1
woodcutterRate = 0.5
minerRate = 0.3
scientistRate = 0.2



// price coefficients

const buildingCoefficient = 1.09;


// document.id & document.class shortcuts so i don't have to type it over and over

const byId = function(id){
    return document.getElementById(id);
}

const byClass = function(className){
    return document.getElementsByClassName(className);
}

function checkLocalStorage(){
    if(localStorage.length > 0){
        loadGame();
    }
    else{
        saveGame();
    }
}

window.onload = checkLocalStorage();
window.onload = updateNumbers();

function turnOffEquipment(){
    if((resourcesPerSec.wood < 0 && resources.wood === 0 ) || (resourcesPerSec.ore < 0 && resources.ore === 0) && equipment.coldblastfurnace.running > 0){
        equipment.coldblastfurnace.running -= 1;
        resourcesPerSec.wood -= rates.coldblastfurnace.wood
        resourcesPerSec.ore -= rates.coldblastfurnace.ore
        resourcesPerSec.iron -= rates.coldblastfurnace.iron
    }
}

function checkFood(){
    if(resourcesPerSec.food < 0 && resources.food === 0 && population.total >= 1){
        population.total -= 1;
        resourcesPerSec.food += 0.44;

        if(population.unemployed >= 1){
            population.unemployed -= 1;
        }
        else if(population.scientists >= 1){
            population.scientists -= 1;
            resourcesPerSec.knowledge -= 0.2;
        }
        else if(population.miners >= 1){
            population.miners -= 1;
            resourcesPerSec.ore -= 0.3;
        }
        else if(population.woodcutters >= 1){
            population.woodcutters -= 1
            resourcesPerSec.wood -= 0.5;
        }
        else if(population.hunters >= 1){
            population.hunters -= 1;
            resourcesPerSec.food -= 1;
        }        
    }
}

function updateFood(number){
    if(resources.food < storage.food){
        resources.food = Math.max(0, resources.food + number);
    }
    if(resources.food >= storage.food){
        resources.food = Math.min(storage.food, resources.food + number);
    }
}

function updateWood(number){
    if(resources.wood < storage.wood){
        resources.wood = Math.max(0, resources.wood + number);
    }
    if(resources.wood >= storage.wood){
        resources.wood = Math.min(storage.wood, resources.wood + number);
    }
}

function updateOre(number){
    if(resources.ore < storage.ore){
        resources.ore = Math.max(0, resources.ore + number);
    }  
    if(resources.ore >= storage.ore){
        resources.ore = Math.min(storage.ore, resources.ore + number);
    }
}

function updateIron(number){
    if(resources.iron < storage.iron){
        resources.iron = Math.max(0, resources.iron + number)
    }
    if(resources.iron >= storage.iron ){
        resources.iron = Math.min(storage.iron, resources.iron + number)
    }
}

function updateKnowledge(number){
    if(resources.knowledge < storage.knowledge){
        resources.knowledge = Math.max(0, resources.knowledge + number);
    }  
    if(resources.knowledge >= storage.knowledge){
        resources.knowledge = Math.min(storage.knowledge, resources.knowledge + number);
    }
}

function giveBirth(number){

    if (resources.food >= number * 20 && population.total < population.max){
        resources.food -= number * 20;
        population.total += number;
        population.unemployed += number;
        resourcesPerSec.food -= number * 0.44;

        document.getElementById("totalPopulation").innerHTML = Math.floor(population.total);
        document.getElementById("unemployedPopulation").innerHTML = Math.floor(population.unemployed);
        document.getElementById("food").innerHTML = Math.floor(resources.food);

    }
}

function hire(job, number){

    if (job === 'hunter' && population.unemployed >= number){
        population.unemployed -= number;
        population.hunters += number;
        resourcesPerSec.food += number * rates.hunterRate;

        document.getElementById("unemployedPopulation").innerHTML = Math.floor(population.unemployed);

            if (population.hunters === 1){
                document.getElementById("hunters").innerHTML = Math.floor(population.hunters) + " hunter";
            }
            else {
                document.getElementById("hunters").innerHTML = Math.floor(population.hunters) + " hunters";
            }
    }

    if (job === 'woodcutter' && population.unemployed >= number){
        population.unemployed -= number;
        population.woodcutters += number;
        resourcesPerSec.wood += rates.woodcutterRate * number;

        document.getElementById("unemployedPopulation").innerHTML = Math.floor(population.unemployed);

            if (population.woodcutters === 1){
                document.getElementById("woodcutters").innerHTML = Math.floor(population.woodcutters) + " woodcutter";
            }
            else {
                document.getElementById("woodcutters").innerHTML = Math.floor(population.woodcutters) + " woodcutters";
            }
        }

    if (job === 'miner' && population.unemployed >= number){
        population.unemployed -= number;
        population.miners += number;
        resourcesPerSec.ore += rates.minerRate * number;

        document.getElementById("unemployedPopulation").innerHTML = Math.floor(population.unemployed);

            if (population.miners === 1){
                document.getElementById("miners").innerHTML = Math.floor(population.miners) + " miner";
            }
            else {
                document.getElementById("miners").innerHTML = Math.floor(population.miners) + " miners";
            }
        }

    if (job === 'scientist' && population.unemployed >= number){
        population.unemployed -= number;
        population.scientists += number;
        resourcesPerSec.knowledge += rates.scientistRate * number;

        document.getElementById("unemployedPopulation").innerHTML = Math.floor(population.unemployed);

            if (population.scientists === 1){
                document.getElementById("scientists").innerHTML = Math.floor(population.scientists) + " scientist";
            }
            else {
                document.getElementById("scientists").innerHTML = Math.floor(population.scientists) + " scientists";
            }
        }
}
function fire(job, number){

    if (job == 'hunter' && population.hunters >= number){
        population.hunters -= number;
        population.unemployed += number;
        resourcesPerSec.food -= rates.hunterRate * number;

        document.getElementById('unemployedPopulation').innerHTML = Math.floor(population.unemployed);

        if (population.hunters === 1){
            document.getElementById("hunters").innerHTML = Math.floor(population.hunters) + " hunter";
        }
        else {
            document.getElementById("hunters").innerHTML = Math.floor(population.hunters) + " hunters";
        }
    }

    if (job === 'woodcutter' && population.woodcutters >= number){
        population.woodcutters -= number;
        population.unemployed += number;
        resourcesPerSec.wood -= rates.woodcutterRate * number;

        document.getElementById('unemployedPopulation').innerHTML = Math.floor(population.unemployed);

        if (population.woodcutters === 1){
            document.getElementById("woodcutters").innerHTML = Math.floor(population.woodcutters) + " woodcutter";
        }
        else {
            document.getElementById("woodcutters").innerHTML = Math.floor(population.woodcutters) + " woodcutters";
        }
    }

    if (job === 'miner' && population.miners >= number){
        population.miners -= number;
        population.unemployed += number;
        resourcesPerSec.ore -= rates.minerRate * number;

        document.getElementById('unemployedPopulation').innerHTML = Math.floor(population.unemployed);

        if (population.miners === 1){
            document.getElementById("miners").innerHTML = Math.floor(population.miners) + " miner";
        }
        else {
            document.getElementById("miners").innerHTML = Math.floor(population.miners) + " miners";
        }
    }

    if (job === 'scientist' && population.scientists >= number){
        population.scientists -= number;
        population.unemployed += number;
        resourcesPerSec.knowledge -= rates.scientistRate * number;

        document.getElementById('unemployedPopulation').innerHTML = Math.floor(population.unemployed);

        if (population.scientists === 1){
            document.getElementById("scientists").innerHTML = Math.floor(population.scientists) + " scientist";
        }
        else {
            document.getElementById("scientists").innerHTML = Math.floor(population.scientists) + " scientists";
        }
    }
}

function canAffordUpgrade(upgrade){
    return resources.food >= prices[upgrade].food &&
    resources.wood >= prices[upgrade].wood &&
    resources.ore >= prices[upgrade].ore &&
    resources.knowledge >= prices[upgrade].knowledge &&
    resources.iron >= prices[upgrade].iron
}

function canAffordEquipment(equipment){
    return resources.food >= prices[equipment].food &&
    resources.wood >= prices[equipment].wood &&
    resources.ore >= prices[equipment].ore &&
    resources.knowledge >= prices[equipment].knowledge &&
    resources.iron >= prices[equipment].iron
}

function canAffordBuilding(building, count){
    
    return resources.food * count >= prices[building].food * count && 
    resources.wood * count >= prices[building].wood * count && 
    resources.ore * count >= prices[building].ore * count && 
    resources.knowledge * count >= prices[building].knowledge * count &&
    resources.iron >= prices[building].iron * count
}

function updateBuildingPrice(building){
    byId(building + "-price-food").innerHTML = prices[building].food;
    byId(building + "-price-wood").innerHTML = prices[building].wood;    
    byId(building + "-price-ore").innerHTML = prices[building].ore;
    byId(building + "-price-knowledge").innerHTML = prices[building].knowledge;

    byId(building + "-price-food").hidden = prices[building].food < 1 || prices[building].food === undefined; 
    byId(building + "-price-wood").hidden = prices[building].wood < 1 || prices[building].wood === undefined; 
    byId(building + "-price-ore").hidden = prices[building].ore < 1 || prices[building].ore === undefined;
    byId(building + "-price-knowledge").hidden = prices[building].knowledge < 1 || prices[building].knowledge === undefined; 
}

function updatePrices(){
    updateBuildingPrice('pantry');
}

function build(building, count){
    if(canAffordBuilding(building, count) === true){
        buildings[building] += count;


        resources.food -= Math.floor(prices[building].food) * count;
        resources.wood -= Math.floor(prices[building].wood) * count;
        resources.ore -= Math.floor(prices[building].ore) * count;
        resources.knowledge -= Math.floor(prices[building].knowledge) * count;

        // buildingPrices = Object.keys(prices[building]).map(key => prices[building][key]);

        for(let i = 0; i < count; i++){
            Object.keys(prices[building]).map(function(key){
                prices[building][key] = Math.floor(prices[building][key] * buildingCoefficient);
            });
        }
        updateBuildingPrice(building);    
        
        if(building === 'pantry'){
            storage.food += 100 * count;
        }
        
        if(building === 'woodenhut'){
            population.max += count;
        }

        if(building === 'stonehut'){
            population.max += count * 3;
        }
        
        if(building === 'barn'){
            storage.wood += 300 * count;
            storage.ore += 200 * count;
        }

    }
}



// UPGRADES AND EQUIPMENT FUNCTIONS

function subtract(obj1, obj2) {
    return Object.keys(obj1).reduce((a, k) => {
        a[k] = obj1[k] - obj2[k];
        return a;
    }, {});
  }

function upgrade(upgrade){
    if(canAffordUpgrade(upgrade)){
        hidden.upgrades[upgrade] = true;

        resources = subtract(resources, prices[upgrade])

        if(upgrade === 'stoneaxe'){

            resourcesPerSec.wood += population.woodcutters * rates.woodcutterRate
            rates.woodcutterRate *= 2

            // unlock next possible upgrade (iron axe in this case)

            hidden.upgrades.ironaxe = false;
        }

        if(upgrade === 'metallurgy'){
            hidden.tiles.equipment = false
            hidden.equipment.coldblastfurnace = false
        }
    }
}

function buyEquipment(desiredEquipment){
    if(canAffordEquipment(desiredEquipment)){
        equipment[desiredEquipment].total += 1
        equipment[desiredEquipment].running += 1
       
        resources = subtract(resources, prices[desiredEquipment])

        if(desiredEquipment === 'coldblastfurnace'){
            resourcesPerSec.ore -= 1
            resourcesPerSec.wood -= 1.5
            resourcesPerSec.iron += 0.25
        }
    }
}



function updateNumbers(){

    byId("totalPopulation").innerHTML = Math.floor(population.total);
    byId("maxPopulation").innerHTML = "/" + Math.floor(population.max);
    byId("unemployedPopulation").innerHTML = Math.floor(population.unemployed);
    byId("food").innerHTML = Math.floor(resources.food);
    byId('wood').innerHTML = Math.floor(resources.wood);
    byId('ore').innerHTML = Math.floor(resources.ore);
    byId('knowledge').innerHTML = Math.floor(resources.knowledge);
    byId('iron').innerHTML = Math.floor(resources.iron)

    byId("foodStorage").innerHTML = "/" + Math.floor(storage.food);
    byId("woodStorage").innerHTML = "/" + Math.floor(storage.wood);
    byId("oreStorage").innerHTML = "/" + Math.floor(storage.ore);
    byId("knowledgeStorage").innerHTML = "/" + Math.floor(storage.knowledge); 
    byId("ironStorage").innerHTML = "/" + Math.floor(storage.iron)

    // update resources per second (2 decimals)

    if(resourcesPerSec.food >= 0){
        document.getElementById("foodPerSec").innerHTML = "+" + resourcesPerSec.food.toFixed(2) + "/s";
    }
    else{
        document.getElementById("foodPerSec").innerHTML = resourcesPerSec.food.toFixed(2) + "/s";
    }
    if(resourcesPerSec.wood >= 0){
        document.getElementById("woodPerSec").innerHTML = "+" + resourcesPerSec.wood.toFixed(2) + "/s";    
    }
    else{
        document.getElementById("woodPerSec").innerHTML = resourcesPerSec.wood.toFixed(2) + "/s";
    }
    if(resourcesPerSec.ore >= 0){
        document.getElementById("orePerSec").innerHTML = "+" + resourcesPerSec.ore.toFixed(2) + "/s";    
    }
    else{
        document.getElementById("orePerSec").innerHTML = resourcesPerSec.ore.toFixed(2) + "/s";
    }
    if(resources.iron >= 0){
        byId("ironPerSec").innerHTML = "+" + resourcesPerSec.iron.toFixed(2) + "/s";
    }
    else{
        byId("ironPerSec").innerHTML = resourcesPerSec.iron.toFixed(2) + "/s";
    }
    if(resources.knowledge >= 0){
        document.getElementById("knowledgePerSec").innerHTML = "+" + resourcesPerSec.knowledge.toFixed(2) + "/s";
    }
    else{
        document.getElementById("knowledgePerSec").innerHTML = resourcesPerSec.knowledge.toFixed(2) + "/s";
    } 



    // update population numbers - singular and plural forms

    if (population.hunters === 1){
        document.getElementById("hunters").innerHTML = Math.floor(population.hunters) + " hunter";
    }
    else {
        document.getElementById("hunters").innerHTML = Math.floor(population.hunters) + " hunters";
    }

    if (population.woodcutters === 1){
        document.getElementById("woodcutters").innerHTML = Math.floor(population.woodcutters) + " woodcutter";
    }
    else {
        document.getElementById("woodcutters").innerHTML = Math.floor(population.woodcutters) + " woodcutters";
    }

    if (population.miners === 1){
        document.getElementById("miners").innerHTML = Math.floor(population.miners) + " miner";
    }
    else {
        document.getElementById("miners").innerHTML = Math.floor(population.miners) + " miners";
    }

    if (population.scientists === 1){
        document.getElementById("scientists").innerHTML = Math.floor(population.scientists) + " scientist";
    }
    else {
        document.getElementById("scientists").innerHTML = Math.floor(population.scientists) + " scientists";
    } 


    // equipment - total and running

    let equipmentKeys = Object.keys(equipment)

    for(let i = 0; i < equipmentKeys.length; i++){
        byId(equipmentKeys[i] + "-total").innerHTML = equipment[equipmentKeys[i]].total
        byId(equipmentKeys[i] + "-running").innerHTML = equipment[equipmentKeys[i]].running
    }

};

function displayResources(){

    let resourcesKeys = Object.keys(resources)
    let resourcesValues = Object.values(resources)

    for(i = 0; i < resourcesKeys.length; i++){
        byId(resourcesKeys[i] + "Row").hidden = true;

        if(resourcesValues[i] > 0){
            byId(resourcesKeys[i] + "Row").hidden = false;
        }
    }
}

function displayResourcesPerSec(){

    byId('foodPerSec').hidden = resourcesPerSec.food === 0;
    byId('woodPerSec').hidden = resourcesPerSec.wood === 0;
    byId('orePerSec').hidden = resourcesPerSec.ore === 0;
    byId('ironPerSec').hidden = resourcesPerSec.iron === 0;
    byId('knowledgePerSec').hidden = resourcesPerSec.knowledge === 0;
}

function buttonDisabled(){
    if(resources.food >= storage.food){
        byId('foodBtn').style.backgroundColor = "rgb(200, 200, 200)";        
    }
    else{
        byId('foodBtn').style.backgroundColor = null;
    }

    if(resources.wood >= storage.wood){
        byId('woodBtn').style.backgroundColor = "rgb(200, 200, 200)";        
    }
    else{
        byId('woodBtn').style.backgroundColor = null;
    }

    if(resources.ore >= storage.ore){
        byId('oreBtn').style.backgroundColor = "rgb(200, 200, 200)";        
    }
    else{
        byId('oreBtn').style.backgroundColor = null;
    }

    if(resources.knowledge >= storage.knowledge){
        byId('knowledgeBtn').style.backgroundColor = "rgb(200, 200, 200)";        
    }
    else{
        byId('knowledgeBtn').style.backgroundColor = null;
    }

    if(resources.food < 20 || population.total === population.max){
        byId("birthButton").style.backgroundColor = 'gold';
    }
    else{
        byId("birthButton").style.backgroundColor = null;
    }


    if(canAffordBuilding('pantry', 1) === false){
        byId('pantry-button').style.backgroundColor = "rgb(200, 200, 200)";
    }
    else{
        byId('pantry-button').style.backgroundColor = null;
    }

    if(canAffordBuilding('woodenhut', 1) === false){
        byId('woodenhut-button').style.backgroundColor = "rgb(200, 200, 200)";
    }
    else{
        byId('woodenhut-button').style.backgroundColor = null;
    }

    if(canAffordBuilding('stonehut', 1) === false){
        byId('stonehut-button').style.backgroundColor = "rgb(200, 200, 200)"
    }
    else{
        byId('stonehut-button').style.backgroundColor = null;
    }

    if(canAffordBuilding('barn', 1) === false){
        byId('barn-button').style.backgroundColor = "rgb(200, 200, 200)"
    }
    else{
        byId('barn-button').style.backgroundColor = null;
    }



    if(canAffordUpgrade('stoneaxe') === false){
        byId('stoneaxe-button').style.backgroundColor = "rgb(200, 200, 200)"
    }
    else{
        byId('stoneaxe-button').style.backgroundColor = null;
    }

    if(canAffordUpgrade('metallurgy') === false){
        byId('metallurgy-button').style.backgroundColor = "rgb(200, 200, 200)"
    }
    else{
        byId('metallurgy-button').style.backgroundColor = null;
    }

    if(canAffordEquipment('coldblastfurnace') === false){
        byId('coldblastfurnace-button').style.backgroundColor = "rgb(200, 200, 200)"
    }
    else{
        byId('coldblastfurnace-button').style.backgroundColor = null;
    }
}

function showContent(){

    // game tiles

    let hiddenKeys = Object.keys(hidden.tiles)
    let hiddenValues = Object.values(hidden.tiles)

    for(let i = 0; i < hiddenKeys.length; i++){
        byId(hiddenKeys[i]).hidden = hiddenValues[i]
    }

    // upgrades

    let upgradeKeys = Object.keys(hidden.upgrades)
    let upgradeValues = Object.values(hidden.upgrades)

    for(let i = 0; i < upgradeKeys.length; i++){
        byId(upgradeKeys[i] + "-button").hidden = upgradeValues[i]
    }

    // equipment

    let equipmentKeys = Object.keys(hidden.equipment)
    let equipmentValues = Object.values(hidden.equipment)

    for(let i = 0; i < equipmentKeys; i++){
        byId(equipmentKeys[i] + "-button").hidden = equipmentValues[i]
    }


}

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
        
        let gameSave = {}
        localStorage.setItem("gameSaveData", JSON.stringify(gameSave))

        saveGame()
        location.reload()
    }           
}

window.setInterval(function(){

    updateFood(resourcesPerSec.food / 10)
    updateWood(resourcesPerSec.wood / 10)
    updateOre(resourcesPerSec.ore / 10)
    updateIron(resourcesPerSec.iron / 10)
    updateKnowledge(resourcesPerSec.knowledge / 10)

    
    displayResources()
    // displayResourcesPerSec()
    showContent()
    updateNumbers()
    buttonDisabled()
    
}, 100);

window.setInterval(function(){
    saveGame();
}, 60 * 1000);

window.setInterval(function(){
    checkFood();
    turnOffEquipment()
}, 2000);




