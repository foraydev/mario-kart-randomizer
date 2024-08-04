import { PlayerPlacement } from "./player-placement";

export class RaceResult {
    public raceNumber: number;
    public trackName: string;
    public playerPlacements: PlayerPlacement[]

    constructor(raceNum: number, track: string, placements: PlayerPlacement[]) {
        this.raceNumber = raceNum;
        this.trackName = track;
        this.playerPlacements = placements;
    }
}