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
        'goldenrod',
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

    public getPosition(id: number):string {
        let score = this.players[this.getIndex(id)].points;
        let position = this.rankPlayers().findIndex(p => p.points === score) + 1;
        if (position === 1) { return '1st'; }
        if (position === 2) { return '2nd'; }
        if (position === 3) { return '3rd'; }
        return position.toString() + 'th';
    }

    public getPositionStyle(id: number):{'color': string, 'font-size': string} {
        let position = this.getPosition(id);
        if (position === '1st') { return {'color': 'gold', 'font-size': '2.4em'}; }
        if (position === '2nd') { return {'color': 'silver', 'font-size': '2.2em'}; }
        if (position === '3rd') { return {'color': '#8B4513', 'font-size': '2.0em'}; }
        return {'color': 'ff4500', 'font-size': '1.8em'};;
    }
}