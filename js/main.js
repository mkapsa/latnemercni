resources = {
    food:0,
    wood:0,
    ore:0,
    iron:0,
    coal:0,
    coke:0,
    knowledge:0
}

resourcesPerSec = {
    food:0,
    wood:0,
    ore:0,
    iron:0,
    coal:0,
    coke:0,
    knowledge:0
}

storage = {
    food:100,
    wood:600,
    ore:300,
    iron:100,
    coal:200,
    coke:100,
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
    stonehut:0,
    library:0
}

equipment = {
    coldblastfurnace: {
        total:0,
        running:0
    },

    cokeoven: {
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
        coal:0,
        coke:0,
        knowledge:0
    },
    barn: {
        food:0,
        wood:300,
        ore:150,
        iron:0,
        coal:0,
        coke:0,
        knowledge:0
    },
    woodenhut: {
        food:0,
        wood:150,
        ore:50,
        iron:0,
        coal:0,
        coke:0,
        knowledge:0,
    },
    stonehut: {
        food:0,
        wood:200,
        ore:300,
        iron:0,
        coal:0,
        coke:0,
        knowledge:0
    },
    library: {
        food:0,
        wood:400,
        ore:0,
        iron:0,
        coal:0,
        coke:0,
        knowledge:0
    },

    // upgrade prices

    stoneaxe: {
        food:0,
        wood:300,
        ore:300,
        iron:0,
        coal:0,
        coke:0,
        knowledge:100
    },

    ironaxe: {
        food:0,
        wood:400,
        ore:0,
        iron:200,
        coal:0,
        coke:0,
        knowledge:150
    },
    ironpickaxe: {
        food:0,
        wood:0,
        ore:0,
        iron:350,
        coal:0,
        coke:0,
        knowledge:800
    },

    buildings: {
        food:0,
        wood:0,
        ore:0,
        iron:0,
        coal:0,
        coke:0,
        knowledge:25
    },

    upgrades: {
        food:0,
        wood:0,
        ore:0,
        iron:0,
        coal:0,
        coke:0,
        knowledge:50
    },

    housing: {
        food:0,
        wood:0,
        ore:0,
        iron:0,
        coal:0,
        coke:0,
        knowledge:40
    },

    metallurgy: {
        food:0,
        wood:0,
        ore:0,
        iron:0,
        coal:0,
        coke:0,
        knowledge:200
    },

    coalextraction: {
        food:0,
        wood:0,
        ore:0,
        iron:0,
        coal:0,
        coke:0,
        knowledge:400
    },

    destructivedistillation: {
        food:0,
        wood:0,
        ore:0,
        iron:0,
        coal:0,
        coke:0,
        knowledge:800
    },

    // equipment prices

    coldblastfurnace: {
        food:0,
        wood:0,
        ore:100,
        iron:0,
        coal:0,
        coke:0,
        knowledge:50
    },

    cokeoven: {
        food:0,
        wood:0,
        ore:200,
        iron:100,
        coal:0,
        coke:0,
        knowledge:200
    },
}

hidden = {
    tiles:{
        basicButtons:false,
        workers:false,
        equipment:true,
        buildings:true,
        upgrades:true
    },
    upgrades: {
        stoneaxe:false,
        ironaxe:true,
        ironpickaxe:true
    },
    science: {
        buildings:false,
        upgrades:true,
        housing:true,
        metallurgy: true, 
        coalextraction: true,
        destructivedistillation: true
    },
    buildings: {
        pantry:false,
        barn:false,
        woodenhut:true,
        stonehut:true,
        library:false
    },
    equipment: {
        coldblastfurnace: true,
        cokeoven:true,
    },
    resourceRows: {
        food: true,
        wood: true,
        ore: true,
        iron: true,
        coal: true,
        coke:true,
        knowledge: true
    },
    resourcesPerSec: {
        food: true,
        wood: true,
        ore:true,
        iron:true,
        coal: true,
        coke:true,
        knowledge:true
    }
}

rates = {

    // worker rate coefficients

    hunterRate: 1 * 2,
    woodcutterRate: 0.5 * 2,
    minerOreRate: 0.3 * 2,
    minerCoalRate:0,
    scientistRate: 0.2 * 2,

    // equipment net rates

    coldblastfurnace: {
        coal:-1,
        ore:-1,
        iron:0.25
    },

    cokeoven: {
        coal:-1,
        coke:0.25
    }
}

const god = () => {

    Object.keys(storage).forEach(key => storage[key] = 1000)
    
    Object.keys(resources).forEach(key => resources[key] = 1000)
}


