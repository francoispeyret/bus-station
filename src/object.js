export class Object {
    constructor(_) {
        this.p = {
            x: 0,
            y: 70,
            z: 100
        };
        this.c = '#f00';
        this.w = 120;
        this.vel = 30;
        this.animationColisionState = false;
        this.animationLife = 0;
    }

    reset(_) {
        this.p.z = -3500;
        const randPosX = _.floor(_.random(0,3));
        if(randPosX === 0) {
            this.p.x = -300;
        } else if(randPosX === 1) {
            this.p.x = 0;
        } else if(randPosX === 2) {
            this.p.x = 300;
        }
    }

    update(_,bus) {
        this.colision(_,bus);
        if(this.p.z > 1000) {
            this.reset(_);
        }
        this.p.z += this.vel;
        if(this.animationColisionState === true) {
            this.animationLife+=1;
            this.animationColision(_);
        }
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

    animationColision(_) {
        if(this.animationLife < 50) {
            this.p.y = (_.sin(this.animationLife*3)+1) * 150 ;
        } else {
            this.p.y = 70;
            this.animationLife = 0;
            this.animationColisionState = false;
        }
    }

    show(_) {
        _.push();
            _.translate(this.p.x,this.p.z,this.p.y);
            _.fill(this.c);
            _.box(this.w,80,140);
            _.translate(-this.w/6,0,90);
            _.box(this.w-this.w/3,80,40);
            _.translate(this.w/2,0,-15);
            _.fill('#222');
            _.rotateX(90);
            _.cylinder(20,30,12);
        _.pop();
    }
}
