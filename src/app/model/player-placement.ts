import { Player } from "./player";

export class PlayerPlacement {
    public id: number;
    public name: string;
    public pointsEarned: number;
    public totalPoints: number;


    constructor(player: Player) {
        this.id = player.id;
        this.name = player.name.value;
        this.pointsEarned = player.pointsAdded.value;
        this.totalPoints = player.points;
    }
}