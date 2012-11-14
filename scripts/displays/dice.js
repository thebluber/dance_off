re.c('dice')
.requires('font mouse update wait')
.defines({
  text: 'Play',
  posX: 380,
  posY: 60,
  scaleX: 3,
  scaleY: 3,
  clicked: false,
  player: 0,
  times: 0,
})
.init(function(){
  console.log("dice init...")
  this.on('click', function(x, y){
    //play dice
    if (!this.clicked){
      this.clicked = true;
        //detecting if the click is within the button
        if (x >= this.posX && x <= this.posX + this.sizeX * this.scaleX && y >= this.posY && y <= this.posY + this.sizeY * this.scaleY){
          for (var i = 0; i < 5; i++){
            re('die')[i].ticking = true;
          }
        }
      var that = this;
      this.wait(function(){
          for (var i = 0; i < 5; i++){
            re('die')[i].ticking = false;
            that.clicked = false;
          }
        }, 300);
      
    }


    //console.log(x);
    //console.log(y);

  })
})
