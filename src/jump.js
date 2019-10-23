
import {Object} from './object.js';
export class Jump extends Object {
    constructor(_,global,z) {
        super(_,global);
        this.p = {
            x: 0,
            y: -10,
            z: -z*1500
        };
        this.w = 270;
        this.c = '#f1d300';
        this.c2 = '#ffea2e';
        this.vel = global.vel;
        this.velA = global.velA;
    }

    reset(_) {
        this.p.z = -_.height*2.5;
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
        if(this.p.z > -this.w/4 && this.p.z < 450) {
            if(
                bus.p.x + bus.w / 2 > this.p.x - this.w / 2 &&
                bus.p.x - bus.w / 2 < this.p.x + this.w / 2
            ) {
                this.animationColisionState = true;
            }
        }
        if(this.animationColisionState === true) {
            bus.setJump();
        }
        this.animationColisionState = false;
    }

    update(_,bus) {
        if(this.p.z > 1000) {
            this.reset(_);
        }
        this.colision(_,bus);
        this.p.z += this.vel;
        this.vel += this.velA;
    }

    show(_) {
        _.push();
            _.translate(this.p.x,this.p.z,this.p.y);
            _.fill(this.c);
            _.rotateX(69);
            _.box(this.w,80,140);
            _.translate(0,41,0);
            _.rotateX(90);
            _.fill(this.c2);
            _.plane(this.w,140);
        _.pop();
    }
}
