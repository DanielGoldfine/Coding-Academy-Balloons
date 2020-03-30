'use strict'


var gBalloonsQuantity = 6;
var gInterval = null;
var gIsgameOn = false;
var audioPop = new Audio('sound/pop.mp3');
var gballoons = []

function initGame() {
    createBalloonsObj(gBalloonsQuantity);
    renderBalloons(gBalloonsQuantity);
}

function reset() {

    gballoons = [];
    createBalloonsObj(gBalloonsQuantity);
    renderBalloons(gBalloonsQuantity);
    clearInterval(gInterval);
    gInterval = null;

}

function renderBalloons(num) {


    var strHTML = ''
    for (var i = 0; i < num; i++) {
        strHTML += `<div class='balloon balloon${i + 1}'
        onmouseover='speedUp(${i})' onclick='popBalloon(this)'></div>`
    }
    var elSky = document.querySelector('.sky');
    elSky.innerHTML = strHTML;

    for (var i = 0; i < num; i++) {

        var balloonClass = '.balloon' + (i + 1);
        var createdBalloon = document.querySelector(balloonClass);
        createdBalloon.style.left = 75 * i + 'px';
        createdBalloon.style.backgroundColor = generateRandomColor();
    }
}

function startBalloons() {

    if (!gInterval) {
        gInterval = setInterval(moveballoons, 300);
    }
}

function moveballoons() {

    for (var i = 0; i < gballoons.length; i++) {

        var balloonClass = '.balloon' + (i + 1);
        var balloon = gballoons[i];
        var elBalloon = document.querySelector(balloonClass);

        balloon.bottom += balloon.speed
        elBalloon.style.bottom = balloon.bottom + 'px'
    }
}

function speedUp(balloonIndx) {

    if (gInterval) {
        var balloon = gballoons[balloonIndx]
        balloon.speed += getRndInteger(2, 7);
    }
}

function popBalloon(elBalloon) {

    if (gInterval) {
        audioPop.play();
        elBalloon.style.display = 'none';
    }
}

function createBalloonsObj(num) {

    var balloonObj = {}

    for (var i = 0; i < num; i++) {
        balloonObj = {
            id: 1,
            bottom: 325,
            speed: getRndInteger(2, 9)
        }
        gballoons.push(balloonObj);
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}