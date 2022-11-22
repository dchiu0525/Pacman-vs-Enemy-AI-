/*
  Use WASD keys to control the movement of mainchar.
  Each movement is 1.2 frames.
  The mainchar needs to collect the pillets.
  After the mainchar collect all the pillets, the player wins.
  There are some freeze power which mainchar picks up could stop enemies's action
  The enemies will try to chase the mainchar and they will search the path per 20 frames
  Also, each enemies will have 5 frames delay between enemies for searching the path
  When the enemies touch with the mainchar, the game lose.
  When the game ends, click anywhether on the canvas to play again.
  The player and enemies can't pass through the wall
  If the player move out of the boundary, it could wrap around the boarder and enter from the other side.We translate the canvas to let player could see where the mainchar is.
  When the player out of the boundary, enemies will not chase. They will stop.
*/
var tilemap=[
"wwwwwwwwwww-w-wwwwww",
"w++++E++p+--w+++-++w",
"w-wwwww+www-wwwwww+w",
"w+++++w+++w-+++++w+w",
"w+wwwwwww+ww--ww-w+w",
"w+++++-+++wE--Ew+w-w",
"w-wwwww+w-wwwwww-w+w",
"--++++++w----p---+--",
"www-www-ww-wwwww-w-w",
"w-------ww+++++++w-w",
"w+w+www-ww+wwwww+w-w",
"w+w+++w-M--w---w+--w",
"w+w+w+wwwwww-w+++www",
"--w+++-+++w--w-w+w--",
"w-p-www+w-+-ww-w+w+w",
"wwwww+++wwwww--w+++w",
"-+++++w-w+++++wwwwE-",
"w-wwwww-w-wwwwwwww-w",
"wE++++++++++-++++++w",
"wwwwwwwwwww-w-wwwwww",   
];
/*create pillet obj*/
class pilletObj{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.death=0;
  }  
  draw(){
    push();
    translate(this.x,this.y);
    fill(255,153,34);
    noStroke();
    ellipse(10,10,11,11);
    fill(248, 91, 26);
    textSize(5);
    text('★',6,9);
    text('★',10,9);
    text('★',5,11.5);   
    text('★',8,11.5); 
    text('★',11,11.5); 
    text('★',6,14);
    text('★',10,14);
    pop();    
  }
  
  
}

/* create wall obj*/
class wallObj{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
  draw(){
    push();
    translate(this.x,this.y);
    fill(190, 190, 190);
    stroke(0);
    rect(0,0,5,5);
    rect(5,0,5,5);
    rect(10,0,5,5);
    rect(15,0,5,5);
    rect(0,5,7.5,5); 
    rect(7.5,5,5,5);    
    rect(12.5,5,7.5,5);
    rect(0,10,5,5);
    rect(5,10,5,5);
    rect(10,10,5,5);
    rect(15,10,5,5);
    rect(0,15,7.5,5); 
    rect(7.5,15,5,5);    
    rect(12.5,15,7.5,5);
    pop();    
  }  
}

class freezeObj{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.death=0;
  }
  draw(){
  push();
  translate(this.x,this.y);
  textSize(15);
  text("☃️",2,14.5);
  pop(); 
  }
}

class maincharObj{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.prex=0;
    this.prey=0;
    this.originx=x;
    this.originy=y;
  }
  draw(){
    push();
    translate(this.x,this.y);
    fill(101,255,0);
    rect(7,2.5,6,6);
    fill(0);
    ellipse(8.5,5,1,1);
    ellipse(11.5,5,1,1);   
    rect(9,6.5,2,1,0.5,0.5);
    fill(101,255,0);
    rect(6,8.5,8,5);
    fill(0);
    rect(3,9,3,1);
    rect(3,10,1,3);
    rect(14,9,3,1);
    rect(16,10,1,3);
    rect(8,13.5,1,3);   
    rect(11,13.5,1,3); 
    rect(6,16.5,3,1);   
    rect(11,16.5,3,1); 
    pop();
  }
  move(){
    this.prex=0;
    this.prey=0;
    if (keyIsDown(87)) {
    this.y -=1.2;
    this.prey=-1.2;
    }
    else if (keyIsDown(83)) {
    this.y +=1.2;
    this.prey=1.2;
    }  
    else if(keyIsDown(65)){
    this.x-=1.2;
    this.prex=-1.2;    
    }
    else if(keyIsDown(68)){
    this.x+=1.2;
    this.prex=1.2; 
    } 
    if(this.x<0){
      xcor=20;
    }
    else if(this.x>390){
      xcor=-20;
    }
    else{
      xcor=0;
    }
    if(this.y<0){
      ycor=20;
    }
    else if(this.y>390){
      ycor=-20;
    } 
    else{
      ycor=0;
    }
  }
  checkcollision(){
    for(var i=0;i<walls.length;i++){/*touch the walls */
        if((walls[i].x+20>this.x+10&&walls[i].x<this.x+18)||(walls[i].x+18>this.x&&walls[i].x<this.x)){
          if((walls[i].y+20>this.y+10&&walls[i].y<this.y+18)||(walls[i].y+18>this.y&&walls[i].y<this.y)){ 
          this.x-=this.prex;
          this.y-=this.prey;                         
          }                  
        }    
    }
    for(i=0;i<pillets.length;i++){/*touch the pillets */
      if(pillets[i].death===0){
        if(dist(pillets[i].x+10,pillets[i].y+10,this.x+10,this.y+10) <10){
         pillets[i].death=1; 
         pilletscount++;
        }
        
      }
    }
    for(i=0;i<ices.length;i++){/*touch the freeze power */
      if(ices[i].death===0){
        if(dist(ices[i].x+10,ices[i].y+10,this.x+10,this.y+10)<10){
          freeze=true;
          ices[i].death=1;
        }
        
      }
      
    }
     for(i=0;i<enemys.length;i++){/*touch the enemy */
        if(dist(enemys[i].x,enemys[i].y,this.x+10,this.y+10)<10){
          game=2;
        }
        
      
    }
    
    
  }
}

