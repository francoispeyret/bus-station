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

        sound = new p5.Oscillator();
        sound.setType('triangle');
        sound.amp(.2);
        sound.start();
        sound2 = new p5.Oscillator();
        sound2.setType('triangle');
        sound2.amp(.3);
        sound2.start();
        sound3 = new p5.Oscillator();
        sound3.setType('triangle');
        sound3.amp(.3);
        sound3.start();


    };

    sk.draw = () => {
        sound.freq(73.4+i);
        sound2.freq(43.6+i*3);
        sound3.freq(27.5+i*2);
        i++;
        if(i>10) {
            i = 0;
        }
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
