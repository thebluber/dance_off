re.c('row')
.requires('rect update mouse')
.defines({
  clcked: false,
  dinos: [],
  addDino: function(dino){
    this.dinos.push(dino);
  }
})
.init(function(){
  console.log("row init...");
  this.on('click', function(x, y){
    if (x >= this.posX && x <= this.posX + this.sizeX && y >= this.posY && y <= this.posY + this.sizeY){
      if (!this.clicked){
        this.clicked = true;
        this.color = 'rgb(44, 200, 100)';
        this.alpha = 0.5;
      } else {
        this.clicked = false;
        this.alpha = 0;
      }
    }
  })
})
