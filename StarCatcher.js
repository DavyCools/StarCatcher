var mouse = {};
var aantalSterren = 10;
var speed = 1;
var score = 0;
var levens = 10;
var level = 1;
var RotateTeller = 0;
var ctx;
function init() {
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    Update();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.getElementById('canvas').style.cursor = "none";
}


function trackPosition(pos) {
  mouse.x = pos.pageX;
  mouse.y = pos.pageY;
}
document.addEventListener("mousemove", trackPosition, true);

//Definieren heks en ster
function heks(x, y, w, h) {
  this.heksX = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.Draw = function (ctx) {
    var img = new Image();
    img.src = "images/witch.png";
    ctx.drawImage(img, this.x, this.y, this.w, this.h);
  };
}
function ster(x, y, w, h, vx, vy) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.vx = vx;
  this.vy = vy;
  this.Draw = function (ctx) {
    var img = new Image();
    img.src = "images/star.png";
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(RotateTeller*Math.PI/180);
    ctx.drawImage(img,-(this.w/2),-(this.h/2),this.w,this.h);
    ctx.restore();
  };
}

//Aanmaken van een heks en x aantal sterren
var h1 = new heks(window.innerWidth / 2, window.innerHeight / 2, 50, 50);
var sterren = [];
for (i = 0; i < aantalSterren; i++) {
  sterren[i] = new ster(
      Math.floor(Math.random() * (window.innerWidth - 50)), Math.floor(Math.random() * 50),
      50,
      50,
      (Math.random() - 0.5) * speed,
      Math.random() * speed);
}
//Verbergen sterren wanneer heks sterren raakt
//https://forums.adobe.com/thread/1865523
function collide(heks, ster) {
  if (heks.x < ster.x + ster.w && heks.x + heks.w > ster.x && heks.y < ster.y + ster.h && heks.y + heks.h > ster.y) {
    ster.x = Math.floor(Math.random() * (window.innerWidth - 50));
    ster.y = Math.floor(Math.random() * 50);
    ster.vx = (Math.random() - 0.5) * speed;
    ster.vy = Math.random() * speed
    score++;
  }
}


function Update() { 
    //leegmaken canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    RotateTeller++;
    if (levens > 0 && score < 100){
        //Tekenen van de heks + sterren
        h1.Draw(ctx);
        for (i = 0; i < aantalSterren; i++) {
            sterren[i].Draw(ctx);
        }
        //Tekenen van het scoreboard
        //https://www.w3schools.com/graphics/canvas_text.asp
        ctx.fillStyle = "white";
        ctx.font = "15px sans-serif";
        ctx.fillText("Level: " + level,10,20)
        ctx.fillText("Levens: " + levens,10,40);
        ctx.fillText("Score: " + score,10,60);
    //----- Updaten -----
        //Heks muis laten volgen
        if (mouse.x && mouse.y) {
            h1.x = mouse.x - h1.w / 2;
            h1.y = mouse.y - h1.h / 2;
        }
        //Sterren laten bewegen
        for (i = 0; i < aantalSterren; i++) {
            sterren[i].x += sterren[i].vx;
            sterren[i].y += sterren[i].vy;
        }
        //Controles
        for (i = 0; i < aantalSterren; i++) {
            //Controleren of sterren de zijkant raken
            if (sterren[i].x > window.innerWidth - sterren[i].w || sterren[i].x < 0) {
            sterren[i].vx *= -1
            }
            //Controleren of sterren de grond raken
            if (sterren[i].y > window.innerHeight - sterren[i].h) {
            sterren[i].x = Math.floor(Math.random() * (window.innerWidth - 50));
            sterren[i].y = Math.floor(Math.random() * 50);
            sterren[i].vx = (Math.random() - 0.5) * speed;
            sterren[i].vy = Math.random() * speed;
            levens --;
            }
        }

        //Collision detection
        for (i = 0; i < aantalSterren; i++) {
            collide(h1, sterren[i]);
        }

        //Timer
        if (score == 25 && level == 1){
            speed = 2;
            level = 2;
            for (i = 0; i < aantalSterren; i++) {
                sterren[i] = new ster(
                Math.floor(Math.random() * (window.innerWidth - 50)), Math.floor(Math.random() * 50),
                50,
                50,
                (Math.random() - 0.5) * speed,
                Math.random() * speed);
}
        }
        else if (score == 50 && level == 2){
            speed = 3;
            level = 3;
            for (i = 0; i < aantalSterren; i++) {
                sterren[i] = new ster(
                Math.floor(Math.random() * (window.innerWidth - 50)), Math.floor(Math.random() * 50),
                50,
                50,
                (Math.random() - 0.5) * speed,
                Math.random() * speed);
}
        }
        else if (score == 75 && level ==3){
            speed = 4;
            level = 4;
            for (i = 0; i < aantalSterren; i++) {
                sterren[i] = new ster(
                Math.floor(Math.random() * (window.innerWidth - 50)), Math.floor(Math.random() * 50),
                50,
                50,
                (Math.random() - 0.5) * speed,
                Math.random() * speed);
}
        }
        setTimeout(Update, 1);
    }
    else {
        //tekenen knop
        document.getElementById('canvas').style.cursor = "default";
        var button = document.getElementById("button");
        button.style.display = "inline";
        button.style.top = (window.innerHeight / 2) + "px";
        button.style.left = (window.innerWidth / 2) - 50 + "px";
        button.onclick = function(){Herstarten()};
        function Herstarten(){
            speed = 1;
            score = 0;
            levens = 10;
            level = 1;
            RotateTeller = 0;
            for (i = 0; i < aantalSterren; i++) {
                sterren[i] = new ster(
                Math.floor(Math.random() * (window.innerWidth - 50)), Math.floor(Math.random() * 50),
                50,
                50,
                (Math.random() - 0.5) * speed,
                Math.random() * speed);
            }
            location.reload();
        }
    }
    //Initieren van verliezen
    //https://www.w3schools.com/graphics/canvas_text.asp
    if (levens <= 0){
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 5;
        ctx.strokeRect((window.innerWidth / 2) - 250,(window.innerHeight / 2) - 175,500 ,150);
        ctx.font = "50px sans-serif";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Je bent verloren!",(window.innerWidth / 2),(window.innerHeight / 2) - 85);
        ctx.font = "25px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText("Je score: " + score,(window.innerWidth / 2),(window.innerHeight / 2) - 45);
        //Button kleur geven
        button.style.backgroundColor = "#FF0000";
        button.style.borderColor = "#FF0000";
    }
    //Initieren van winnen
    //https://www.w3schools.com/graphics/canvas_text.asp
    if (score >= 100){
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 5;
        ctx.strokeRect((window.innerWidth / 2) - 250,(window.innerHeight / 2) - 175,500 ,150);
        ctx.font = "50px sans-serif";
        ctx.fillStyle = "#00FF00";
        ctx.textAlign = "center";
        ctx.fillText("Je bent gewonnen!",(window.innerWidth / 2),(window.innerHeight / 2) - 85); 
        ctx.font = "25px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText("Je score: " + score,(window.innerWidth / 2),(window.innerHeight / 2) - 45);
        //Button kleur geven
        button.style.backgroundColor = "#00FF00";
        button.style.borderColor = "#00FF00";
    }
}