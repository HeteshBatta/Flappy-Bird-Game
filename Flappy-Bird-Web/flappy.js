var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var ps = new Image();
var pn = new Image();

bird.src = 'file:///C:/Users/Hetesh%20Batta/Desktop/Study/CST/Flappy-Bird-Web/bird.png';
bg.src = 'file:///C:/Users/Hetesh%20Batta/Desktop/Study/CST/Flappy-Bird-Web/bg.png';
fg.src = 'file:///C:/Users/Hetesh%20Batta/Desktop/Study/CST/Flappy-Bird-Web/fg.png';
ps.src = 'file:///C:/Users/Hetesh%20Batta/Desktop/Study/CST/Flappy-Bird-Web/pipeSouth.png';
pn.src = 'file:///C:/Users/Hetesh%20Batta/Desktop/Study/CST/Flappy-Bird-Web/pipeNorth.png';

var fly = new Audio();
var scoreAudio = new Audio();

fly.src = 'file:///C:/Users/Hetesh%20Batta/Desktop/Study/CST/Flappy-Bird-Web/fly.mp3';
scoreAudio.src = 'file:///C:/Users/Hetesh%20Batta/Desktop/Study/CST/Flappy-Bird-Web/score.mp3'

var gap = 85;
var constant;
var bX = 10;
var bY = 150;
var gravity = 1.5;
var score = 0;

document.addEventListener("keydown" , function(abc)
{
  bY-=25;
  fly.play();
});


var pipe = []

pipe[0]={
  x : canvas.width,
  y : 0
}


function draw()
{
  ctx.drawImage(bg,0,0);

  for(var i=0;i<pipe.length;i++)
  {
    constant = pn.height+gap;
    ctx.drawImage(pn,pipe[i].x,pipe[i].y);
    ctx.drawImage(ps,pipe[i].x,pipe[i].y+constant);

  pipe[i].x--;

  if( pipe[i].x == 125 )
  {
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random()*pn.height)-pn.height
                     });
  }

  if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pn.width && (bY <= pipe[i].y + pn.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  canvas.height - fg.height){
    alert("Your score is " + score);
    location.reload(); // reload the page
}

  if(pipe[i].x==5)
  {
    score++;
    scoreAudio.play();
  }
}

  ctx.drawImage(fg,0,canvas.height - fg.height);
  ctx.drawImage(bird,bX,bY);
  bY+=gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px verdana";
  ctx.fillText("Score : "+score , 10 , canvas.height-20);


  requestAnimationFrame(draw);
}

draw();
