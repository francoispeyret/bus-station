export class Bus {

    constructor() {
        this.p = {
            x: 0,
            y: 200,
            z: 120
        };
        this.w = 150;
        this.l = 330;
        this.offsetAngle = 0;
        this.color = '#E1E1E1';
        this.distance = 0;
        this.vel = 0.5;
    }

    show(_) {
        _.push();
            _.translate(this.p.x,this.p.y,this.p.z);
            _.rotateZ(this.offsetAngle);
            _.push();
                _.translate(0,0,-117);
                _.blendMode(_.MULTIPLY);
                _.fill(230,30);
                _.plane(this.w*1.1,this.l);
            _.pop();
            _.rotateY(_.sin(_.frameCount*20)/3);
            _.push();
                _.fill(_.color(this.color));
                _.translate(0,130,61);
                _.plane(this.w,45);
                _.blendMode(_.BLEND);
                _.textSize(32);
                _.textAlign(_.RIGHT);
                _.translate(this.w / 2 - 13,20,5);
                _.fill(0);
                _.text(this.getDistance(_), 0, 0);
            _.pop();
            _.fill(_.color(this.color));
            _.box(this.w, this.l, 130);

            // roues
            _.push();
                _.translate(-this.w/2,-this.l/3,-70);
                _.rotateZ(90);
                _.push();
                    _.rotateY(_.frameCount*-3);
                    _.fill(40);
                    _.cylinder(40, 15, 12);
                    _.fill(150);
                    _.cylinder(25, 16, 8);
                _.pop();
                _.translate(0,-this.w,0);
                _.push();
                    _.rotateY(_.frameCount*-3);
                    _.fill(40);
                    _.cylinder(40, 15, 12);
                    _.fill(150);
                    _.cylinder(25, 16, 8);
                _.pop();
                _.translate(this.l/1.5,0,0);
                _.push();
                    _.rotateY(_.frameCount*-3);
                    _.fill(40);
                    _.cylinder(40, 15, 12);
                    _.fill(150);
                    _.cylinder(25, 16, 8);
                _.pop();
                _.translate(0,this.w,0);
                _.push();
                    _.rotateY(_.frameCount*-3);
                    _.fill(40);
                    _.cylinder(40, 15, 12);
                    _.fill(150);
                    _.cylinder(25, 16, 8);
                _.pop();
            _.pop();

            // decoration des cotés
            _.push();
                _.rotateY(90);
                _.translate(-45,0,-75.5);
                _.fill('#D31313');
                _.plane(30,this.l);
                _.translate(0,0,151);
                _.plane(30,this.l);
                _.fill('#333');
                _.translate(40,-this.l/2+40,0);
                _.plane(50,80);
                _.translate(0,90,0);
                _.plane(50,80);
                _.translate(0,90,0);
                _.plane(50,80);
                _.translate(0,-180,-151);
                _.plane(50,80);
                _.translate(0,90,0);
                _.plane(50,80);
                _.translate(0,90,0);
                _.plane(50,80);
            _.pop();

            // decorations arrière
            _.push();
                _.rotateX(90);
                _.translate(0,45,-this.l/2-.5);
                _.fill('#D31313');
                _.plane(this.w,30);
                _.translate(0,-30,0);
                _.fill('#333');
                _.plane(this.w - 30,30);
                _.fill('#999');
                _.rotateX(90);
                _.translate(-this.w/2+20,5,90)
                _.cylinder(3, 10, 8);
            _.pop()

        _.pop();
    }

    update(_) {
        if(_.keyIsDown(_.LEFT_ARROW) && _.keyIsDown(_.RIGHT_ARROW)==false && this.p.x > -350) {
            this.turnLeft();
        } else if(_.keyIsDown(_.RIGHT_ARROW) && _.keyIsDown(_.LEFT_ARROW)==false && this.p.x < 350) {
            this.turnRight();
        } else if(this.offsetAngle != 0) {
            if(this.offsetAngle > 0) {
                this.offsetAngle -= 1;
            } else {
                this.offsetAngle += 1;
            }
        }
        this.distance += this.vel;
        this.setAcceleration();
        if(
            (this.p.x < 350 || this.offsetAngle < 0) &&
            (this.p.x > -350 || this.offsetAngle > 0)
        ) {
            this.p.x += this.offsetAngle;
        }
    }

    turnRight() {
        if(this.offsetAngle < 15) {
            this.offsetAngle += 1;
        }
    }

    turnLeft() {
        if(this.offsetAngle > -15) {
            this.offsetAngle -= 1;
        }
    }

    setAcceleration() {
        this.vel += 0.000015;
    }

    getDistance(_) {
        let unit = '';
        let value = this.distance;
        if(this.distance > 25000) {
            if(this.distance < 100000) {
                value = _.floor(value / 100) / 10;
                value = value.toFixed(1);
            } else {
                value = _.floor(value / 1000);
            }
            unit = 'km'
        } else {
            value = _.floor(value);
            unit = 'm'
        }
        return value + unit;
    }



}
