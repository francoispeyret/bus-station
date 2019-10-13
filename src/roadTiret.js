

export class RoadTiret {
    constructor(_,z) {
        this.z = z;
        this.animationLife = 0;
        this.p = {
            x: 0,
            y: 2,
            z: -_.height*2.5 + 200 * this.z
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
            _.fill('#E1E1E1');
            _.translate(150,this.p.z,this.p.y);
            _.plane(15,100);
            _.translate(-300,0,0);
            _.plane(15,100);
        _.pop();
    }
}
