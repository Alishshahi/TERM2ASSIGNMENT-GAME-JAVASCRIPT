var upPressed =    false;
var downPressed =  false;
var leftPressed =  false;
var rightPressed = false;
var lastPressed =  false;
var spacePressed = false;
var Pressed =      false;
var value = 0;


function keyup(event) {
        var player = document.getElementById('player');
        if (event.keyCode == 37) {
              leftPressed = false;
              lastPressed = 'left';
        }
        if (event.keyCode == 39) {
              rightPressed = false;
              lastPressed = 'right';
        }
        if (event.keyCode == 38) {
              upPressed = false;
              lastPressed = 'up';
        }
        if (event.keyCode == 40) {
            downPressed = false;
            lastPressed = 'down';
        }
       if (event.keyCode == 32){
              spacePressed = false;
              lastPressed = 'space';
          
        }

        player.className = 'character stand ' + lastPressed;

             
}


function move() {
        var player = document.getElementById('player');
        var positionLeft = player.offsetLeft;
        var positionTop = player.offsetTop;
        if (downPressed) {
                var newTop = positionTop+1;
                var element = document.elementFromPoint(player.offsetLeft, newTop+32);
                if (element.classList.contains('sky') == false) {
                        player.style.top = newTop + 'px';       
                }

                if (leftPressed == false) {
                        if (rightPressed == false) {
                                player.className = 'character walk down';
                        }
                }
        }
        if (upPressed) {
                var newTop = positionTop-1;
                var element = document.elementFromPoint(player.offsetLeft, newTop);
                if (element.classList.contains('sky') == false) {
                        player.style.top = newTop + 'px';       
                }
                
                if (leftPressed == false) {
                        if (rightPressed == false) {
                                player.className = 'character walk up';
                        }
                }
        }
        if (leftPressed) {
                var newLeft = positionLeft-1;
                var element = document.elementFromPoint(newLeft, player.offsetTop);
                if (element.classList.contains('sky') == false) {
                        player.style.left = newLeft + 'px';     
                }


                player.className = 'character walk left';
        }
        if (rightPressed) {
                var newLeft = positionLeft+1;
                var element = document.elementFromPoint(newLeft+32, player.offsetTop);
                if (element.classList.contains('sky') == false) {
                        player.style.left = newLeft + 'px';             
                }

                player.className = 'character walk right';
        }

     
           }   


function keydown(event) {
        if (event.keyCode == 37) {
                leftPressed = true;
        }
        if (event.keyCode == 39) {
                rightPressed = true;
        }
        if (event.keyCode == 38) {
                upPressed = true;
        }
        if (event.keyCode == 40) {
                downPressed = true;
        }

        if (event.keyCode == 40) {
                downPressed = true;

        }
         if (event.keyCode == 32) {
                // Spacebar (fire)
                spacePressed = true;
           
           }
}

//start button//
    function startbtn(){
    var btn = document.getElementsByClassName('start');
    btn[0].addEventListener('click', GetReady);
  }

    // Get Ready to start the game //
    function GetReady(){
      var ready = document.getElementsByClassName('start');
      ready[0].firstChild.nodeValue = 'Get Ready';
      setTimeout(myLoadFunction, 800);

  }


//random bombs created at top of the screen//
  function bombgenerate() {
   var rocket = document.createElement('div');
   rocket.classList.add('bomb');
   rocket.style.left = Math.floor(Math.random() * 1300) + 'px';
   document.getElementsByTagName('body')[0].appendChild(rocket);     
  }

  function bombcall1() {
    FirstInterval=setInterval(bombgenerate, 1200);
  }

 //bomb drop down//
  function bombdrop() {
   var rockets = document.getElementsByClassName('bomb');
    for (var i = 0; i < rockets.length; i++) {//getting each rocket
    var rocket = rockets[i];   
  //bomb fall down on random point in ground//
       var randomheight = [];
       randomheight[0] = '566px';
       randomheight[1] = '556px';
       randomheight[2] = '546px';
       randomheight[3] = '536pxpx'; 
       randomheight[4] = '526px';
       randomheight[5] = '512px';
      var position = Math.ceil( Math.random() * 6);  
      if(rockets[0].style.top  == randomheight[position]){
      clearInterval(rocket);
      rockets[0].className = 'explosion';
       setTimeout(explosion, 700); 
    }

     if (positionTop + 80 == window.innerHeight) {
       clearInterval(rocket);
       rockets[0].className = 'explosion';
       setTimeout(explosion, 700); 
     }
      var positionTop = rocket.offsetTop;
      rocket.style.top = positionTop + 1 + 'px';
     }
  }





  function bombcall2() {
    SecondInterval =  setInterval( bombdrop, 9);
  }

