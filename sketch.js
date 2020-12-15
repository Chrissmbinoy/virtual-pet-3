var dog,sadDog,happyDog,bedRoom,bathroom,garden, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var gameState,readState
function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/happy dog.png");
bedRoom = loadImage("Images/Bed Room.png")
bathroom = loadImage("Images/Wash Room.png")
garden = loadImage("Images/Garden.png")
}

function setup() {
  database=firebase.database();
  createCanvas(400,500);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  readState = database.ref("gameState")
  readState.on("value",function(data){
    gameState = data.val()
  })

  dog=createSprite(200,320,20,20);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(380,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(475,95);
  addFood.mousePressed(addFoods);
  

}

function draw() {

 


 
  

 currentTime = hour()
 if(currentTime ==(lastFed+1)){
update("playing")
foodObj.garden()
 }else if(currentTime ==(lastFed+2)){
update("Sleeping")
foodObj.bedroom()
 }else if(currentTime >(lastFed+2)&&currentTime<=(lastFed+4)){
update("Bathing")
foodObj.bathroom()
 }else{
   update("Hungry")
   foodObj.display()
 }
 if(gameState!== "Hungry" ){
  feed.hide()
  addFood.hide()
  dog.remove()

}else{
  feed.show()
  addFood.show()
  dog.addImage(sadDog)
  
}
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function update(state){

  database.ref("/").update({

    gameState:state
  })
}