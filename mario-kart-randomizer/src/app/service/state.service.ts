import { Injectable } from "@angular/core";
import { Player } from "../model/player";
import { RandomService } from "./random.service";

@Injectable({
    providedIn: 'root'
})
export class StateService {
    public players: Player[];
    public gameState: string = "player-input";

    public colors: string[] = [
        'red',
        'blue',
        'yellow',
        'green'
    ]

    constructor() {
        this.players = [new Player()];
    }

    public addPlayer(): void {
        this.players.push(new Player());
    }

    public removePlayer(id: number) {
        this.players.splice(this.players.findIndex(p => p.id === id), 1);
    }

    public rankPlayers(): Player[] {
        return RandomService.toSorted(this.players, (a: Player, b: Player) => { return b.points - a.points; });
    }

    public setState(newState: string) {
        this.gameState = newState;
    }

    public getColor(id: number):string {
        return this.colors[this.getIndex(id) % 4];
    }

    public getIndex(id: number):number {
        return this.players.findIndex(p => p.id === id);
    }
}