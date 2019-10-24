
import {Object} from './object.js';
export class Puddle extends Object {
    constructor(_,global,z) {
        super(_,global,z);
        this.p = {
            x: 0,
            y: 1,
            z: -z*_.height
        };
        this.w = 270;
        this.c = '#29241f';
        this.seed = _.floor(_.random(0,3));
        this.vel = global.vel;
        this.velA = global.velA;

    }

    reset(_) {
        this.seed = _.floor(_.random(0,3));
        this.p.z = -this.spawZ*_.height*2.5;
        const randPosX = _.floor(_.random(0,3));
        if(randPosX === 0) {
            this.p.x = -300;
        } else if(randPosX === 1) {
            this.p.x = 0;
        } else if(randPosX === 2) {
            this.p.x = 300;
        }
    }

    colision(_,bus) {
        if(this.p.z > -this.w/4 && this.p.z < 300) {
            if(
                bus.p.x + bus.w / 2 > this.p.x - this.w / 2 &&
                bus.p.x - bus.w / 2 < this.p.x + this.w / 2
            ) {
                if(bus.p.y < 201) {
                    this.animationColisionState = true;
                }
            }
        }
        if(this.animationColisionState === true) {
            bus.setSpinning();
        }
        this.animationColisionState = false;
    }

    update(_,bus) {
        if(this.p.z > 1000) {
            this.reset(_);
        }
        this.colision(_,bus);
        this.p.z += bus.vel;
    }

    show(_) {
        _.push();
            _.translate(this.p.x,this.p.z,this.p.y);
            _.rotateX(-90);
            _.fill(this.c);
            _.cylinder(80, 1, 12);
            _.translate(-90, 0, 40);
            _.cylinder(45, 1, 12);
            if(this.seed > 1) {
                _.translate(170, 0, 40);
                _.cylinder(30, 1, 12);
            }
            if(this.seed >= 2) {
                _.translate(20, 0, -90);
                _.cylinder(30, 1, 12);
            }
            if(this.seed == 1) {
                _.translate(170, 0, -70);
                _.cylinder(30, 1, 12);
            }
        _.pop();
    }
}
