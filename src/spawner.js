
import {Tank} from './tank.js';
import {Jump} from './jump.js';

export class Spawner {
    constructor(_,global) {
        this.objects = [];
        for(let z = 0; z < 5; z++) {
            this.objects[z] = new Jump(_,global,z)
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
