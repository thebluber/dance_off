re.scene('load')
.enter(function(){
  
  re.load(re.assets)
  .complete(function(){
    console.log(re.assets);    
    re.c('font')
    .requires('imgtext font.png')
    .defines('imgtext',
            [8,4,8,12,10,12,12,4,6,6,8,8,6,8,4,12,10,6,10,10,10,10,10,10,10,10,4,4,8,8,8,10,
            12,10,10,8,10,8,8,10,10,8,10,10,8,12,10,10,10,10,10,10,8,10,10,12,10,10,8,6,12,
            6,8,10,6,10,10,8,10,10,8,10,10,4,6,10,4,12,10,10,10,10,8,10,8,10,10,12,8,10,10,8,4,8]
              );
    re.scene('home').enter();
    
  });
  
});
