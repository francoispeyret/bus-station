

export class RoadTree {
    constructor(_,z) {
        this.z = z;
        this.animationLife = 0;
        this.p = {
            x: _.floor(_.random(-400,400)),
            y: 0,
            z: -150 * this.z
        };
        this.side = _.random(0,10);
        if(this.side > 5) {
            this.p.x += 1000;
        } else {
            this.p.x -= 1000;
        }
    }

    update(_) {
        if(this.p.z > _.height*2.5) {
            this.p.z = -_.height*2.5;
        } else {
            this.p.z = this.p.z + 10;
        }
    }

    show(_) {
        _.push();
            _.translate(this.p.x,this.p.z,20);
            _.rotateX(90);
            _.push();
                _.translate(0,-20,0);
                _.fill('#768E2B');
                _.cylinder(20, 1, 12);
            _.pop();
            _.fill('#5B3D2E');
            _.cylinder(5, 40, 12);
            _.translate(0,60,0);
            _.fill('#2E5B37');
            _.cone(20, 90);
        _.pop();
    }
}
