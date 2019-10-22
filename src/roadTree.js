

export class RoadTree {
    constructor(_,z,global) {
        this.z = z;
        this.animationLife = 0;
        this.p = {
            x: _.floor(_.random(-400,400)),
            y: 0,
            z: -150 * this.z
        };
        this.w = _.floor(_.random(18,60));
        this.side = _.random(0,10);
        if(this.side > 5) {
            this.p.x += 1000;
        } else {
            this.p.x -= 1000;
        }
        this.vel = global.vel;
        this.velA = global.velA;
    }

    update(_) {
        if(this.p.z > _.height*2.5) {
            this.p.z = -_.height*2.5;
        } else {
            this.p.z += this.vel;
        }
        this.setAcceleration();
    }

    setAcceleration() {
        this.vel += this.velA;
    }

    show(_) {
        _.push();
            _.translate(this.p.x,this.p.z,20);
            _.rotateX(90);
            _.push();
                _.translate(0,-20,0);
                _.fill('#768E2B');
                _.cylinder(this.w, 1, 12);
            _.pop();
            _.fill('#5B3D2E');
            _.cylinder(this.w/5, 40, 12);
            _.translate(0,this.w * 2.5 / 1.5,0);
            _.fill('#2E5B37');
            _.cone(this.w, this.w * 2.5);
        _.pop();
    }
}
