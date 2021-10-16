resources = {
    food:0,
    wood:0,
    stone:0,
    reed:0
}

function huntFood(number){
    resources.food += number;

    if (resources.food > 0) {
        document.getElementById('food').innerHTML = Math.floor(resources.food);
    }
}

function cutWood(number){
    resources.wood += number;

    if (resources.wood > 0) {
        document.getElementById('wood').innerHTML = Math.floor(resources.wood);
    }
}

function mineStone(number){
    resources.stone += number;

    if (resources.stone > 0) {
        document.getElementById('stone').innerHTML = Math.floor(resources.stone);
    }
}

function gatherReed(number){
    resources.reed += number;

    if (resources.reed > 0) {
        document.getElementById('reed').innerHTML = Math.floor(resources.reed);
    }
}
