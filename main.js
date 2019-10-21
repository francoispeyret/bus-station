import * as p5 from './lib/p5.js';
import {Bus} from './src/bus.js';
import {Road} from './src/road.js';
import {Spawner} from './src/spawner.js';

let bus;
let road;
let spawner;
let font;

let sound;

let global = {
    vel: 18,
    velA: 0.00015,
    objects: {
        vel: {
            min: 5,
            max: 25,
        }
    }
}

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

        if(bus.crash === false) {
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

const P5 = new p5(s);