var qObj = function(x, y) {
this.x = x;
this.y = y;
this.fcost = 0;
};
qObj.prototype.set = function(a, b) {
this.x = a;
this.y = b;
};

var targetObj = function(x, y) {
this.x = x;
this.y = y;
};
/*create enemy obj */
class enemyObj{
  constructor(x,y){
    this.delay=false;
    this.x=x+10;
    this.y=y+10;   
    this.scale=0.7;
    this.originx=x;
    this.originy=y;
    this.currFrame = frameCount;
    this.extraframe=0;
    this.state=[new chasestate(),new frozenstate()];
    this.currstate=0;
    this.q=[];
    this.path=[];
    this.comefrom=[];
    this.inq=[];
    this.cost=[];
    this.cost = new Array(20);
    this.inq = new Array(20);
    this.comefrom = new Array(20);
    for (var i=0; i<20; i++) {
    this.cost[i] = new Array(20);
    this.inq[i] = new Array(20);
    this.comefrom[i] = new Array(20);
    }
    for (i=0; i<400; i++) {
    this.path.push(new p5.Vector(0, 0));
    this.q.push(new qObj(0, 0));
    }
    for (i=0; i<20; i++) {
    for(var j=0; j<20; j++) {
    this.comefrom[i][j] = new p5.Vector(0, 0);
    }
    }  
    this.target = new targetObj(0, 0);
    this.targetPos = new targetObj(0, 0);
    this.finalDest = new targetObj(0, 0);    
    this.qLen = 0;
    this.qStart = 0;
    this.pathFound=0;
    this.pathLen=0;
    this.graph=[];
  }
  draw(){
  push();
  translate(this.x,this.y);
  fill(0);
  ellipse(-4*this.scale,7*this.scale,4*this.scale,6*this.scale);
  ellipse(4*this.scale,7*this.scale,4*this.scale,6*this.scale);
  triangle(-6*this.scale,-7*this.scale,-4*this.scale,-10*this.scale,-2*this.scale,-7*this.scale);
  triangle(-2*this.scale,-7*this.scale,0,-10*this.scale,2*this.scale,-7*this.scale);
  triangle(2*this.scale,-7*this.scale,4*this.scale,-10*this.scale,6*this.scale,-7*this.scale);
  fill(222,184,135);
  rect(-10*this.scale, -7*this.scale, 20*this.scale, 14*this.scale, 5*this.scale);
  fill(0);
  rect(2*this.scale,-5*this.scale,4*this.scale,2*this.scale);
  rect(-6*this.scale,-5*this.scale,4*this.scale,2*this.scale);
  rect(-5*this.scale, -1*this.scale,10*this.scale,5*this.scale, 2*this.scale);
  fill(255);
  triangle(-4*this.scale,-1*this.scale,-2*this.scale,4*this.scale,0,-1*this.scale);      
  triangle(0,-1*this.scale,2*this.scale,4*this.scale,4*this.scale,-1*this.scale);    
  pop();
  }  

}

