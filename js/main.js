resources = {
    food:0,
    wood:0,
    stone:0,
    reed:0
}

storage = {
    food:100,
    wood:200,
    stone:100,
    reed:50
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





// document.getElementById('food').innerHTML = Math.floor(resources.food) + "/" + storage.food;



function eatFood(number){

    if (resources.food >= 1) {
        resources.food -= number;
        document.getElementById('food').innerHTML = Math.floor(resources.food) + "/" + storage.food;
    }
}


function huntFood(number){

    if(resources.food <= storage.food){
        resources.food += number;

        if (resources.food > 0) {
            document.getElementById('food').innerHTML = Math.floor(resources.food) + "/" + storage.food;
        }
    }
}

function cutWood(number){

    if(resources.wood <= storage.wood){
        resources.wood += number;

        if (resources.wood > 0) {
            document.getElementById('wood').innerHTML = Math.floor(resources.wood) + "/" + storage.wood;
        }
    }
}

function mineStone(number){

    if(resources.stone <= storage.stone){
        resources.stone += number;

        if (resources.stone > 0) {
            document.getElementById('stone').innerHTML = Math.floor(resources.stone) + "/" + storage.stone;
        }
    }
}

function gatherReed(number){

    if(resources.reed <= storage.reed){
        resources.reed += number;

        if (resources.reed > 0) {
            document.getElementById('reed').innerHTML = Math.floor(resources.reed) + "/" + storage.reed;
        }
    }
}

function giveBirth(number){



    if (resources.food >= number * 20 && population.total < population.max){
        resources.food -= number * 20;
        population.total += number;
        population.unemployed += number;


        document.getElementById("totalPopulation").innerHTML = Math.floor(population.total) + "/" + population.max;
        document.getElementById("unemployedPopulation").innerHTML = Math.floor(population.unemployed);
        document.getElementById("food").innerHTML = Math.floor(resources.food) + "/" + storage.food;

    }
}

function hire(job, number){

    if (job == 'hunter' && population.unemployed >= number){
        population.unemployed -= number;
        population.hunters += number;

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

        document.getElementById('unemployedPopulation').innerHTML = Math.floor(population.unemployed);

        if (population.gatherers === 1){
            document.getElementById("gatherers").innerHTML = Math.floor(population.gatherers) + " gatherer";
        }
        else {
            document.getElementById("gatherers").innerHTML = Math.floor(population.gatherers) + " gatherers";
        }
    }
}

// saving function (localstorage)

function saveGame(){                                           
    localStorage.setItem('resourcesData', JSON.stringify(resources));
    localStorage.setItem('storageData', JSON.stringify(storage));
    localStorage.setItem('populationData', JSON.stringify(population));
}

function loadGame(){
    resources = JSON.parse(localStorage.getItem('resourcesData'));
    storage = JSON.parse(localStorage.getItem('storageData'));
    population = JSON.parse(localStorage.getItem('populationData'));
}


window.setInterval(function(){

    eatFood(population.total * 0.044);
    huntFood(population.hunters / 10);
    cutWood(population.woodcutters / 20);
    mineStone(population.miners / 30);
    gatherReed(population.gatherers / 50);

}, 100);

