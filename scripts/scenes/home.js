re.scene('home')
.enter(function(){
  
    re.c('font')
    .requires('imgtext font.png')
    .defines('imgtext',
    [8,4,8,12,10,12,12,4,6,6,8,8,6,8,4,12,10,6,10,10,10,10,10,10,10,10,4,4,8,8,8,10,
12,10,10,8,10,8,8,10,10,8,10,10,8,12,10,10,10,10,10,10,8,10,10,12,10,10,8,6,12,
6,8,10,6,10,10,8,10,10,8,10,10,4,6,10,4,12,10,10,10,10,8,10,8,10,10,12,8,10,10,8,4,8]
  );
  //stop the browser from moving around
  re.preventDefault('left right up down');
  

  
  var posX = 10;
  var posY = 10;
  for(var i = 0; i < 5; i++){
    re.e('die')
    .attr({posX: posX, posY: posY});
    posX += 60;  
  }
  re.load('DiscoDino_mini.png')
 
  //place dinos and row boxes on screen player1 
  var x = 130;
  var y = 110;
  for (var j = 0; j < 5; j++){
    //row
    var row  = re.e('row')
                .attr({
                sizeX: 60,
                sizeY: 300,
                posX: x,
                posY: 110,
                alpha: 0
              });
    row.dinos = [];
    //console.log('col ' + String(j));
    for (var i = 0; i < 6; i++){
      var dino = re.e('sprite DiscoDino_mini.png')
      dino.frame.size = {x: 60, y: 83};
      //dino.animate('live');
      dino.posX = x;
      dino.posY = y;
      row.addDino(dino);
      y += 40;
    }
    //console.log(row.dinos);
    y = 110;
    x += 60;
  }

  var texts = ["5er:6", "4er:5", "GrStr:4", "FH:3", "KlStr:2", "3er:1"];
  var y = 140;
  //place würfelzüge
  for (var i = 0; i < 6; i++){
    re.e('diceType')
    .attr({
      posY: y,
      text: texts[i],
      value: 6 - i
    });
    y += 40;
  } 
  re.e('rect')
  .attr({
    sizeX: 420,
    sizeY: 20,
    color: 'rgb(200, 200, 200)',
    posX: 20,
    posY: 400
  });
//place dinos and rows for player2
  x = 130;
  y = 410;
  for (var j = 0; j < 5; j++){
    //row
    var row = re.e('row')
    .attr({
      sizeX: 60,
      sizeY: 300,
      posX: x,
      posY: 410,
      alpha: 0
    });
    row.dinos = [];
    //console.log('col ' + String(j));
    for (var i = 0; i < 6; i++){
      var dino = re.e('sprite DiscoDino_mini.png')
      dino.frame.size = {x: 60, y: 83};
      //dino.animate('live');
      dino.posX = x;
      dino.posY = y;
      row.addDino(dino);
      y += 40;
    }
    y = 410;
    x += 60;
    console.log(row.dinos);
  }

  texts = texts.reverse();
  y = 450;
  //place würfelzüge
  for (var i = 0; i < 6; i++){
    re.e('diceType')
    .attr({
      posY: y,
      text: texts[i],
      value: i + 1
    });
    y += 40;
  } 
  re.e('dice');
  re.e('changePlayer');
  re.player(0, 'Jiayi', 300, 10);
  re.player(1, 'Jiayi1', 300, 30);
});
