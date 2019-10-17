import * as p5 from './lib/p5.js';
import {Bus} from './src/bus.js';
import {Road} from './src/road.js';
import {Object} from './src/object.js';
import {Jump} from './src/jump.js';

let bus;
let road;
let object;
let jump;
let font;

let s = (sk) => {
    sk.preload = () => {
        font = sk.loadFont('AsapCondensed-Bold.ttf');
    };

    sk.windowResized = () => {
        sk.resizeCanvas(window.innerWidth, window.innerHeight);
    };

    sk.setup = () => {
        sk.createCanvas(window.innerWidth, window.innerHeight, sk.WEBGL);

        bus = new Bus(sk);
        road = new Road(sk);
        object = new Object();
        jump = new Jump();
    };

    sk.draw = () => {
        sk.textFont(font);
        sk.noStroke();
        sk.background('#71C3FF');

        sk.angleMode(sk.DEGREES)
        sk.rotateX(50)

        sk.fill('#B0E14E');
        sk.plane(sk.width * 5, sk.height * 5);

        if(bus.crash === false) {
        road.update(sk);
        object.update(sk,bus);
        jump.update(sk,bus);
        }
        bus.update(sk);

        road.show(sk);
        object.show(sk);
        jump.show(sk);
        bus.show(sk);
    };

    sk.keyReleased = () => {
        bus.keyReleased(sk.keyCode);
    }

};

const P5 = new p5(s);
