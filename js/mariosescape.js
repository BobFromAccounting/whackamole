"use strict";
(function () {
// variable dump :establishing the gameloop, highscore, click enabling, lives remaining,
// interval timing, and cheat code comparisons.

var gameLoop = false;
var isLooping;
var highscore = 0;
var enableClicks = false;
var livesRemaining = 3;
var interval = 1000;
var keystrokes = [], konamiKeys = "38,38,40,40,37,39,37,39,66,65,13";

// play button establishes a start mechanic and plays the theme audio.

$('#play').click(function (e) {
	e.preventDefault();
	enableClicks = true;
	gameLoop = true;
	document.getElementById("theme").play();
	gameLoopLogic();
});

// click event listener is listening for click events and running ingame logic to establish
// scoring, interval setting changes, failure to match click the identified div, establishes
// a win condition, and plays audio files for matching and failed matching click events.

$(".molehole").click(function (event) {
	var moleholeClicked = $(this).attr('id');
	var moleholeCheck = $(this)
	
	function success () {
		if (highscore === 200) {
			highscore += 10;
			interval -= 50;
		} else {
			highscore += 10;
		}
		$('#score').text("Score: " + highscore);
	}

	function failure () {
		highscore -= 10;
		$('#score').text("Score: " + highscore);
		$("#lives").text("Lives: " + livesRemaining)
		animateWrongClick(moleholeClicked)
	}
	
	if (enableClicks == true) {
		if (moleholeCheck.hasClass("active")) {
			success();
			document.getElementById("hit").play();
		} else {
			failure();
			livesRemaining -= 1;
			document.getElementById("miss").play();
		}
		if ((highscore % 100) == 0) {
			document.getElementById("acheivement").play();
		} 
		if (highscore === 500) {
			gameOver();
			alert("Mario has successfully escaped!")
		} else if (livesRemaining < 0) {
			document.getElementById("theme").pause();
			document.getElementById("death").play();
			gameOver();
			alert("Bowser WON?!?! Now he is eating the Mushroom Kingdom!")
		}
	}
});

// establishes game over comparison and game loop logic.

function gameOver () {
			gameLoop = false;
			enableClicks = false;
			highscore = 0;
			gameLoopLogic();
			location.reload(true);	
}

function gameLoopLogic () {
	if (gameLoop === true) {
		isLooping = setInterval(marioTravels, 1000);	
	} else {
		clearInterval(isLooping);
	}
}

// animation functions for mario to appear and what happens when you miss him.

function animateMario (id) {
	$('#' + id).addClass('active');
	setTimeout(function () {
		$('#' + id).removeClass('active');
	}, interval);
}

function animateWrongClick (id) {
	$('#' + id).addClass('wrong');
	setTimeout(function () {
		$('#' + id).removeClass('wrong');
	}, 250);
}

function marioTravels () {
	var squares = $('.molehole');
	var random = Math.floor(Math.random() * 4);
	var squareToAnimate = squares[random];
	var id = squareToAnimate.getAttribute('id');
	animateMario(id);
}

// Cheat code for extra lives.

$(document).keyup(function (e){
    keystrokes.push(e.keyCode);
    if (keystrokes.toString().indexOf(konamiKeys) >= 0) {
    	livesRemaining = 30;
    	$("#lives").text("Lives: " + livesRemaining);
		document.getElementById("acheivement").play();
    	keystrokes = [];
    }
});
})();