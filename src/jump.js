
import {Object} from './object.js';
export class Jump extends Object {
    constructor(_) {
        super();
        this.p.x = -300;
        this.p.y = -10;
        this.w = 270;
        this.c = '#f1d300';
        this.c2 = '#ffea2e';
    }


    colision(_,bus) {
        if(this.p.z > -this.w && this.p.z < 450) {
            if(
                bus.p.x + bus.w / 2 > this.p.x - this.w / 2 &&
                bus.p.x - bus.w / 2 < this.p.x + this.w / 2
            ) {
                this.animationColisionState = true;
            }
        }
    }

    update(_,bus) {
        this.colision(_,bus);
        if(this.p.z > 1000) {
            this.reset(_);
        }
        if(this.animationColisionState === true) {
            bus.setJump();
            this.animationColisionState = false;
        }
        this.p.z += this.vel;
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
