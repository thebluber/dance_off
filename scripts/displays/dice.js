re.c('dice')
.requires('rect mouse update wait')
.defines({
  color: 'rgb(200, 200, 200)',
  posX: 300,
  posY: 300,
  sizeX: 100,
  sizeY: 30,
  clicked: false,
  times: 0,
})
.init(function(){
  console.log("dice init...")
  this.on('click', function(x, y){
    //play dice
    if (!this.clicked){
      this.clicked = true;
        //detecting if the click is within the button
        if (x >= this.posX && x <= this.posX + this.sizeX && y >= this.posY && y <= this.posY + this.sizeY){
          this.times += 1;
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
        }, 300)
    }
    console.log(this.times);
    //dummy code for releasing dice from static state
    if (this.times > 2){
      for (var i = 0; i < 5; i++){
        re('die')[i].clicked = false;
        re('die')[i].alpha = 1;
      }
      this.times = 0;
    } 

    console.log(x);
    console.log(y);

  })
})
