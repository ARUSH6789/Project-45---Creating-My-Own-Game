var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound


function preload(){
  trex_running = loadAnimation("b1.png", "b2.png", "b3.png", "b4.png", "b5.png", "b6.png");
  trex_collided = loadAnimation("ouch.png");
  
  groundImage = loadImage("track.jpeg");
  
  cloudImage = loadImage("cloud.png");
  
  obstacleImage = loadImage("hurdle.png")
  
   restartImg = loadImage("restart2.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 400);
  
  
  
  ground = createSprite(300,100,600,400);
  ground.addImage("ground",groundImage);
  //ground.scale = 0.7
  //ground.x = ground.width /2;
  
  trex = createSprite(90,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.4;

   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,270);
  restart.addImage(restartImg);
  
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  trex.setCollider("circle",0,0,40);
  
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 100){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -12;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      trex.velocityY = 0
     
      //change the trex animation
      trex.changeAnimation("collided", trex_collided);
      trex.x = 300;
      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
  fill("white")
  textSize(20)
  text("Score: "+ score, 500,50);
}

function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(650,200,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.debug = true
    obstacle.setCollider("rectangle", 0, 0, 10, 10);

    inv = createSprite(obstacle.x,110, 20, 100);
    inv.shapeColor = "red";
    inv.velocityX = -6;
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

