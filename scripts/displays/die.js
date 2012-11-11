re.c('die')
.requires('font update mouse')
.defines({
	//define properties
  ticking: false,
  //clock: null,
  clicked: false,
  text: "0",
  value: 0,
  scaleX: 4,
  scaleY: 4,
  random: function(){
    this.value = Math.floor(Math.random() * 6 + 1);
    this.text(String(this.value));
  }
  //color:'#ff0000'
})
.events({
  update: function(){
    /*
    if (this.clock != null){
      if (this.clock < 20){
        this.clock += 1;
        this.random();
      }else{
        this.clock = null;
        this.clicked = false;
      } 
    } */
    if (!this.clicked){
      if (this.ticking){
        this.random();
      }
    } else {
      
    }
  }
})
.init(function(){
    console.log("die init..."); 
    this.on('click', function(x, y){
      if (x >= this.posX && x <= (this.posX + this.sizeX * this.scaleX) && y >= this.posY && y <= (this.posY + this.sizeY * this.scaleY)){
        if (this.clicked){
          this.clicked = false;
          this.alpha = 1;
        } else {
          this.clicked = true;
          this.alpha = 0.5;
        }
        console.log('clicked die!');
      }
    })
});
