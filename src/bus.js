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
    }

    show(_) {
        _.fill(_.color(this.color));
        _.push();
            _.translate(this.p.x,this.p.y,this.p.z);
            _.rotateZ(this.offsetAngle);
            _.rotateY(_.sin(_.frameCount*15)/3);
            _.box(this.w, this.l, 130);
            _.push();
                _.translate(0,0,-117);
                _.fill(230,30);
                _.plane(this.w*1.1,this.l);
            _.pop();

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
        if(_.keyIsDown(_.LEFT_ARROW) && _.keyIsDown(_.RIGHT_ARROW)==false) {
            this.turnLeft();
        } else if(_.keyIsDown(_.RIGHT_ARROW) && _.keyIsDown(_.LEFT_ARROW)==false) {
            this.turnRight();
        } else if(this.offsetAngle != 0) {
            if(this.offsetAngle > 0) {
                this.offsetAngle -= 1;
            } else {
                this.offsetAngle += 1;
            }
        }
    }

    turnRight() {
        if(this.p.x < 350) {
            this.p.x += this.offsetAngle;
            if(this.offsetAngle < 15)
                this.offsetAngle = this.offsetAngle + 1;
        }
    }

    turnLeft() {
        if(this.p.x > -350) {
            this.p.x += this.offsetAngle;
            if(this.offsetAngle > -15)
                this.offsetAngle = this.offsetAngle - 1;
        }
    }



}
