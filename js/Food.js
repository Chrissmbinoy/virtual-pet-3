class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('Images/Food Stock.png');
    }

   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

    getFoodStock(){
      return this.foodStock;
    }

    display(){
      background(46,139,87);
      fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 50,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",50,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 50,30);
   }
      var x=70,y=30;
      
      imageMode(CENTER);
      image(this.image,720,100,70,70);
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%6==0){
            x=50;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+60;
        }
      }
    }
    bedroom(){

      background(bedRoom,550,500)
    }
    garden(){
    
      background(garden,550,500)
    }
    bathroom(){
    
      background(bathroom,550,500)
    }
}
