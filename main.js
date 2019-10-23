import p5 from 'p5/lib/p5';
import "p5/lib/addons/p5.sound";
import {Bus} from './src/bus.js';
import {Road} from './src/road.js';
import {Spawner} from './src/spawner.js';

let bus;
let road;
let spawner;
let font;

let sound;
let sound2;
let sound3;
let i = 0;

let global = {
    vel: 18,
    velA: 0.00015,
    objects: {
        vel: {
            min: 5,
            max: 25,
        }
    }
};

let s = (sk) => {
    sk.preload = () => {
        font = sk.loadFont('AsapCondensed-Bold.ttf');
    };

    sk.windowResized = () => {
        sk.resizeCanvas(window.innerWidth, window.innerHeight);
    };

    sk.setup = () => {
        sk.createCanvas(window.innerWidth, window.innerHeight, sk.WEBGL);

        bus     = new Bus(sk);
        road    = new Road(sk,global);
        spawner = new Spawner(sk,global);
    };

    sk.draw = () => {
        sk.textFont(font);
        sk.noStroke();
        sk.background('#71C3FF');

        sk.angleMode(sk.DEGREES)
        sk.rotateX(50);


        sk.fill('#B0E14E');
        sk.plane(sk.width * 5, sk.height * 5);

        if(bus.crash.state === false) {
            road.update(sk);
            spawner.updateObjects(sk,bus);
        }
        bus.update(sk);

        road.show(sk);
        spawner.showObjects(sk);
        bus.show(sk);
    };

    sk.keyReleased = () => {
        if(typeof bus !== 'undefined')
            bus.keyReleased(sk.keyCode);
    }

};
console.log(document.querySelector('button.left'));

// CONTROLS (with DOM for mobile)
let controlLoop        = null;
const controlLoopSpeed = 7;
const buttonLeft       = document.querySelector('.control.left');
const buttonRight      = document.querySelector('.control.right');

buttonLeft.ontouchstart = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if(typeof bus == 'object') {
        controlLoop = setInterval(function () {
            bus.turnLeft();
        }, controlLoopSpeed);
    }
}
buttonLeft.ontouchend = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(typeof bus == 'object') {
        clearInterval(controlLoop);
    }
}
buttonRight.ontouchstart = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if(typeof bus == 'object') {
        controlLoop = setInterval(function () {
            bus.turnRight();
        }, controlLoopSpeed);
    }
}
buttonRight.ontouchend = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(typeof bus == 'object') {
        clearInterval(controlLoop);
    }
}

const P5 = new p5(s);