// returns an array of all the materials needed for the item

function getMaterials(object) {

    for(let i = 0; i < Object.keys(object).length; i++){

        return Object.keys(object).filter(key => object[key] > 0);
    }
}

function getNegative(object) {

    for(let i = 0; i < Object.keys(object).length; i++){

        return Object.keys(object).filter(key => object[key] < 0);
    }
}

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
}
window.onload = checkLocalStorage()
window.onload = updateNumbers();

// console.log(getNegative(rates[Object.keys(equipment)[i]]))

function turnOffEquipment(){

    if(((resourcesPerSec.coal < 0 && resources.coal === 0 ) || (resourcesPerSec.ore < 0 && resources.ore === 0)) && equipment.coldblastfurnace.running >= 1){
        equipment.coldblastfurnace.running -= 1;
        resourcesPerSec.coal -= rates.coldblastfurnace.coal
        resourcesPerSec.ore -= rates.coldblastfurnace.ore
        resourcesPerSec.iron -= rates.coldblastfurnace.iron
    }
    else if(resourcesPerSec.coal < 0 && resources.coal === 0 && equipment.cokeoven.running >= 1){
        equipment.cokeoven.running -=1
        resourcesPerSec.coal -= rates.cokeoven.coal
        resourcesPerSec.coke -= rates.cokeoven.coke
    }
}

function turnOff(equipment1){

    const equipmentRates = Object.keys(rates[equipment1])

    if(equipment[equipment1].running > 0){

        equipment[equipment1].running -= 1

        for(i = 0; i < equipmentRates.length; i++){

            resourcesPerSec[equipmentRates[i]] -= rates[equipment1][equipmentRates[i]]

        }
    }
}

