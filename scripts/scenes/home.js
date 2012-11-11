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
  
  var radius = 10;
  var color = '#FF0000';

  //create new circle on canvas
  re.circle(radius, color)
  //from align component
  .alignHor()
  .alignVer();

  //find circle and change speed
  re('circle').first().attr('speed', 15);
  
  var posX = 10;
  var posY = 10;
  for(var i = 0; i < 5; i++){
    re.e('die')
    .attr({posX: posX, posY: posY});
    posX += 60;  
  }

  re.e('dice')
});
