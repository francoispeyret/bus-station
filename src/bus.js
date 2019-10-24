import p5 from 'p5/lib/p5';
import "p5/lib/addons/p5.sound";

export class Bus {

    constructor() {
        this.p = {
            x: 0,
            y: 200,
            z: 120
        };
        this.maxP = {
            x: 550
        }
        this.w = 150;
        this.l = 330;
        this.offsetAngle = 0;
        this.color = '#E1E1E1';
        this.distance = 0;
        this.vel = 0;
        this.velMax = 20;
        this.velA = .05;
        this.oil = {
            value: 99,
            max: 100
        };

        this.usageOil = 0.005;
        this.crash = {
            state: false,
            type: null,
            animation: 0,
            angle: 0
        };

        this.jump = {
            jumping: false,
            animation: 0,
            angle: 0,
            sound: new p5.Oscillator(),
        };
        this.jump.sound.setType('triangle');
        this.jump.sound.amp(.075);

        this.spin = {
            spinning: false,
            animation: 0,
            angle: 0,
            sound: new p5.Oscillator(),
        };
        this.spin.sound.setType('triangle');
        this.spin.sound.amp(.125);

        this.motor = {
            i:0,
            sound1: new p5.Oscillator(),
            sound2: new p5.Oscillator(),
            sound3: new p5.Oscillator(),
        };

        this.motor.sound1.setType('triangle');
        this.motor.sound2.setType('triangle');
        this.motor.sound3.setType('triangle');
        this.motor.sound1.amp(.15);
        this.motor.sound2.amp(.22);
        this.motor.sound3.amp(.25);
        this.motor.sound1.start();
        this.motor.sound2.start();
        this.motor.sound3.start();

    }

    show(_) {
        _.push();
            _.translate(this.p.x,this.p.y,0);

            // angle of bus
            _.rotateZ(this.offsetAngle);

            _.push();
                if(this.spin.spinning === true) {
                    _.rotateZ(this.spin.angle);
                } else if(this.crash.state === true) {
                    _.rotateZ(this.crash.angle/2);
                }
                _.translate(0,0,3);
                _.blendMode(_.MULTIPLY);
                const opacity = _.map(this.p.z,120,300,220,255);
                _.fill(opacity,30);
                _.plane(this.w*1.1,this.l);
            _.pop();
            _.translate(0,0,this.p.z);

            if(this.crash.state === true) {
                _.rotateY(this.crash.angle);
                _.rotateX(this.crash.angle/2);
            } else if(this.spin.spinning === true) {
                _.rotateZ(this.spin.angle);
            } else {
                _.rotateX(this.jump.angle);

                // animation wiggle
                _.rotateY(_.sin(_.frameCount*20)/2);
            }

            // Interface on bus
            _.push();
                _.fill(_.color(this.color));
                _.translate(0,110,61);
                _.plane(this.w,80);
                _.blendMode(_.BLEND);
                _.textSize(32);
                _.textAlign(_.RIGHT);
                _.translate(this.w / 2 - 13,40,10);
                _.fill(0);
                _.text(this.getDistance(_), 0, 0);

                _.translate(0, -30, 0);
                _.text(this.getOil(_), 0, 0);
            _.pop();

            _.fill(_.color(this.color));
            _.box(this.w, this.l, 130);

            // mirrors
            _.push();
                _.translate(-this.w/2-7,-this.l/2,7);
                _.fill('#a6abbb');
                _.rotateX(90);
                _.plane(15);
                _.translate(0,15,0);
                _.fill('#d7d7e0');
                _.plane(15);
                _.translate(this.w+15,0,0);
                _.plane(15);
                _.fill('#a6abbb');
                _.translate(0,-15,0);
                _.plane(15);
            _.pop();

            // wheels
            _.push();
                _.translate(-this.w/2,-this.l/3,-70);
                if(this.jump.animation > 10 && this.jump.animation < 180)
                    _.translate(0,0,-18);
                _.rotateZ(90);
                this.showWheel(_);
                _.translate(0,-this.w,0);
                this.showWheel(_);
                _.translate(this.l/1.5,0,0);
                this.showWheel(_);
                _.translate(0,this.w,0);
                this.showWheel(_);
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

            // decorations arrière
            _.push();
                _.rotateX(90);
                _.translate(0,50,this.l/2+.5);
                _.fill('#D31313');
                _.plane(this.w,20);
                _.translate(0,-45,0);
                _.fill('#333');
                _.plane(this.w,70);
            _.pop()

        _.pop();
    }

    showWheel(_) {
        _.push();
            if(this.crash.state === false) {
                _.rotateY(_.frameCount*-3);
            }
            _.fill(40);
            _.cylinder(40, 15, 12);
            _.fill(150);
            _.cylinder(25, 16, 8);
        _.pop();
    }