function turnOn(equipment1){
    const equipmentRates = Object.keys(rates[equipment1])

    if(equipment[equipment1].total > equipment[equipment1].running){

        equipment[equipment1].running += 1

        for(i = 0; i < equipmentRates.length; i++){

            resourcesPerSec[equipmentRates[i]] += rates[equipment1][equipmentRates[i]]
        }
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
            resourcesPerSec.knowledge -= rates.scientistRate;
        }
        else if(population.miners >= 1){
            population.miners -= 1
            resourcesPerSec.ore -= rates.minerOreRate
            resourcesPerSec.coal -= rates.minerCoalRate
        }
        else if(population.woodcutters >= 1){
            population.woodcutters -= 1
            resourcesPerSec.wood -= rates.woodcutterRate
        }
        else if(population.hunters >= 1){
            population.hunters -= 1
            resourcesPerSec.food -= rates.hunterRate
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

function updateCoal(number){
    if(resources.coal < storage.coal){
        resources.coal = Math.max(0, resources.coal + number)
    }
    if(resources.coal >= storage.coal){
        resources.coal = Math.min(storage.coal, resources.coal + number)
    }
}

const updateCoke = (number) => {
    if(resources.coke < storage.coke){
        resources.coke = Math.max(0, resources.coke + number)
    }
    if(resources.coke >= storage.coke){
        resources.coke = Math.min(storage.coke, resources.coke + number)
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
        population.unemployed -= number
        population.hunters += number
        resourcesPerSec.food += number * rates.hunterRate
    }
    else if (job === 'woodcutter' && population.unemployed >= number){
        population.unemployed -= number
        population.woodcutters += number
        resourcesPerSec.wood += rates.woodcutterRate * number
    }
    else if (job === 'miner' && population.unemployed >= number){
        population.unemployed -= number
        population.miners += number
        resourcesPerSec.ore += rates.minerOreRate * number
        resourcesPerSec.coal += rates.minerCoalRate * number
    }
    else if (job === 'scientist' && population.unemployed >= number){
        population.unemployed -= number
        population.scientists += number
        resourcesPerSec.knowledge += rates.scientistRate * number;
    }
}

function fire(job, number){

    if (job == 'hunter' && population.hunters >= number){
        population.hunters -= number
        population.unemployed += number
        resourcesPerSec.food -= rates.hunterRate * number
    }
    else if (job === 'woodcutter' && population.woodcutters >= number){
        population.woodcutters -= number
        population.unemployed += number
        resourcesPerSec.wood -= rates.woodcutterRate * number
    }
    else if (job === 'miner' && population.miners >= number){
        population.miners -= number
        population.unemployed += number
        resourcesPerSec.ore -= rates.minerOreRate * number
        resourcesPerSec.coal -= rates.minerCoalRate * number
    }
    else if (job === 'scientist' && population.scientists >= number){
        population.scientists -= number
        population.unemployed += number
        resourcesPerSec.knowledge -= rates.scientistRate * number
    }
}

function canAffordUpgrade(upgrade){


    return Object.keys(resources).every(key => resources[key] >= prices[upgrade][key])
}




function canAffordEquipment(equipment){
    
    return Object.keys(resources).every(key => resources[key] >= prices[equipment][key])
}

const canAffordScience = (science) => {
    return Object.keys(resources).every(key => resources[key] >= prices[science][key])
}


function canAffordBuilding(building, count){

    return Object.keys(resources).every(key => resources[key] * count >= prices[building][key] * count)
}

function updateBuildingPrice(building){

    const buildingmats = Object.entries(prices[building]).filter(([a, b]) => b !== 0).map(([a, b]) => a );

    for(i = 0; i < buildingmats.length; i++){
        byId(building + "-price-" + buildingmats[i]).innerHTML = "/" + prices[building][buildingmats[i]]

        byId(building + "-price-" + buildingmats[i]).hidden = prices[building][buildingmats[i]] < 1 || prices[building][buildingmats[i]] === undefined
    }
}

function updatePrices(){
    
    for(let i = 0; i < Object.keys(buildings).length; i++){
        updateBuildingPrice(Object.keys(buildings)[i])
    }   
}

const build = (building, count) => {
    if(canAffordBuilding(building, count)){
        buildings[building] += count;

        byId(building + "-count").innerHTML = "(" + buildings[building] + ")"

        let resourcesKeys = Object.keys(resources)

        for(i = 0; i < resourcesKeys.length; i++){
            resources[resourcesKeys[i]] -= Math.floor(prices[building][resourcesKeys[i]]) * count
        }

        for(let i = 0; i < count; i++){
            Object.keys(prices[building]).map(function(key){
                prices[building][key] = Math.floor(prices[building][key] * buildingCoefficient);
            });
        }
        updateBuildingPrice(building);    
        
        if(building === 'pantry'){
            storage.food += 100 * count
        } 
        else if(building === 'woodenhut'){
            population.max += count
        }
        else if(building === 'stonehut'){
            population.max += count * 3
        }        
        else if(building === 'barn'){
            storage.wood += 300 * count
            storage.ore += 200 * count
            storage.coal += 100 * count
            storage.iron += 50 * count
        }
        else if(building === 'library')
            storage.knowledge += 300 * count        
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
        else if(upgrade === 'ironaxe'){

            resourcesPerSec.wood -= population.woodcutters * rates.woodcutterRate
            rates.woodcutterRate *= 1.75
            resourcesPerSec.wood += population.woodcutters * rates.woodcutterRate



        }
        else if(upgrade === 'ironpickaxe'){

            resourcesPerSec.ore -= population.miners * rates.minerOreRate
            rates.minerOreRate *= 1.8
            resourcesPerSec.ore += population.miners * rates.minerOreRate

            resourcesPerSec.coal -= population.miners * rates.minerCoalRate
            rates.minerCoalRate *= 1.8
            resourcesPerSec.coal += population.miners * rates.minerCoalRate
        }             
    }
}

const science = (science) => {

    if(canAffordScience(science)){
        hidden.science[science] = true;

        resources = subtract(resources, prices[science])


        if(science === 'buildings'){
            hidden.tiles.buildings = false
            hidden.science.metallurgy = false
            hidden.science.upgrades = false
            hidden.science.housing = false
        }
        else if(science === 'upgrades'){
            hidden.tiles.upgrades = false
        }
        else if(science === 'housing'){
            hidden.buildings.woodenhut = false
            hidden.buildings.stonehut = false
        }
        else if(science === 'metallurgy'){
            hidden.tiles.equipment = false
            hidden.equipment.coldblastfurnace = false
            hidden.upgrades.ironpickaxe = false
            hidden.science.coalextraction = false
        }
        else if(science === 'coalextraction'){
            
            rates.minerCoalRate = 0.3
            resourcesPerSec.coal += population.miners * rates.minerCoalRate

            hidden.science.destructivedistillation = false
        }
        else if(science === 'destructivedistillation'){
            hidden.equipment.cokeoven = false
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
            resourcesPerSec.coal -= 1
            resourcesPerSec.iron += 0.25
        }
        else if(desiredEquipment === 'cokeoven'){
            resourcesPerSec.coal -= 1
            resourcesPerSec.coke += 0.25
        }
    }
}

function updateNumbers(){

    byId("totalPopulation").innerHTML = Math.floor(population.total);
    byId("maxPopulation").innerHTML = "/" + Math.floor(population.max);
    byId("unemployedPopulation").innerHTML = Math.floor(population.unemployed);

    // resources numbers update

    
    let resourcesKeys = Object.keys(resources)

    for(i = 0; i < resourcesKeys.length; i++){

        byId(resourcesKeys[i]).innerHTML = Math.floor(resources[resourcesKeys[i]])
    }

    // storage numbers update

    let storageKeys = Object.keys(storage)

    for(i = 0; i < storageKeys.length; i++){
        byId(storageKeys[i] + "Storage").innerHTML = "/" + Math.floor(storage[storageKeys[i]])
    }

    // update resources per second (2 decimals)

    let resourcesPerSecKeys = Object.keys(resourcesPerSec)

    for(let i = 0; i < resourcesPerSecKeys.length; i++){
        if(resourcesPerSec[resourcesPerSecKeys[i]] >= 0){
            byId(resourcesPerSecKeys[i] + "PerSec").innerHTML = "+" + resourcesPerSec[resourcesPerSecKeys[i]].toFixed(2) + "/s"
        }
        else{
            byId(resourcesPerSecKeys[i] + "PerSec").innerHTML = resourcesPerSec[resourcesPerSecKeys[i]].toFixed(2) + "/s"
        }
    }

    // update population numbers - singular and plural forms

    let workersSingular = ['hunter', 'woodcutter', 'miner', 'scientist']
    let workersPlural = ['hunters', 'woodcutters', 'miners', 'scientists']

    for(i = 0; i < workersPlural.length; i++){
        if(population[workersPlural[i]] === 1){
            byId(workersPlural[i]).innerHTML = Math.floor(population[workersPlural[i]]) + " " + workersSingular[i]
        }
        else{
            byId(workersPlural[i]).innerHTML = Math.floor(population[workersPlural[i]]) + " " + workersPlural[i]
        }
    }

    byId("unemployedPopulation").innerHTML = Math.floor(population.unemployed);

    // equipment - total and running

    let equipmentKeys = Object.keys(equipment)

    for(let i = 0; i < equipmentKeys.length; i++){
        byId(equipmentKeys[i] + "-total").innerHTML = equipment[equipmentKeys[i]].total
        byId(equipmentKeys[i] + "-running").innerHTML = equipment[equipmentKeys[i]].running
    }

    // building counters

    let buildingsKeys = Object.keys(buildings)

    for(let i = 0; i < buildingsKeys.length; i++){
        byId(buildingsKeys[i] + "-count").innerHTML = "(" + buildings[buildingsKeys[i]] + ")"
    }
};

function displayResourcesPerSec(){

    let resourcesPerSecKeys = Object.keys(resourcesPerSec)
    let resourcesPerSecValues = Object.values(resourcesPerSec)

    for(let i = 0; i < resourcesPerSecKeys.length; i++){

        let resource = resourcesPerSecKeys[i]

        byId(resource + "PerSec").hidden = hidden.resourcesPerSec[resource]

        if(resourcesPerSec[resource] !== 0){
            hidden.resourcesPerSec[resource] = false
        }
    }
}

function buttonDisabled(){

    // basic manual buttons - disabled if storage is full
        
    let basicButtonValues = ['food', 'wood', 'ore', 'knowledge']

    for(i = 0; i < basicButtonValues.length; i++){
        
        if(resources[basicButtonValues[i]] >= storage[basicButtonValues[i]]){
            byId(basicButtonValues[i] + "Btn").style.backgroundColor = "rgb(200, 200, 200)"
        }
        else{
            byId(basicButtonValues[i] + "Btn").style.backgroundColor = null;
        }
    }
    
    // birth button - disabled if you have < 20 food or if population cap is reached

        if(resources.food < 20 || population.total === population.max){
        byId("birthButton").style.backgroundColor = 'gold';
    }
    else{
        byId("birthButton").style.backgroundColor = null;
    }

    // buildings - disabled if you don't have enough resources

    let buildingsKeys = Object.keys(buildings)

    for(let i = 0; i < buildingsKeys.length; i++){

        if(canAffordBuilding(buildingsKeys[i], 1)){
            byId(buildingsKeys[i] + "-button").style.backgroundColor = null
        } 
        else{  
            byId(buildingsKeys[i] + "-button").style.backgroundColor = "rgb(200, 200, 200)"
        }
    }

    // upgrades - disabled if you don't have enough resources

    let upgradesKeys = Object.keys(hidden.upgrades)

    for(i = 0; i < upgradesKeys.length; i++){

        if(canAffordUpgrade(upgradesKeys[i])){
            
            byId(upgradesKeys[i] + '-button').style.background = null
        }
        else if(canAffordUpgrade(upgradesKeys[i]) === false){

            byId(upgradesKeys[i] + '-button').style.background = "rgb(200, 200, 200)"
        }
    }       
    
    // equipment - disabled if you don't have enough resources

    let equipmentKeys = Object.keys(equipment)

    for(i = 0; i < equipmentKeys.length; i++){
        if(canAffordEquipment(equipmentKeys[i]) === false){
            byId(equipmentKeys[i] + "-button").style.backgroundColor = "rgb(200, 200, 200)"
        }
        else{
            byId(equipmentKeys[i] + "-button").style.backgroundColor = null;

        }    
    }   
    
    const scienceKeys = Object.keys(hidden.science)
    
    for(i = 0; i < scienceKeys.length; i++){
        if(canAffordScience(scienceKeys[i]) === false){
            byId(scienceKeys[i] + "-button").style.backgroundColor = "rgb(200, 200, 200)"
        }
        else{
            byId(scienceKeys[i] + "-button").style.backgroundColor = null;
        }
    }
}

const hideBasicButtons = () => {
    
    if(hidden.tiles.basicButtons){
    hidden.tiles.basicButtons = false
    }
    else if(hidden.tiles.basicButtons === false){
        hidden.tiles.basicButtons = true
    }
    
    if(byId('hidebutton').textContent == 'hide basic buttons'){
        byId('hidebutton').innerHTML = 'show basic buttons' 
    }
    else if(byId('hidebutton').textContent == 'show basic buttons'){
        byId('hidebutton').innerHTML = 'hide basic buttons'
    }
    
}

function showContent(){

    // resource Rows

    let resourceRowsKeys = Object.keys(hidden.resourceRows)  
    let resourceRowsValues = Object.values(hidden.resourceRows)

    for(let i = 0; i < resourceRowsKeys.length; i++){
        
        let resource = resourceRowsKeys[i]

        byId(resource + 'Row').hidden = hidden.resourceRows[resource]

        if(resources[resourceRowsKeys[i]] > 0){
                hidden.resourceRows[resource] = false;
        }
    }

    // game tiles

    let hiddenKeys = Object.keys(hidden.tiles)
    let hiddenValues = Object.values(hidden.tiles)

    for(let i = 0; i < hiddenKeys.length; i++){
        byId(hiddenKeys[i]).hidden = hiddenValues[i]
    }

    // upgrades 

    let upgradesKeys = Object.keys(hidden.upgrades)
    let upgradesValues = Object.values(hidden.upgrades)

    for(let i = 0; i < upgradesKeys.length; i++){
        byId(upgradesKeys[i] + "-button").hidden = upgradesValues[i]
    }

    // buildings

    for(let i = 0; i < Object.keys(hidden.buildings).length; i++){
        byId(Object.keys(hidden.buildings)[i] + '-button').hidden = Object.values(hidden.buildings)[i]

    }

    // equipment

    let equipmentKeys = Object.keys(hidden.equipment)
    let equipmentValues = Object.values(hidden.equipment)

    for(let i = 0; i < equipmentKeys.length; i++){
        // byId(equipmentKeys[i] + '-row').hidden = equipmentValues[i]

        if(equipmentValues[i]){
            byId(equipmentKeys[i] + '-row').style.visibility = 'hidden'
        }
        else if(equipmentValues[i] === false){
            byId(equipmentKeys[i] + '-row').style.visibility = 'visible'
        }
        
    }

    // science

    let scienceKeys = Object.keys(hidden.science)
    let scienceValues = Object.values(hidden.science)

    for(let i = 0; i < scienceKeys.length; i++){
        byId(scienceKeys[i] + "-button").hidden = scienceValues[i]
    }

    // building counters

    let buildingsKeys = Object.keys(buildings)

    for(let i = 0; i < buildingsKeys.length; i++){
        byId(buildingsKeys[i] + "-count").hidden = buildings[buildingsKeys[i]] === 0
    }

    // current prices

    for(i = 0; i < Object.keys(prices).length; i++){
        for(y = 0; y < getMaterials(prices[Object.keys(prices)[i]]).length; y++){

           

            document.querySelector("." + Object.keys(prices)[i] + "-current-" + getMaterials(prices[Object.keys(prices)[i]])[y]).innerHTML = Math.floor(Math.min(prices[Object.keys(prices)[i]][getMaterials(prices[Object.keys(prices)[i]])[y]], resources[getMaterials(prices[Object.keys(prices)[i]])[y]]))

           
        }
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
        
        localStorage.clear()
        location.reload()
    }           
}


