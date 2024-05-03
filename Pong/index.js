class PlayBoard{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.topRight = width;
        this.topLeft = 0;
        this.bottomRight = height;
        this.bottomLeft = 0;
        this.borders=[[this.topLeft,this.bottomLeft],[this.topRight,this.bottomRight]];
    }
    draw(){
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,this.width,this.height);
    }
}
class Controls{
    constructor(playernumber){
        this.top = false;
        this.bottom = false;
        this.playernumber = playernumber;
        this.addKeyboardListeners();

        
    }
    keydown(event){
        let up ="";
        let down ="";
        if (this.playernumber==2) {
            up = "ArrowUp";
            down = "ArrowDown";
        }
        else{
            up = "w";
            down = "s";
        }
        switch(event.key){
            case up:
                this.top = true;
                break;
            case down:
                this.bottom = true;
                break;
        }
    }
    keyup(event){
        let up ="";
        let down ="";
        if (this.playernumber==2) {
            up = "ArrowUp";
            down = "ArrowDown";
        }
        else{
            up = "w";
            down = "s";
        }
        switch(event.key){
            case up:
                this.top = false;
                break;
            case down:
                this.bottom = false;
                break;
        }
    }
    addKeyboardListeners(){
        document.addEventListener('keydown',(event)=>this.keydown(event));
        document.addEventListener('keyup',(event)=>this.keyup(event));
    }
}
class Player{
    constructor(playernumber){
        this.playernumber = playernumber;
        this.Controls = new Controls(playernumber);
        this.speed=0;
        this.y=canvas.height/2-60;
        this.acceleration = 6;
        if(playernumber==1){
            this.borders=[this.y,this.y+120]
        }
        else{
            this.borders=[this.y+10,this.y+10+120]
        }
        switch (playernumber) {
            case 1:
                this.x = 10;
                break;
            case 2:
                this.x = canvas.width-20;
            default:
                break;
        }
    }
    draw(){
        switch (this.playernumber) {
            case 1:
                ctx.fillStyle = 'red';
                ctx.fillRect(this.x,this.y,10,120);
                break;
            case 2:
                ctx.fillStyle='lime';
                ctx.fillRect(this.x,this.y,10,120);
            default:
                break;
        }
    }
    update(){
        this.#move();
    }
    #move(){
        if(this.Controls.top){
            if(this.y<0){
                this.speed=0;
            }
            else{
            this.speed+=this.acceleration;
            }
        }
        if(this.Controls.bottom){
            if(this.y+120>=canvas.height){
                this.speed=0;
            }
            else{
            this.speed-=this.acceleration;
            }
        }
        if(this.speed > this.acceleration){
            this.speed = this.acceleration;
        }
        if(this.speed < -this.acceleration){
            this.speed = -this.acceleration;
        }
        if(!this.Controls.top && !this.Controls.bottom){
            this.speed = 0;
        }

        this.y -= this.speed;
    }

}
class Ball{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.radius=10;
        this.e = Math.round(Math.random()) === 1 ? 1 : -1;
        this.speedx = 6*this.e;
        this.e = Math.round(Math.random()) === 1 ? 1 : -1;
        this.speedy = 6*this.e;
        this.acceleration = 1;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
    }
    update(borders){
        if (this.y >= canvas.height) {
            this.speedy = -this.speedy;
        }
        if (this.y < 0) {
            this.speedy = -this.speedy;
        }
        if((this.x>10 && this.x<20) && (this.y>player1.y && this.y<player1.y+120)){
            this.speedx = -this.speedx;
        }
        if((this.x > canvas.width-20 && this.x <canvas.width-10) && (this.y>player2.y && this.y<player2.y+120)){
            this.speedx = -this.speedx-this.acceleration;
            this.acceleration+=1;
        }
        if(this.x<0){
            player2Score++;
            this.x = canvas.width/2;
            this.y = canvas.height/2;
            this.e = Math.round(Math.random()) === 1 ? 1 : -1;
            this.speedx = 6*this.e;
            this.e = Math.round(Math.random()) === 1 ? 1 : -1;
            this.speedy = 6*this.e;
            this.acceleration = 1;
        }
        if(this.x>canvas.width){
            player1Score++;
            this.x = canvas.width/2;
            this.y = canvas.height/2;
            this.e = Math.round(Math.random()) === 1 ? 1 : -1;
            this.speedx = 6*this.e;
            this.e = Math.round(Math.random()) === 1 ? 1 : -1;
            this.speedy = 6*this.e;
            this.acceleration = 1;
        }
        
        this.x += this.speedx;
        this.y += this.speedy;
        
        
    
    }

}
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    player1.update();
    player2.update();
    ball.update(playBoard.borders);

    playBoard.draw();
    player1.draw();
    player2.draw();
    ball.draw();

    document.querySelector('.scpl1').innerHTML=player1Score
    document.querySelector('.scpl2').innerHTML=player2Score;
    requestAnimationFrame(animate);
}

const canvas = document.getElementById('canvas');
canvas.width = 1000;
canvas.height = 400;
const ctx = canvas.getContext('2d');

const player1 = new Player(1);
const player2 = new Player(2);
const ball = new Ball(canvas.width/2,canvas.height/2);
const playBoard = new PlayBoard(canvas.width,canvas.height);

let player1Score = document.querySelector('.scpl1').innerHTML;
let player2Score = document.querySelector('.scpl2').innerHTML;

animate();
