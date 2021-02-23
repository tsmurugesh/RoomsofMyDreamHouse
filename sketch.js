/***********************************************************************************
	SimpleStateMachine - TEMPLATE
	by Scott Kildall

	Template:

	(1) Add your own PNG files in the assets folder. Make sure they match the names ***exactly*** of the existing PNGs.
	(2) Add custom drawing code to drawOne(), drawTwo(), drawThree(), drawFour(), drawFive()
	(3) You can add your own interfaces - keys, mouse events, etc in the Interfaces section

	Also start your localhost before running this, otherwise no PNGs will display

------------------------------------------------------------------------------------
	The way it works — you don't need to know this for the template use
	* array of images gets loaded at startup
	* drawFunction is a VARIABLE that points to a function varible name
	* drawOne(), drawTwo(), etc. are set to be functions.
	* the the keys 1-5 will change the drawFunction variable

------------------------------------------------------------------------------------
	Notes:
	- a more advanced state machine with use array-indexing for each of
		images the draw functions, but this is just for illustrative purposes

	- even more advanced will be to put the draw functions into an array, would
		be helpful for randomizing, go to the next function, etc

	- next step after that would be to put interfaces into an array that maps to
		the functions


***********************************************************************************/
// Array of images
var images = [];

// variable that is a function 
var drawFunction;

// offset from bottom of screen
let capture;

// load all images into an array
function preload() {
  images[0] = loadImage('assets/living.PNG');
  images[1] = loadImage('assets/bed.PNG');
  images[2] = loadImage('assets/comp.PNG');
  images[3] = loadImage('assets/kitchen.PNG');
  images[4] = loadImage('assets/bath.PNG');
  images[5] = loadImage('assets/pool.PNG');
  images[6] = loadImage('assets/mirror.PNG');


}

// Center drawing, drawFunction will be one for default
function setup() {
  createCanvas(800, 600);

  // Center our drawing objects
  imageMode(CENTER);
  textAlign(CENTER);
  textSize(24);

  //creating capture
  capture = createCapture(VIDEO);
  capture.size(800, 600);
  capture.hide();

  // set to one for startup
  drawFunction = drawOne;
}

// Very simple, sets the background color and calls your state machine function
function draw() {
  background(192);
  // will call your state machine function
  drawFunction();

  drawDebugInfo();

}

//========= TEMPLATE: modify these functions, INSIDE the function blocks only =========

//-- drawOne() will draw the image at index 0 from the array. LIVING ROOM
drawOne = function() {
   image(images[0],width/2, height/2);

   //press ENTER to go to bedroom
   if (keyIsPressed){
      if (keyCode === ENTER){
        drawFunction = drawTwo;
      }
    }

    // click to kitchen
    if (mouseIsPressed){
      if (mouseX >= 75 && mouseX <= 125){
        if(mouseY >= 90 && mouseY <= 160){
            drawFunction = drawFour;
        }
      }
      // click sign to pool
      else if (mouseX >= 615 && mouseX <= 730){
        if(mouseY >= 0 && mouseY <= 60){
            drawFunction = drawSix;
        }
      }
    }
}

//-- drawTwo() will draw the image at index 1 from the array. BEDROOM
drawTwo = function() {
   image(images[1],width/2, height/2);

   //pressing backspace takes you to the living room
   if (keyIsPressed){
      if (keyCode === BACKSPACE){
        drawFunction = drawOne;
      }
    }

    //clicking on the monitor takes you to the computer room
    if (mouseIsPressed){
      if (mouseX >= 0 && mouseX <= 105){
        if(mouseY >= 205 && mouseY <= 290){
            drawFunction = drawThree;
        }
      }
      else if (mouseX >= 600 && mouseX <= 800){
        if(mouseY >= 390 && mouseY <= 460){
            drawFunction = drawFive;
        }
      }
    }
}

//-- drawOne() will draw the image at index 2 from the array. COMPUTER
drawThree = function() {
   image(images[2],width/2, height/2);

    if (keyIsPressed){
      if (keyCode === ESCAPE){
        drawFunction = drawTwo;
      }
    }
}

//-- drawOne() will draw the image at index 3 from the array. KITCHEN
drawFour = function() {
   image(images[3],width/2, height/2);
   if (mouseIsPressed){
      if (mouseX >= 560 && mouseX <= 650){
        if(mouseY >= 320 && mouseY <= 440){
            drawFunction = drawOne;
        }
      }
    }
 }

//-- drawOne() will draw the image at index 4 from the array. BATHROOM
drawFive = function() {
   image(images[4],width/2, height/2);

   // look at mirror
    if( key === 'm' ) {
      drawFunction = drawSeven;
  }

    // click back to pool
    if (mouseIsPressed){
      if (mouseX >= 570 && mouseX <= 800){
        if(mouseY >= 480 && mouseY <= 600){
            drawFunction = drawSix;
        }
      }
      // click back to bedroom
      else if (mouseX >= 0 && mouseX <= 80){
        if(mouseY >= 250 && mouseY <= 460){
            drawFunction = drawTwo;
        }
      }
    }
}

//-- drawOne() will draw the image at index 5 from the array. POOL
drawSix = function() {
   image(images[5],width/2, height/2);

    // click back to bathroom
    if (mouseIsPressed){
      if (mouseX >= 560 && mouseX <= 700){
        if(mouseY >= 110 && mouseY <= 330){
            drawFunction = drawFive;
        }
      }
      // click back to living room
      else if (mouseX >= 70 && mouseX <= 200){
        if(mouseY >= 100 && mouseY <= 330){
            drawFunction = drawOne;
        }
      }
    }
}

drawSeven = function() {
    image(capture, width/2, height/2,800,600);
    image(images[6],width/2, height/2);

    // click back to bathroom
    if (keyIsPressed){
      if (keyCode === BACKSPACE){
        drawFunction = drawFive;
      }
    }
}


//========= TEMPLATE: add or change interface functions, as you like =========

// Change the drawFunction variable based on your interaction
function keyTyped() {
  if( key === '1' ) {
  	drawFunction = drawOne;
  }
  else if( key === '2' ) {
  	drawFunction = drawTwo;
  }
  else if( key === '3' ) {
  	drawFunction = drawThree;
  }
  else if( key === '4' ) {
  	drawFunction = drawFour;
  }
  else if( key === '5' ) {
  	drawFunction = drawFive;
  }
  else if( key === '6' ) {
    drawFunction = drawSix;
  }
}

function drawDebugInfo() {
  fill("red");
  text("x: "+ mouseX + " y: " + mouseY, 100, height-2);
}