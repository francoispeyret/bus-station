
import {Tank} from './tank.js';
import {Jump} from './jump.js';
import {Puddle} from './puddle.js';

export class Spawner {
    constructor(_,global) {
        this.objects = [];
        for(let z = 1; z <= 15; z++) {
            if(z == 2 || z == 3 || z == 7 || z == 14) {
                this.objects[z-1] = new Puddle(_,global,z);
            } else {
                this.objects[z-1] = new Jump(_,global,z);
            }
        }
    }

    updateObjects(_,bus) {
        for(let obj of this.objects) {
            obj.update(_,bus);
        }
    }

    showObjects(_) {
        for(let obj of this.objects) {
            obj.show(_);
        }
    }

}
