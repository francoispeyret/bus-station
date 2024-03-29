export class Object {
    constructor(_,global,z) {
        this.obj = global.objects;
        this.p = {
            x: -300,
            y: 70,
            z: 100
        };
        this.spawZ = z;
        this.c = '#f91e1e';
        this.w = 120;
        this.vel = _.floor(_.random(this.obj.vel.min, this.obj.vel.max));
        this.velA = global.velA;
        this.animationColisionState = false;
        this.animationLife = 60;
    }

    reset(_) {
        this.p.z = -this.spawZ*_.height*5;
        this.vel = _.floor(_.random(this.obj.vel.min, this.obj.vel.max));
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
        if(this.animationColisionState === true) {
            this.animationColision(_);
            if(bus.oil.current < bus.oil.max)
                bus.oil.current += .05;
        } else {
            this.p.z += bus.vel;
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
        if(this.animationLife > 0) {
            this.p.y += this.animationLife / 3;
            this.animationLife -= 1;
        } else {
            this.reset(_);
            this.p.y = 70;
            this.animationLife = 60;
            this.animationColisionState = false;
        }
    }

    show(_) {
        _.push();
            _.translate(this.p.x,this.p.z,2);
            _.blendMode(_.MULTIPLY);
            const opacity = _.map(this.p.y,70,300,220,255);
            _.fill(opacity,30);
            _.plane(this.w*1.1,this.l);
        _.pop();
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
