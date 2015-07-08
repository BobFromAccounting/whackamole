"use strict";

var gameLoop;
var highscore = 0;
// var endLoop = false;

$(".molehole").click(function (event) {
	var moleholeClicked = $(this).attr('id');
	var moleholeCheck = $(this)
	if (moleholeCheck.hasClass("active")) {
		highscore += 10;
		$('#score').text("Score: " + highscore);
	} else {
		highscore -= 10;
		$('#score').text("Score: " + highscore);
		animateWrongClick(moleholeClicked)
		// clearInterval(gameLoop);
		// gameLoop = setInterval(marioTravels, 1000)
	}
});

$('#play').click(function (e) {
	e.preventDefault();
	gameLoop = setInterval(marioTravels, 1000);
});

function animateMario (id) {
	$('#' + id).addClass('active');
	setTimeout(function () {
		$('#' + id).removeClass('active');
	}, 1000);
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