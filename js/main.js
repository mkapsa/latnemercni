resources = {
    food:0,
    wood:0,
    stone:0,
    reed:0
}

resourcesPerSec = {
    food:0,
    wood:0,
    stone:0,
    reed:0
}

storage = {
    food:100,
    wood:600,
    stone:300,
    reed:200
}

population = {
    max:10,
    total:0,
    unemployed:0,
    hunters:0,
    woodcutters:0,
    miners:0,
    gatherers:0
}

buildings = {
    foodstorage:0
}

prices = {
    foodstorage: {
        food:0,
        wood:300,
        stone:100,
        reed:50
    },
    woodenhut: {
        food:0,
        wood:400,
        stone:50,
        reed:100,
    },
    stonehut: {
        food:0,
        wood:100,
        stone:300,
        reed:100
    }
    
}



const byId = function(id){
    return document.getElementById(id);
}

const byClass = function(className){
    return document.getElementsByClassName(className);
}

// document.getElementById('food').innerHTML = Math.floor(resources.food) + "/" + storage.food;

window.onload = loadGame();
window.onload = updateNumbers();



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
    if(resources.wood >= storage.food){
        resources.wood = Math.min(storage.wood, resources.wood + number);
    }
}

function updateStone(number){
    if(resources.stone < storage.stone){
        resources.stone = Math.max(0, resources.stone + number);
    }  
    if(resources.stone >= storage.stone){
        resources.stone = Math.min(storage.stone, resources.stone + number);
    }
}