/*enemy frozen state */
class frozenstate{
  constructor(){
   this.currFrame=frameCount;        
  }
  execute(me){
  if(this.currFrame<frameCount-300){
     me.currstate=0;
     this.currFrame=frameCount; 
  }
  }
}
/*enemy chasing state */
class chasestate{
  constructor(){
  this.currFrame=frameCount; 
  this.step=new p5.Vector(0,0);  
  }
  execute(me){
  if(!me.delay){/*make sure it has delay between each enemies */
    if(this.currFrame<frameCount-me.extraframe){
      me.delay=true;
     this.currFrame=frameCount; 
    }
  }
  if(me.delay){
  /*calculate the path every 20 frames*/
  if(this.currFrame < frameCount-20){
  me.target.x = mainchar.x+10;
  me.target.y = mainchar.y+10;
  me.finalDest.x = me.target.x;
  me.finalDest.y = me.target.y;
  me.targetPos.x = floor(me.finalDest.y / 20);
  me.targetPos.y = floor(me.finalDest.x / 20);
  var i = floor(me.y / 20);
  var j = floor(me.x / 20);
  initGraph(i, j,me);
  me.pathFound = 0;
  me.pathLen = 0;
  findAStarPath(i, j,me);
  me.pathLen--;
  me.pathLen--;
  if(me.pathLen>=0){
  me.target.x = me.path[me.pathLen].x;
  me.target.y = me.path[me.pathLen].y; 
  this.step.set(me.target.x - me.x, me.target.y - me.y);
  }
  this.currFrame = frameCount;     
  }
  else{
  if(me.pathFound===1){
  me.x+=this.step.x/20;
  me.y+=this.step.y/20; 
  if(me.x===me.target.x&&me.y===me.target.y){
  me.pathLen--;
  if (me.pathLen > 0) {
  me.target.x = me.path[me.pathLen].x;
  me.target.y = me.path[me.pathLen].y;
  this.step.set(me.target.x - me.x, me.target.y - me.y);
  }
  else {
  me.target.x = me.finalDest.x;
  me.target.y = me.finalDest.y;
  this.step.set(me.target.x - me.x, me.target.y - me.y);
  }
  } 
  }
  }    
  } 
  }
  
}

var target, targetPos, finalDest;
var graph = [];
var cost = [];
var inq = [];
var comefrom = [];
var path = [];
var q = [];
var pathLen = 0;
var pathFound = 0;
var qLen = 0;
var qStart = 0;

/*A start path*/
var findAStarPath = function(x, y,me) {
var i, j, a, b;
me.qLen = 0;
me.graph[x][y] = 1;
me.inq[x][y] = 1;
me.q[me.qLen].set(x, y);
me.q[me.qLen].fcost = 0;
me.qLen++;
me.pathLen = 0;
me.qStart = 0;
while ((me.qStart < me.qLen) && (me.pathFound === 0)) {
findMinInQ(me);
i = me.q[me.qStart].x;
j = me.q[me.qStart].y;
me.graph[i][j] = 1;
me.qStart++;
if ((i === me.targetPos.x) && (j === me.targetPos.y)) {
me.pathFound = 1;
me.path[me.pathLen].set(j*20+10, i*20+10);
me.pathLen++;
}
a = i+1;
b = j;
if ((a < 20) && (me.pathFound === 0)) {
if ((me.graph[a][b] === 0) && (me.inq[a][b] === 0)) {
setComeFrom(a, b, i, j,me);
}
}
a = i-1;
b = j;
if ((a >= 0) && (me.pathFound === 0)) {
if ((me.graph[a][b] === 0) && (me.inq[a][b] === 0)) {
setComeFrom(a, b, i, j,me);
}
}
a = i;
b = j+1;
if ((b < 20) && (me.pathFound === 0)) {
if ((me.graph[a][b] === 0) && (me.inq[a][b] === 0)) {
setComeFrom(a, b, i, j,me);
}
}
a = i;
b = j-1;
if ((b >= 0) && (me.pathFound === 0)) {
if ((me.graph[a][b] === 0) && (me.inq[a][b] === 0)) {
setComeFrom(a, b, i, j,me);
}
}
}   // while
while ((i !== x) || (j !== y)) {
a = me.comefrom[i][j].x;
b = me.comefrom[i][j].y;
me.path[me.pathLen].set(b*20 + 10, a*20+10);
me.pathLen++;
i = a;
j = b;
}

};

var findMinInQ = function(me) {
var min = me.q[me.qStart].fcost;
var minIndex = me.qStart;
for (var i = me.qStart+1; i<me.qLen; i++) {
if (me.q[i].fcost < min) {
min = me.q[i].qStart;
minIndex = i;
}
}
if (minIndex !== me.qStart) {  // swap
var t1 = me.q[minIndex].x;
var t2 = me.q[minIndex].y;
var t3 = me.q[minIndex].fcost;
me.q[minIndex].x = me.q[me.qStart].x;
me.q[minIndex].y = me.q[me.qStart].y;
me.q[minIndex].fcost = me.q[me.qStart].fcost;
me.q[me.qStart].x = t1;
me.q[me.qStart].y = t2;
me.q[me.qStart].fcost = t3;
}
};



