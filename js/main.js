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
    wood:1000,
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
}

function updateWood(number){
    if(resources.wood < storage.wood){
        resources.wood = Math.max(0, resources.wood + number);
    }
}

function updateStone(number){
    if(resources.stone < storage.stone){
        resources.stone = Math.max(0, resources.stone + number);
    }  
}

function updateReed(number){
    if(resources.reed < storage.reed){
        resources.reed = Math.max(0, resources.reed + number);
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
        population.unemployed += 0.5 * number;
        resourcesPerSec.wood -= number;

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
        
    document.getElementById("hunters").innerHTML = Math.floor(population.hunters) + " hunters";
    document.getElementById("woodcutters").innerHTML = Math.floor(population.woodcutters) + " woodcutters";
    document.getElementById("miners").innerHTML = Math.floor(population.miners) + " miners";
    document.getElementById("gatherers").innerHTML = Math.floor(population.gatherers) + " gatherers";    
};

function displayResources(){

    if(resources.food > 0){
        document.getElementById("foodRow").hidden = false;
    }
    else{
        document.getElementById("foodRow").hidden = true;
    }
    
    if(resources.wood > 0){
        document.getElementById("woodRow").hidden = false;
    }
    else{
        document.getElementById("woodRow").hidden = true;
    }
    
    if(resources.stone > 0){
        document.getElementById("stoneRow").hidden = false;
    }
    else{
        document.getElementById("stoneRow").hidden = true;
    }

    if(resources.reed > 0){
        document.getElementById("reedRow").hidden = false;
    }
    else{
        document.getElementById("reedRow").hidden = true;
    }
}

function displayResourcesPerSec(){
    if(resourcesPerSec.food != 0){
        document.getElementById('foodPerSec').hidden = false;
    }
    else{
        document.getElementById('foodPerSec').hidden = true;
    }

    if(resourcesPerSec.wood != 0){
        document.getElementById('woodPerSec').hidden = false;
    }
    else{
        document.getElementById('woodPerSec').hidden = true;
    }

    if(resourcesPerSec.stone != 0){
        document.getElementById('stonePerSec').hidden = false;
    }
    else{
        document.getElementById('stonePerSec').hidden = true;
    }
    
    if(resourcesPerSec.reed != 0){
        document.getElementById('reedPerSec').hidden = false;
    }
    else{
        document.getElementById('reedPerSec').hidden = true;
    }
}



// saving function (localstorage)

function saveGame(){                                           
    localStorage.setItem('resourcesData', JSON.stringify(resources));
    localStorage.setItem('storageData', JSON.stringify(storage));
    localStorage.setItem('populationData', JSON.stringify(population));
    localStorage.setItem('resourcesPerSecData', JSON.stringify(resourcesPerSec));
}

function loadGame(){
    resources = JSON.parse(localStorage.getItem('resourcesData'));
    storage = JSON.parse(localStorage.getItem('storageData'));
    population = JSON.parse(localStorage.getItem('populationData'));
    resourcesPerSec = JSON.parse(localStorage.getItem('resourcesPerSecData'));

    updateNumbers();    
}

function resetGame(){
    resources = {
        food:0,
        wood:0,
        stone:0,
        reed:0
    };

    resourcesPerSec = {
        food:0,
        wood:0,
        stone:0,
        reed:0
    };
    
    storage = {
        food:100,
        wood:1000,
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
    };

    saveGame();
    loadGame();
}


window.setInterval(function(){

    updateFood(resourcesPerSec.food / 10);
    updateWood(resourcesPerSec.wood / 10);
    updateStone(resourcesPerSec.stone / 10);
    updateReed(resourcesPerSec.reed / 10);

    displayResources();
    displayResourcesPerSec();
    updateNumbers();
    
}, 100);





window.setInterval(function(){
    saveGame();
}, 60 * 1000);