    update(_) {

        if(this.crash.state === true) {
            this.crashAnimation(_);
            return;
        }
        if(this.spin.spinning === true) {
            this.spinAnimation(_);
        } else if(_.keyIsDown(_.LEFT_ARROW) && _.keyIsDown(_.RIGHT_ARROW)==false) {
            this.turnLeft();
        } else if(_.keyIsDown(_.RIGHT_ARROW) && _.keyIsDown(_.LEFT_ARROW)==false) {
            this.turnRight();
        } else if(this.offsetAngle > 0 || this.offsetAngle < 0 ) {
            if(this.offsetAngle > 0) {
                this.offsetAngle -= 1;
            } else {
                this.offsetAngle += 1;
            }
        }
        this.setCarConsumption();
        this.setAcceleration();
        if(
            (this.p.x < this.maxP.x || this.offsetAngle < 0) &&
            (this.p.x > -this.maxP.x || this.offsetAngle > 0)
        ) {
            this.p.x += this.offsetAngle;
        }
        if(this.jump.jumping === true) {
            this.jumpAnimation(_);
        }
        this.motor.sound1.freq(73.4 + this.motor.i   + _.abs(this.offsetAngle*3));
        this.motor.sound2.freq(43.6 + this.motor.i*3 + _.abs(this.offsetAngle*2));
        this.motor.sound3.freq(27.5 + this.motor.i*2 + _.abs(this.offsetAngle));
        this.motor.i++;
        if(this.motor.i>10) {
            this.motor.i = 0;
        }
    }

    keyReleased(code) {
        if(code === 38 || code === 32) {
            this.setJump(true);
        }
    }

    canTurn() {
        if(
            this.spin.spinning === false
        ) {
            return true;
        }
        return false;
    }

    turnRight() {
        if(this.p.x < this.maxP.x && this.canTurn()) {
            if(this.offsetAngle < 15) {
                this.offsetAngle += 1;
            }
        }
    }

    turnLeft() {
        if(this.p.x > -this.maxP.x && this.canTurn()) {
            if(this.offsetAngle > -15) {
                this.offsetAngle -= 1;
            }
        }
    }

    setSpinning() {
        this.spin.spinning = true;
        this.spin.sound.start();
    }

    spinAnimation(_) {
        this.spin.angle += 10;
        this.spin.animation += 5;
        if(this.spin.animation < 170){
            this.spin.sound.freq(_.sin(this.spin.animation*8)*150+440);
        } else {
            this.spin.sound.stop();
        }
        if(this.spin.animation > 180) {
            this.spin.angle = 0;
            this.spin.animation = 0;
            this.spin.spinning = false;
        }
    }

    setJump(user) {
        if(this.jump.jumping === true && user === true)  {
            this.setCrash('jumpingOverkill');
        } else if(this.jump.jumping === false){
            this.jump.jumping = true;
            this.jump.sound.start();
        }
    }

    jumpAnimation(_) {
        this.p.z = _.sin(this.jump.animation) * 150 + 120;
        this.jump.angle = _.sin(this.jump.animation) * -15;
        this.jump.animation += 5;
        if(this.jump.animation < 110){
            this.jump.sound.freq(this.jump.animation*3.14+622);
        } else {
            this.jump.sound.stop();
        }
        if(this.jump.animation > 180) {
            this.jump.animation = 0;
            this.jump.jumping = false;
            this.jump.sound.stop();
        }
    }

    setCrash(type) {
        this.crash.type  = type;
        this.crash.state = true;
        this.motor.sound1.stop();
        this.motor.sound2.stop();
        this.motor.sound3.stop();
        this.jump.sound.stop();
        this.spin.sound.stop();
    }

    crashAnimation(_) {
        if(this.crash.animation < 180) {
            this.p.y = _.sin(this.crash.animation+90)*90 + 200;
            if(this.p.z > 120) {
                this.p.z -= 30;
            }
            if(this.crash.animation < 90) {
                this.crash.angle = _.sin(this.crash.animation-180)*90;
            }
            //this.jump.angle  = _.sin(this.jump.animation)  *-15;
            this.crash.animation += 5;
        }
    }

    setAcceleration() {
        if(this.vel > 3) {
            if(this.p.x < -400)
                this.vel -= this.velA * 2;
            if(this.p.x > 400)
                this.vel -= this.velA * 2;
        }
        if(this.vel < this.velMax) {
            this.vel += this.velA;
        }
        this.distance += this.vel / 20;
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

    getOil(_) {
        let oilValue = this.oil.value;
        if(oilValue >= this.oil.max) {
            oilValue = _.floor(oilValue);
        } else {
            oilValue = oilValue.toFixed(1);
        }

        return oilValue + '/' + this.oil.max;
    }

    setCarConsumption() {
        if(this.oil.value >= 0) {
            this.oil.value -= this.usageOil;
        }
    }



}
