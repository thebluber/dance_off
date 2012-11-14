re.c('changePlayer')
.requires('font mouse')
.defines({
  scaleX: 2,
  scaleY: 2,
  text: "Next Player",
  posX: 10,
  posY: 70,
  playerId: 0
})
.init(function(){
  console.log("changePlayer init...");
  this.on('click', function(x, y){
    //detect the position of click
    if (x >= this.posX && x <= this.posX + this.sizeX * this.scaleX && y >= this.posY && y <= this.posY + this.sizeY * this.scaleY){
      //release dice for next player and store values for the current player
      var values = [];
      for (var i = 0; i < 5; i++){
        values.push(re('die')[i].value);
        re('die')[i].clicked = false;
        re('die')[i].alpha = 1;
      }
      console.log(values);
      //search the row to attack
      var row;
      for (var i = 0; i < 10; i++){
        if (re('row')[i].clicked) row = re('row')[i];
      }
      //check the value of dice and attack
      for (var i = 0; i < 2; i++){
        var player = re('player')[i];
        if (player.id == this.playerId){
          player.checkAndStoreValues(values);
          player.updateBonusAndAttackValue();
          player.attack(row);
          player.alpha = 0.5;
          //change player
          this.playerId = (this.playerId + 1) % 2;
          re('player')[(i + 1) % 2].alpha = 1;
          console.log(player)
          return;
        }
      }
      
      
    }
  })
})