// arrow created //
  function arrowup() {         
   var main = document.getElementsByTagName('body')[0];
   var arrows = document.createElement('div');
   arrows.className = 'arrow up';
   var  player = document.getElementById('player');
   var playerleft = player.offsetLeft;
   var playertop = player.offsetTop;
   arrows.style.top = playertop + 'px';
   arrows.style.left = playerleft + 'px';
   main.appendChild(arrows); 
}
  //spacepressed to fire arrow//
  function moved() {
   if (spacePressed){
   if (Pressed == false){
    arrowup();
    Pressed  = true;
    setTimeout(function(){
    Pressed = false;
    },500);
  }     
    player.className = 'character stand up fire';
  }  
  }
    // arrow fire loop //
  function arrowloop() { 
   var arrow = document.getElementsByClassName('arrow up');
   for (var i = 0; i < arrow.length; i++) {
   var arrows = arrow[i];
   if (arrows.style.top == '20px'){
   arrow[i].remove();
   clearInterval(arrows);
  }
   var positionTop = arrows.offsetTop;
   arrows.style.top = positionTop - 1 + 'px';  
  }
}
  function timeset(){
   ThirdInterval = setInterval(arrowloop, 5);}

  // explode bomb //
   function explosion(){
   var rock = document.getElementsByClassName('explosion');
   for (var i = 0; i < rock.length; i++) {
   rock[i].style.display = 'none';
  }
   score();
}

    //Collision detection between player and bombs//
    function collisiondetection1() {
        var rocket = document.getElementsByClassName('bomb');
        for (var i=0; i < rocket.length; i++){
        if (rocket[i].offsetTop +  rocket[i].offsetHeight > player.offsetTop &&
        rocket[i].offsetLeft + rocket[i].offsetWidth > player.offsetLeft &&
        rocket[i].offsetTop < player.offsetTop + player.offsetHeight &&
        rocket[i].offsetLeft < player.offsetLeft + player.offsetWidth) {
        var explode = document.createElement('div');
        explode.className = 'explosion';
        explode.style.top = rocket[i].style.top;
        explode.style.left = rocket[i].style.left;
        setTimeout(explosion, 200);
        ClearHealth();
        document.body.appendChild(explode);
        rocket[i].remove();
     }
   }
}
      //Collision detection between arrows and bombs//
        function collisiondetection2() {
        var rocket = document.getElementsByClassName('bomb');
        var arrow = document.getElementsByClassName('arrow up');
        for (var j=0; j < rocket.length; j++){
        for (var k=0; k < arrow.length; k++){
        if (rocket[j].offsetTop +  rocket[j].offsetHeight > arrow[k].offsetTop &&
        rocket[j].offsetLeft + rocket[j].offsetWidth > arrow[k].offsetLeft &&
        rocket[j].offsetTop < arrow[k].offsetTop + arrow[k].offsetHeight &&
        rocket[j].offsetLeft < arrow[k].offsetLeft + arrow[k].offsetWidth) {
        var explode = document.createElement('div');
        explode.className = 'explosion';
        explode.style.top = arrow[k].style.top;
        explode.style.left = arrow[k].style.left;
        setTimeout(explosion, 200);        
        document.body.appendChild(explode);
        rocket[j].remove();  
        arrow[k].remove();
           
       }
     }
   }
 }
         // Dead Animation  //
        function ClearHealth(){
         var dead = document.getElementById('player');
         var life = document.getElementsByTagName('li');
         dead.className = 'character hit left';
         if (dead.className == 'character hit left'){
         life[0].parentNode.removeChild(life[0]);
         if(life[0] == undefined){
         dead.className = 'character dead';
         Gameover();
         displayname();
         Highscore();
         restart();   
        }
      }
    }

  // Game over //
 function Gameover(){    
      setTimeout(function(){
      var rockets = document.getElementsByClassName('bomb');
      for (var i=0; i < rockets.length; i++){
      rockets[i].style.display = 'none';}
      var endofplay = document.createElement('div'); 
      endofplay.className = 'over';
      endofplay.style.position = 'absolute';
      endofplay.style.top = '30%';
      endofplay.style.left = '40%';
      endofplay.style.fontSize = '50px';
      endofplay.style.fontWeight = '700';
      endofplay.style.fontFamily = 'Games'; 
      endofplay.style.color = '#28655E';
      var textNode = document.createTextNode('GAME OVER');
      document.getElementsByTagName('body')[0].appendChild(endofplay);
      endofplay.appendChild(textNode);
      clearInterval(FirstInterval);
      clearInterval(SecondInterval);
       }, 1000);    
    }



   // High Score of the game //
    function Highscore(){
      setInterval(function(){
      var highscore = document.createElement('div'); 
      highscore.className = 'Highscore';
      highscore.style.position = 'absolute';
      highscore.style.top = '35%';
      highscore.style.left = '36%';
      highscore.style.fontSize = '40px';
      highscore.style.fontWeight = '700';
      highscore.style.fontFamily = 'Games'; 
      highscore.style.color = '#821b10';
      var textNode = document.createTextNode(yourname + ' Your high score :  '   +  value);
      document.getElementsByTagName('body')[0].appendChild(highscore);
      highscore.appendChild(textNode);
    },2500);
 }

    //scoring game//
  function scores (){
    var points = document.getElementsByClassName('hud')[0];
    var create = document.createElement('div'); 
    create.className = 'scorediv';
    create.style.fontSize= '20px'; 
    create.style.fontWeight = 'bold'; 
    create.style.color = '#4d4d4d';
    create.style.paddingLeft = '10px';
    create.style.margin = '10px';
    create.style.position = 'absolute';
    create.style.top = '80%';
    create.style.left ='90%';
    var textNode = document.createTextNode('Score :  ' + value);
    points.appendChild(create);
    create.appendChild(textNode); 
}
  function score(){
    var create = document.getElementsByClassName('scorediv')[0];
    create.style.color = '#003b64';
    value = ++value;
    create.firstChild.nodeValue = 'Score : ' +  value;
  }

  function displayname(){
    setTimeout(function(){
      yourname = prompt('Enter Your Name');
    },2500);
  }


// restart game //
  function restart(){   
   setInterval(function(){
   var highscore = document.getElementsByClassName('over')[0];
   highscore.style.display = 'none';
   var btn = document.getElementsByClassName('start');
   btn[0].firstChild.nodeValue= 'PLAY AGAIN?';
   btn[0].style.display = 'block';
   btn[0].addEventListener('click', restartgame);
   var create = document.getElementsByClassName('scorediv')[0];
   create.style.display = 'none';
   }, 2500);
}
  // reload game //
function restartgame(){
    window.location.reload();
}
   //call function//
function myLoadFunction() {
        timeout = setInterval(move, 10);
        timeout2 = setInterval(moved, 50);
        document.addEventListener('keydown', keydown);
        document.addEventListener('keyup', keyup);
        var btn = document.getElementsByClassName('start');
        btn[0].style.display = 'none';
        bombcall1();
        bombcall2();
        setInterval(collisiondetection1, 10);
        setInterval(collisiondetection2, 10);
        scores();
        timeset();  
    }   

document.addEventListener('DOMContentLoaded', startbtn);