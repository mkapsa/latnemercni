resources = {
    money:50,
    wheat:0,
    bread:0
    }

population = {
    farmers:0
}

document.getElementById("money").innerHTML = "money: " + Math.floor(resources.money);



function harvestWheat(number) {
    resources.wheat += number;

    if (resources.wheat > 0) {
        document.getElementById('wheat').innerHTML = "wheat: " + Math.floor(resources.wheat);
    }
}

function bakeBread(number) {

    if (resources.wheat >= 20 * number) {
        resources.wheat -= 20 * number;
        resources.bread += number;

        if (resources.bread > 0){
            document.getElementById('bread').innerHTML = "bread: " + Math.floor(resources.bread);
        }
    }

    document.getElementById('wheat').innerHTML = "wheat: " + Math.floor(resources.wheat);
}

function sellBread(number) {

    if (resources.bread >= number) {
        resources.bread -= number;
        resources.money += number * 30;

        if (resources.money >= 0) {
            document.getElementById('money').innerHTML = "money: " + Math.floor(resources.money);
        }

        document.getElementById('bread').innerHTML = "bread: " + Math.floor(resources.bread);
    }


}

function hire(job, number) {

    if(job == 'farmers'){
        population.farmers += number;
        resources.money -= number * 50;

        document.getElementById("money").innerHTML = "money: " + Math.floor(resources.money);



    }


}

window.setInterval(function(){

    harvestWheat(population.farmers / 10);

}, 100);
