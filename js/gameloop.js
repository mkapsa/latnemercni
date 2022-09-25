window.setInterval(function(){

    updateFood(resourcesPerSec.food / 50)
    updateWood(resourcesPerSec.wood / 50)
    updateOre(resourcesPerSec.ore / 50)
    updateIron(resourcesPerSec.iron / 50)
    updateCoal(resourcesPerSec.coal / 50)
    updateCoke(resourcesPerSec.coke / 50)
    updateKnowledge(resourcesPerSec.knowledge / 50)

    displayResourcesPerSec()
    showContent()
    updateNumbers()
    buttonDisabled()
    
}, 20);
 
window.setInterval(function(){
    saveGame();
}, 60 * 1000);

window.setInterval(function(){
    checkFood();
    turnOffEquipment()
}, 1000);