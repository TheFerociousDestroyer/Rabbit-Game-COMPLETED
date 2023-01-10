const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var jungleImage,carrotImg,rabbitImg,muteImg,cutButtonImg
var link1,link2,link3,rrope,rope2,rope3,carrot
let engine;
let world;
var button,button2,button3
var blinkAnim,eatAnim,sadAnim
var airWave,eatingSound,ropeCutSound,backgroundSound,sadSound

function preload()
{
  //images
   jungleImage = loadImage("Jungle.png");
   carrotImg = loadImage("CARROT.png");
   rabbitImg = loadImage("Rabbit.png");
   muteImg = loadImage("mute.png");
   
   //animations
   blinkAnim = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
   eatAnim = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
   sadAnim = loadAnimation("sad_1.png","sad_2.png","sad_3.png")
   //sounds
   airWave = loadSound("air.wav")
   eatingSound = loadSound("eating_sound.mp3")
   ropeCutSound = loadSound("rope_cut.mp3")
   backgroundSound = loadSound("sound1.mp3")
   sadSound = loadSound("sad.wav")
  //  cutButtonImg = loadImage("cut_button.png");
  sadAnim.looping = false
  eatAnim.looping = false
  blinkAnim.playing = true
}




function setup() 
{
  createCanvas(500,650);
  engine = Engine.create();
  world = engine.world;
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
backgroundSound.play()
//button
button = createImg("cut_button.png")
button.position(20,30)
button.size(50,50)
button.mouseClicked(drop)

//button2
button2 = createImg("cut_button.png")
button2.position(330,35)
button2.size(50,50)
button2.mouseClicked(drop2)

//button3
button3 = createImg("cut_button.png")
button3.position(360,200)
button3.size(50,50)
button3.mouseClicked(drop3)


//airWaveButton
airButton = createImg("balloon.png")
airButton.position(10,250)
airButton.size(150,100)
airButton.mouseClicked(airBlow)

//MuteButton

muteButton = createImg("mute.png")
muteButton.position(450,0)
muteButton.size(50,50)
muteButton.mouseClicked(mute)

//bodies
   ground = new Ground(200,690,600,20)
   rrope = new Rope(13,{x:40,y:30})
   rope2 = new Rope(9,{x:370,y:40})
   rope3 = new Rope(4,{x:400,y:225})
   carrot = Bodies.circle(300,300,10)
   Matter.Composite.add(rrope.body,carrot)
   link1 = new Link(rrope,carrot)
   link2 = new Link(rope2,carrot)
   link3 = new Link(rope3,carrot)
blinkAnim.frameDelay = 7
   //rabbit
   rabbit = createSprite(450,550,100,100)
   rabbit.addAnimation("blinking",blinkAnim)
   rabbit.addAnimation("eating",eatAnim)
   rabbit.addAnimation("sading",sadAnim)
   rabbit.changeAnimation("blinking")
   rabbit.scale = 0.2
}

function draw() 
{
  background(51);
  image(jungleImage,0,0,500,700)
  ground.show()
  rrope.show()
  rope2.show()
  rope3.show()
  backgroundSound.setVolume(0.1)
  if(distance(carrot,rabbit) === true)
  {
    rabbit.changeAnimation("eating")
    eatingSound.play()
  }
  if (distance(carrot,ground.body) === true)
  {
    rabbit.changeAnimation("sading")
    sadSound.play()
  }
  fill("red")
  if(carrot!= null)
  {
    image(carrotImg,carrot.position.x,carrot.position.y,70,70)
  }

  Engine.update(engine);
   drawSprites();
  
}


function drop()
{
  rrope.break()
  link1.detach()
  link1 = null
  ropeCutSound.play()
}
function drop2()
{
  rope2.break()
  link2.detach()
  link2 = null
  ropeCutSound.play()
}
function drop3()
{
  rope3.break()
  link3.detach()
  link3 = null
  ropeCutSound.play()
}



function distance(body,sprite)
{
  if(body!= null)
  {
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d<=80)
    {
      World.remove(engine.world,body)
      body = null
      carrot = null
      return true
    }
    else
    {
      return false
    }

  }
}

function airBlow()
{
Matter.Body.applyForce(carrot,{x:0,y:0},{x:0.01,y:0})
airWave.play()
}

function mute()
{
if(backgroundSound.isPlaying())
{
backgroundSound.stop()
}
else 
{
backgroundSound.play()
}
}
