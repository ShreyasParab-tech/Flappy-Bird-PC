var bird,birdimg
var bg,pipesImg,pipesGroup,pipes,pipes2,spawnPipesGroup,spawnPipesGroup2
var restart,restartGroup1,restart1
 
var ground,groundImg,invisibleGround
var edges
var score=0

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
    birdimg= loadAnimation("bird1.png","bird2.png")
    birdDead=loadImage("bird1.png")
    groundImg=loadImage("ground1.png")
    bg=loadImage("background 03.png")
    pipesImg=loadImage("pipe.png")
    pipes2Img=loadImage("pipe2.png")
    restartImg = loadImage("restart.png")

    jump = loadSound("jump.mp3")
    die = loadSound("die.mp3")
}

function setup(){
    createCanvas(windowWidth,windowHeight)
    bird = createSprite(100,250,50,50)
    bird.addAnimation("bird",birdimg)
    bird.scale = 0.06

    ground = createSprite(width,height-20,width+500,2)
    ground.addImage("ground",groundImg)
    ground.x=ground.width/2
    ground.velocityX = -(6 + 3*score/100)
    ground.scale=1.7
  
   
    restart=createSprite(width/2,height/2)
    restart.addImage(restartImg)
    restart.scale=0.1
    
    spawnPipesGroup = createGroup()
    spawnPipesGroup2 = createGroup()
  
    
    
    
}
function draw(){
background(bg)


textSize(22)
fill("black")
text("Score:"+score,width-130,50)

if(gameState === PLAY){
ground.velocityX = -4
restart.visible=false
score = score + Math.round(getFrameRate()/60);


if(ground.x<500){
    ground.x=ground.width/2
}

bird.velocityY=2
bird.velocityY=bird.velocityY+2

if(keyDown("space")){
    bird.y=bird.y-12
    jump.play()
}

if(bird.isTouching(spawnPipesGroup)){
    gameState = END
    die.play()
}
if(bird.isTouching(spawnPipesGroup2)){
    gameState = END
    die.play()
}


edges = createEdgeSprites();
bird.collide(edges)
bird.collide(ground)
spawnPipes();
spawnPipes2();

}
else if(gameState===END){
   
fill("black")
textSize(32)
text("Game Over 'Press' >                < to Restart",width/2-368,height/2+10)

    restart.visible=true
   
    ground.velocityX=0
    spawnPipesGroup.setLifetimeEach(-1);
    spawnPipesGroup2.setLifetimeEach(-1);
     
     spawnPipesGroup.setVelocityXEach(0);
     spawnPipesGroup2.setVelocityXEach(0);    
bird.velocityY=12

if(mousePressedOver(restart)){
reset()
}
}

drawSprites();
}

function reset(){
    gameState = PLAY
    spawnPipesGroup.destroyEach()
    spawnPipesGroup2.destroyEach()
    reset.visible=false
    score=0
    bird.y=250
    bird.velocityY=2
    ground.velocityX=-4
  }


function spawnPipes(){
if(frameCount%60===0){
    var pipes = createSprite(width-200,height-120,30,30)
    pipes.y= Math.round(random(530,560))
    pipes.velocityX=-9
    pipes.addImage(pipesImg)
    pipes.scale=0.6
    pipes.lifetime=200
    pipes.setCollider("rectangle",0,0,pipes.width-20,pipes.height-40)
    spawnPipesGroup.add(pipes)
   

}
}
function spawnPipes2(){
    if(frameCount%60===0){
        var pipes2 = createSprite(width-200,height-580,30,30)
        pipes2.y = Math.round(random(60,100))
        pipes2.velocityX=-9
        pipes2.addImage(pipes2Img)
        pipes2.scale=0.6
        pipes2.lifetime=200
        
        pipes2.setCollider("rectangle",0,0,pipes2.width-20,pipes2.height-40)
        spawnPipesGroup2.add(pipes2)
        
    }
    }
   