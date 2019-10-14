import {RoadTiret} from './roadTiret.js';
import {RoadTree} from './roadTree.js';

export class Road {
    constructor(_) {
        this.tirets = [];
        this.tiretZLength = _.floor(_.height*5/320) + 1;

        for(let z = 0; z < this.tiretZLength; z++) {
            this.tirets[z] = new RoadTiret(_,z);
        }

        this.trees = [];
        this.treeZLength = 50;
        for(let z = 0; z < this.treeZLength; z++) {
            this.trees[z] = new RoadTree(_,z);
        }
    }

    update(_) {
        for(let z = 0; z < this.tiretZLength; z++) {
            this.tirets[z].update(_);
        }
        for(let z = 0; z < this.treeZLength; z++) {
            this.trees[z].update(_);
        }
    }

    show(_) {
        for(let z = 0; z < this.tiretZLength; z++) {
            this.tirets[z].show(_);
        }
        for(let z = 0; z < this.treeZLength; z++) {
            this.trees[z].show(_);
        }
    }

}