function updateReed(number){
    if(resources.reed < storage.reed){
        resources.reed = Math.max(0, resources.reed + number);
    }  
    if(resources.reed >= storage.reed){
        resources.reed = Math.min(storage.reed, resources.reed + number);
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

    if (job == 'hunter' && population.unemployed >= number){
        population.unemployed -= number;
        population.hunters += number;
        resourcesPerSec.food += number;

        document.getElementById("unemployedPopulation").innerHTML = Math.floor(population.unemployed);

            if (population.hunters === 1){
                document.getElementById("hunters").innerHTML = Math.floor(population.hunters) + " hunter";
            }
            else {
                document.getElementById("hunters").innerHTML = Math.floor(population.hunters) + " hunters";
            }
    }

    if (job == 'woodcutter' && population.unemployed >= number){
        population.unemployed -= number;
        population.woodcutters += number;
        resourcesPerSec.wood += 0.5 * number;

        document.getElementById("unemployedPopulation").innerHTML = Math.floor(population.unemployed);

            if (population.woodcutters === 1){
                document.getElementById("woodcutters").innerHTML = Math.floor(population.woodcutters) + " woodcutter";
            }
            else {
                document.getElementById("woodcutters").innerHTML = Math.floor(population.woodcutters) + " woodcutters";
            }
        }

    if (job == 'miner' && population.unemployed >= number){
        population.unemployed -= number;
        population.miners += number;
        resourcesPerSec.stone += 0.3 * number;

        document.getElementById("unemployedPopulation").innerHTML = Math.floor(population.unemployed);

            if (population.miners === 1){
                document.getElementById("miners").innerHTML = Math.floor(population.miners) + " miner";
            }
            else {
                document.getElementById("miners").innerHTML = Math.floor(population.miners) + " miners";
            }
        }

    if (job == 'gatherer' && population.unemployed >= number){
        population.unemployed -= number;
        population.gatherers += number;
        resourcesPerSec.reed += 0.2 * number;

        document.getElementById("unemployedPopulation").innerHTML = Math.floor(population.unemployed);

            if (population.gatherers === 1){
                document.getElementById("gatherers").innerHTML = Math.floor(population.gatherers) + " gatherer";
            }
            else {
                document.getElementById("gatherers").innerHTML = Math.floor(population.gatherers) + " gatherers";
            }
        }
}
function fire(job, number){

    if (job == 'hunter' && population.hunters >= number){
        population.hunters -= number;
        population.unemployed += number;
        resourcesPerSec.food -= number;

        document.getElementById('unemployedPopulation').innerHTML = Math.floor(population.unemployed);

        if (population.hunters === 1){
            document.getElementById("hunters").innerHTML = Math.floor(population.hunters) + " hunter";
        }
        else {
            document.getElementById("hunters").innerHTML = Math.floor(population.hunters) + " hunters";
        }
    }

    if (job == 'woodcutter' && population.woodcutters >= number){
        population.woodcutters -= number;
        population.unemployed += number;
        resourcesPerSec.wood -= 0.5 * number;

        document.getElementById('unemployedPopulation').innerHTML = Math.floor(population.unemployed);

        if (population.woodcutters === 1){
            document.getElementById("woodcutters").innerHTML = Math.floor(population.woodcutters) + " woodcutter";
        }
        else {
            document.getElementById("woodcutters").innerHTML = Math.floor(population.woodcutters) + " woodcutters";
        }
    }

    if (job == 'miner' && population.miners >= number){
        population.miners -= number;
        population.unemployed += number;
        resourcesPerSec.stone -= 0.3 * number;

        document.getElementById('unemployedPopulation').innerHTML = Math.floor(population.unemployed);

        if (population.miners === 1){
            document.getElementById("miners").innerHTML = Math.floor(population.miners) + " miner";
        }
        else {
            document.getElementById("miners").innerHTML = Math.floor(population.miners) + " miners";
        }
    }

    if (job == 'gatherer' && population.gatherers >= number){
        population.gatherers -= number;
        population.unemployed += number;
        resourcesPerSec.reed -= 0.2 * number;

        document.getElementById('unemployedPopulation').innerHTML = Math.floor(population.unemployed);

        if (population.gatherers === 1){
            document.getElementById("gatherers").innerHTML = Math.floor(population.gatherers) + " gatherer";
        }
        else {
            document.getElementById("gatherers").innerHTML = Math.floor(population.gatherers) + " gatherers";
        }
    }
}



function canAfford(building, count){
    
    return resources.wood * count >= prices[building].wood * count && resources.stone * count >= prices[building].stone * count && resources.reed * count >= prices[building].reed * count
}

// function updateBuildingPrice(building){
//     // byId(building + "-price-food").innerHTML = prices[building].food;
//     byId(building + "-price-wood").innerHTML = prices[building].wood;    
//     byId(building + "-price-stone").innerHTML = prices[building].stone;
//     byId(building + "-price-reed").innerHTML = prices[building].reed;
// }

function build(building, count){
if(canAfford(building, count) === true){
    buildings[building] += count;

    resources.wood -= Math.floor(prices[building].wood) * count;
    resources.stone -= Math.floor(prices[building].stone) * count;
    resources.reed -= Math.floor(prices[building].reed) * count;

    let buildingPrices = Object.keys(prices[building]).map(key => prices[building][key]);

    for(let i = 0; i < count; i++){
        Object.keys(prices[building]).map(function(key, index){
            prices[building][key] = Math.floor(prices[building][key] * 1.14);
        });
    }
    // updateBuildingPrice(building);    
    
    if(building === 'foodstorage'){
        storage.food += 30;

        byId('foodstorage-price-wood').innerHTML = prices['foodstorage'].wood;
        byId('foodstorage-price-stone').innerHTML = prices['foodstorage'].stone;
        byId('foodstorage-price-reed').innerHTML = prices['foodstorage'].reed;

        }
    }
}




function updateNumbers(){

    document.getElementById("totalPopulation").innerHTML = Math.floor(population.total);
    document.getElementById("maxPopulation").innerHTML = "/" + Math.floor(population.max);
    document.getElementById("unemployedPopulation").innerHTML = Math.floor(population.unemployed);
    document.getElementById("food").innerHTML = Math.floor(resources.food);
    document.getElementById('wood').innerHTML = Math.floor(resources.wood);
    document.getElementById('stone').innerHTML = Math.floor(resources.stone);
    document.getElementById('reed').innerHTML = Math.floor(resources.reed);

    document.getElementById("foodStorage").innerHTML = "/" + Math.floor(storage.food);
    document.getElementById("woodStorage").innerHTML = "/" + Math.floor(storage.wood);
    document.getElementById("stoneStorage").innerHTML = "/" + Math.floor(storage.stone);
    document.getElementById("reedStorage").innerHTML = "/" + Math.floor(storage.reed); 

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
    if(resourcesPerSec.stone >= 0){
        document.getElementById("stonePerSec").innerHTML = "+" + resourcesPerSec.stone.toFixed(2) + "/s";    
    }
    else{
        document.getElementById("stonePerSec").innerHTML = resourcesPerSec.stone.toFixed(2) + "/s";
    }
    if(resources.reed >= 0){
        document.getElementById("reedPerSec").innerHTML = "+" + resourcesPerSec.reed.toFixed(2) + "/s";
    }
    else{
        document.getElementById("reedPerSec").innerHTML = resourcesPerSec.reed.toFixed(2) + "/s";
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

    if (population.gatherers === 1){
        document.getElementById("gatherers").innerHTML = Math.floor(population.gatherers) + " gatherer";
    }
    else {
        document.getElementById("gatherers").innerHTML = Math.floor(population.gatherers) + " gatherers";
    } 
};

function displayResources(){

    byId('foodRow').hidden = resources.food === 0;
    byId('woodRow').hidden = resources.wood === 0;
    byId('stoneRow').hidden = resources.stone === 0;
    byId('reedRow').hidden = resources.reed === 0;
}

function displayResourcesPerSec(){

    byId('foodPerSec').hidden = resourcesPerSec.food == 0;
    byId('woodPerSec').hidden = resourcesPerSec.wood == 0;
    byId('stonePerSec').hidden = resourcesPerSec.stone == 0;
    byId('reedPerSec').hidden = resourcesPerSec.reed == 0;
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

    if(resources.stone >= storage.stone){
        byId('stoneBtn').style.backgroundColor = "rgb(200, 200, 200)";        
    }
    else{
        byId('stoneBtn').style.backgroundColor = null;
    }

    if(resources.reed >= storage.reed){
        byId('reedBtn').style.backgroundColor = "rgb(200, 200, 200)";        
    }
    else{
        byId('reedBtn').style.backgroundColor = null;
    }


    if(canAfford('foodstorage', 1) === false){
        byId('foodstorage-button').style.backgroundColor = "rgb(200, 200, 200)";
    }
    else{
        byId('foodstorage-button').style.backgroundColor = null;
    }
}

// saving function (localstorage)

function saveGame(){                                           
    localStorage.setItem('resourcesData', JSON.stringify(resources));
    localStorage.setItem('storageData', JSON.stringify(storage));
    localStorage.setItem('populationData', JSON.stringify(population));
    localStorage.setItem('resourcesPerSecData', JSON.stringify(resourcesPerSec));
    localStorage.setItem('buildingsData', JSON.stringify(buildings));
    localStorage.setItem('pricesData', JSON.stringify(prices));
}

function loadGame(){
    resources = JSON.parse(localStorage.getItem('resourcesData'));
    storage = JSON.parse(localStorage.getItem('storageData'));
    population = JSON.parse(localStorage.getItem('populationData'));
    resourcesPerSec = JSON.parse(localStorage.getItem('resourcesPerSecData'));
    buildings = JSON.parse(localStorage.getItem('buildingsData'));
    prices = JSON.parse(localStorage.getItem('pricesData'));
    

    updateNumbers();    
}

function resetGame(){

    if(window.confirm("Do you really want to reset the game? Your progress will be lost.")){
        
        resources = {
            food:0,
            wood:0,
            stone:0,
            reed:0
        }

        resourcesPerSec = {
            food:0,
            wood:0,
            stone:0,
            reed:0
        }
        
        storage = {
            food:100,
            wood:600,
            stone:300,
            reed:200
        }
        
        population = {
            max:10,
            total:0,
            unemployed:0,
            hunters:0,
            woodcutters:0,
            miners:0,
            gatherers:0
        }

        buildings = {
            foodstorage:0
        }

        prices = {
            foodstorage: {
                wood:300,
                stone:100,
                reed:50
            },
            woodenhut: {
                food:0,
                wood:400,
                stone:50,
                reed:100,
            },
            stonehut: {
                food:0,
                wood:100,
                stone:300,
                reed:100
            }
        } 

        saveGame();
        loadGame();
    }          
}



window.setInterval(function(){

    updateFood(resourcesPerSec.food / 10);
    updateWood(resourcesPerSec.wood / 10);
    updateStone(resourcesPerSec.stone / 10);
    updateReed(resourcesPerSec.reed / 10);

    
    displayResources();
    displayResourcesPerSec();
    updateNumbers();
    buttonDisabled();
    
}, 100);

window.setInterval(function(){
    saveGame();
}, 60 * 1000);