var setComeFrom = function(a, b, i, j,me) {
me.inq[a][b] = 1;
me.comefrom[a][b].set(i, j);
me.q[me.qLen].set(a, b);
me.cost[a][b] = me.cost[i][j] + 10;
me.q[me.qLen].fcost = me.cost[a][b] + dist(b*20+10, a*20+10, me.finalDest.x,me.finalDest.y);
me.qLen++;
};

var xcor=0;
var ycor=0;
var game=0;
var freeze=false;
var walls=[];
var pillets=[];
var ices=[];
var enemys=[];
var mainchar;
var pilletscount=0;
/*initial the tilemap */
function initialize() {
for (var i=0; i<tilemap.length; i++) {
for (var j = 0; j < tilemap[i].length; j++) {
switch (tilemap[i][j]) {
case 'w': walls.push(new wallObj(j*20,i*20));
          graph[i][j] = -1;
break;
case '+':pillets.push(new pilletObj(j*20,i*20));
          graph[i][j] = 0;
break;
case 'p':ices.push(new freezeObj(j*20,i*20));
          graph[i][j] = 0;
break;
case 'E':enemys.push(new enemyObj(j*20,i*20));
         graph[i][j] = 0;
break;
case 'M':mainchar=new maincharObj(j*20,i*20);
        graph[i][j] = 0;
break;
case '-': graph[i][j] = 0;
break;
}
}
}
}
/*draw the background objs */
function drawbackground(){
for(var i=0;i<walls.length;i++){
  walls[i].draw();
}  
for(i=0;i<pillets.length;i++){
  if(pillets[i].death===0){
  pillets[i].draw();
  }
}    
for(i=0;i<ices.length;i++){
  if(ices[i].death===0){
  ices[i].draw();
  }
}  
}
/*initialize every variables to play again */
function refresh(){
  game=0;
  mainchar.x=mainchar.originx;
  mainchar.y=mainchar.originy;
  for(var i=0;i<enemys.length;i++){
    enemys[i].x=enemys[i].originx+10;
    enemys[i].y=enemys[i].originy+10;  
    enemys[i].currstate=0;
    enemys[i].currFrame=frameCount;
    enemys[i].delay=false;
    enemys[i].pathFound=0;
    enemys[i].state[0].currFrame=frameCount;
    enemys[i].state[1].currFrame=frameCount;
  }
  for(i=0;i<pillets.length;i++){
  pillets[i].death=0;
  }
  for(i=0;i<ices.length;i++){
  ices[i].death=0;
  }
  pilletscount=0;
  freeze=false;
  xcor=0;
  ycor=0;
}

function mouseClicked(){
  if(game>0){
    refresh();
  }
}

var initGraph = function(x, y,me) {
for (var i = 0; i< 20; i++) {
for (var j = 0; j<20; j++) {
if (me.graph[i][j] > 0) {
me.graph[i][j] = 0;
}
me.inq[i][j] = 0;
me.cost[i][j] = 0;
}
}
me.graph[x][y] = 1;
};


function setup() {
createCanvas(400, 400);
graph = new Array(20);
for (var i=0; i<20; i++) {
graph[i] = new Array(20);
}
initialize();

enemys[0].graph=graph.slice(0);
enemys[1].graph=graph.slice(0);
enemys[2].graph=graph.slice(0);
enemys[3].graph=graph.slice(0);
enemys[4].graph=graph.slice(0);


enemys[0].extraframe=0;
enemys[1].extraframe=5;
enemys[2].extraframe=10;
enemys[3].extraframe=15;
enemys[4].extraframe=20;


}

function draw() {
  background(250);
  if(game===0){
  push();
  translate(xcor,ycor);
  drawbackground();
  for(var i=0;i<enemys.length;i++){
  enemys[i].draw();  
  enemys[i].state[enemys[i].currstate].execute(enemys[i]);
  }  
  mainchar.draw();
  mainchar.move();
  mainchar.checkcollision();
  if(freeze){
    for( i=0;i<enemys.length;i++){
      enemys[i].currstate=1;    
      enemys[i].state[enemys[i].currstate].currFrame=frameCount;
      enemys[i].pathFound=0;
    }
    freeze=false;
  }
  if(pilletscount===pillets.length){
    game=1;
  }
  pop();
  }
  else if(game===1){/*game win */
    background(255,144,144);
    textSize(40);
    fill(0,255,0);
    text("You are win", 100,180);
    textSize(18);
    text("Click any place on the screen to play again", 50,200);

  }
  else if(game===2){/*game lose */
    background(255,144,144);
    textSize(40);
    fill(255,0,0);
    text("You are lose", 100,180);
    textSize(18);
    text("Click any place on the screen to play again", 50,200);

  }

}