
re.c('player')
.requires('font update mouse wait')
.factory(function(id, name, x, y){
	//this is called when using re.circle()
	this.id = id;
	this.name = name;
  this.posX = x;
  this.posY = y;
})
.defines({
  scaleX: 1.2,
  scaleY: 1.2,
  values: {},
  attackValue: 0,
  bonus: 0,
  checkAndStoreValues: function (array){
    var count_hash = {};
    for (var i = 0; i < 5; i++){
      count_hash[array[i]] ? count_hash[array[i]] += 1 : count_hash[array[i]] = 1;
    }
    var length = 0;
    for (var x in count_hash){
      length += 1;
    }
    count_hash.length = length;
    this.values = count_hash;
    console.log(this.values);
  },
  //check if the values are dreierpasch or nothing and calculate bonuspoints
  dreierOrNop: function(){
    var that = this;
    var evalDreierBonus = function(){
      for (var x in that.values){
        if (that.values[x] == 1){
          bonus += parseInt(x);
        }
      }
      console.log("evalDreierBonus: " + String(bonus));
    }

    var isDreier = false;
    var bonus = 0;
    var evalBonus = function(){
      for (var x in that.values){
       // console.log("in evalBonus");
        if (x != "length"){
          if (that.values[x] == 3){
            isDreier = true;
          }
          bonus += that.values[x] * parseInt(x);
        }
      }
      console.log("Bonus in evalBonus: " + String(bonus));
    }

    evalBonus();
    //console.log("isDreier: " + String(isDreier))
    if (isDreier){
      this.attackValue = 1;
      bonus = 0;
      evalDreierBonus();
    } else {
      this.attackValue = 0;
    }

    this.bonus += bonus;
    console.log("DreierOrNopBonus: " + bonus);      
    
  },
  //check if the values are viererpasch or fullhouse and calculate bonuspoints
  fullHouseOrVierer: function(){
    var bonus = 0;
    var evalViererBonus = function(){
      for (var x in this.values){
        if (this.values[x] == 1){
          bonus += parseInt(x);
        }
      }
    };
    var isVierer = false;
    for (var x in this.values){
      if (x != "length"){
        if (this.values[x] == 4){
          isVierer = true;
        }
      }
    };
    if(isVierer){
      this.attackValue = 5;
      evalViererBonus();
      this.bonus += bonus;
    } else {
      this.attackValue = 3;
    }
    console.log("ViererOrFullhouseBonus: " + String(bonus));      
  },
  kleineStrOrNop: function(){
    //console.log("kleine Straße oder nix!");
    var valuesAcc = [];
    var bonus = 0;
    var kleineStrBonus = 0;
    for (var x in this.values){
      if (x != "length"){
        valuesAcc.push(eval(x));
        bonus += eval(x) * this.values[x];
        if (this.values[x] == 2){
          //console.log("x = " + String(x));
          //console.log("parseInt[x] = " + String(eval(x)));
          kleineStrBonus += eval(x);//why is parseInt here not functioning???? WAT!?
          //console.log("in loop kleine str: " + String(kleineStrBonus));
        }
      }
    }
    var uniq = function(array) {
      array = array.sort();
      var old;
      var new_array = [];
      for (var i = 0; i < array.length; i++){
        if (old != array[i]){
        new_array.push(array[i]);
        }
        old = array[i];
      }
      return new_array;
    }
    valuesAcc = uniq(valuesAcc);
    var old;
    for (var i = 0; i < 4; i++){
      if (old){
        if (old != valuesAcc[i]){
          this.attackValue = 0;
          this.bonus = bonus;
          return;
        }
        old += 1;
      }
    }
    console.log("Kleine Straße Bonus: " + String(kleineStrBonus));
    this.attackValue = 2;
    this.bonus = kleineStrBonus;
  }
})
.events({
  update: function(){
    this.text("Player " + String(this.id) + " Bonus: " + String(this.bonus));
  }
})
.statics({

})
.init(function(){
  console.log("player init...")

  this.updateBonusAndAttackValue = function(){
    //console.log("updateBonusAndAttackValue!");
    switch(this.values.length){
      //Kniffel
      case 1:
      this.attackValue = 6;
      break;

      //FullHouse oder Viererpasch
      case 2:
      this.fullHouseOrVierer();
      break;
      
      //Dreierpasch oder nix
      case 3:
      this.dreierOrNop();
      break;

      //kleine Straße
      case 4:
      this.kleineStrOrNop();
      break;

      //große Straße
      case 5:
      this.attackValue = 4;
      break;
    }
    this.values = {};

    console.log("AttackValue:" + String(this.attackValue));
    console.log("Bonus:" + String(this.bonus));

    this.attack = function(row){
      if(row){
        /*
        var animals = [];
        for (var i = 0; i < re('DiscoDino_mini.png').length; i++){
          var dino = re('DiscoDino_mini.png')[i];
          if (row.posX == dino.posX && (dino.posY >= row.posY && dino.posY <= row.posY + row.sizeY)){
            //animals.push(re('DiscoDino_mini.png')[i]);
            animals.push(dino);
          }
        }
        */
        var animals = row.dinos;
        //sort animals by their posY, posX is same in a row
        if (this.id == 0){
          //animals = animals.sort(function(a,b){ return b.posY - a.posY});
          animals = animals.reverse();
        //} else {
          //animals = animals.sort(function(a,b){ return a.posY - b.posY});
        }
        var oldPosY = [];
       
        for (var i = 0; i < 6; i++){
          oldPosY.push(animals[i].posY);
          if (i < this.attackValue){
            //this.wait(function(){row.dinos[i].dispose()}, 1000);
            row.dinos[i].dispose();
          } else {
            animals[i].posY = oldPosY[i - this.attackValue];
          }
        }
        //console.log(oldPosY);
        //release row
        row.clicked = false;
        row.alpha = 0;
      }
    }
  }
})
