window.setInterval(function(){

    updateFood(resourcesPerSec.food / 10)
    updateWood(resourcesPerSec.wood / 10)
    updateOre(resourcesPerSec.ore / 10)
    updateIron(resourcesPerSec.iron / 10)
    updateCoal(resourcesPerSec.coal / 10)
    updateCoke(resourcesPerSec.coke / 10)
    updateKnowledge(resourcesPerSec.knowledge / 10)

    displayResourcesPerSec()
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
}, 1000);