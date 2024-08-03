import { FormControl } from "@angular/forms";
import { RandomService } from "../service/random.service";

export class Player {
    public character: FormControl;
    public name: FormControl;
    public pointsAdded: FormControl;
    public points: number;
    public id: number;

    constructor() {
        this.character = new FormControl("Mario");
        this.name = new FormControl("");
        this.pointsAdded = new FormControl(0);
        this.points = 0;
        this.id = RandomService.randomInt(1, 65536);
    }
}