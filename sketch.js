var trex;
var trexanim;
var edges;
var ground;
var groundanim;
var invisibleground;
var cl;
var climage;
var score;
var ob;
var ob1image;
var ob2image;
var ob3image;
var ob4image;
var ob5image;
var ob6image;
var check;
var clGroup;
var obGroup;
var trexcoll;
var PLAY = 1;
var END = 0;
var gameState = PLAY;   
var go;
var restart;
var goanim;
var resanim;
var js;
var ss;
var hs;

function preload()
{
  
  trexanim = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundanim = loadImage("ground2.png");
  climage = loadImage("cloud.png");
  ob1image = loadImage("obstacle1.png");
  ob2image = loadImage("obstacle2.png");
  ob3image = loadImage("obstacle3.png");
  ob4image = loadImage("obstacle4.png");
  ob5image = loadImage("obstacle5.png");
  ob6image = loadImage("obstacle6.png");
  trexcoll = loadAnimation("trex_collided.png");
  goanim = loadImage("gameOver.png");
  resanim = loadImage("restart.png");
  js = loadSound("jump.mp3");
  ss = loadSound("checkPoint.mp3");
  hs = loadSound("die.mp3");
  
} 

function setup()
{
  
  createCanvas(400, 400);
  trex = createSprite(60, 350, 20, 20);
  trex.addAnimation("t-rex", trexanim);
  trex.addAnimation("trex collide", trexcoll);
  trex.scale = 0.4;
  trex.debug = false;
  trex.setCollider("circle", 0, 0, 40);
  invisibleground = createSprite(200, 385, 400, 10);
  invisibleground.visible = false;
  edges = createEdgeSprites();
  ground = createSprite(200, 370, 400, 10);
  ground.addImage(groundanim);
  //console.log(Math.round(random(1, 20)));
  score = 0;
  go = createSprite(200, 200, 20, 20);
  go.addImage(goanim);
  go.scale = 0.5;
  restart = createSprite(200, 100, 20, 20);
  restart.addImage(resanim);
  restart.scale = 0.5;
  clGroup = new Group();
  obGroup = new Group();
}

function draw()
{
  
  background(250);
  text("SCORE:" + score, 330, 20);
  
  if (gameState === PLAY)
  {  
     go.visible = false;
     restart.visible = false;
     ground.velocityX = -(6+score/50);
    if (frameCount %  100 === 0)
  {
    spawnobstacles(); 
  }
    if (frameCount % 100 === 0)
  {
    spawnclouds();
  }
    if (frameCount % 10 === 0)
  {
    score = score + 1; 
  }
    if (keyDown("space") && trex.y >= 360)
  {
    trex.velocityY = -15;
    js.play();
  }
  
    trex.velocityY = trex.velocityY + 0.5;
    if (trex.isTouching(obGroup))
  {
        gameState = END;
        trex.velocityY = -15;
        js.play();
        
  }
    if (score % 100 === 0 && score > 0)
    {
       ss.play(); 
    }
    
  } 
   else if(gameState === END)
   {
      hs.play(); 
      go.visible = true;
      restart.visible = true;
      ground.velocityX = 0;
      clGroup.setVelocityXEach(0);
      obGroup.setVelocityXEach(0);
      clGroup.setLifetimeEach(-1);
      obGroup.setLifetimeEach(-1);
      trex.velocityY = 0;
      trex.changeAnimation("trex collide", trexcoll);
   }
  if (mousePressedOver(restart))
  {
    //console.log("restart working"); 
    rs();
  }
  
  
  
  
  if (ground.x < 0)
  {
    
    ground.x = ground.width/2;
    ground.y = 370;
  }
  
  
  //console.log(trex.y);
  trex.collide(invisibleground);
  
  
  
  
  
  drawSprites();
}  

function spawnclouds()
{
   cl = createSprite(350, Math.round(random(30, 180)), 10, 10);
   cl.addImage(climage);
   cl.scale = 0.8;
   cl.velocityX = -3;
   cl.lifetime = 133;
   clGroup.add(cl);
}
function spawnobstacles()
{
  ob = createSprite(370, 355, 10, 10);
  ob.velocityX = -(2+score/50);
  ob.scale = 0.5;
  ob.lifetime = 200;
  obGroup.add(ob);
  check = Math.round(random(1, 6));
  console.log(check);
  switch (check)
  {
    case 1:
      ob.addImage(ob1image);
      break;
      
    case 2:
      ob.addImage(ob2image);
      break;
      
    case 3:
      ob.addImage(ob3image);
      break;
      
    case 4:
      ob.addImage(ob4image);
      break;
      
    case 5:
      ob.addImage(ob5image);
      break;
      
    case 6:
      ob.addImage(ob6image);
      break; 
    default:
      console.log("no match");
  }
}
function rs()
{
  gameState = PLAY;
  go.visible = false;
  restart.visible = false;
  score = 0;
  obGroup.destroyEach();
  clGroup.destroyEach();
  trex.changeAnimation("t-rex", trexanim);
}