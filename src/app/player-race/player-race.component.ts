import { Component, Input } from '@angular/core';
import { Player } from '../model/player';
import { StateService } from '../service/state.service';
import { CharacterService } from '../service/character.service';

@Component({
  selector: 'app-player-race',
  templateUrl: './player-race.component.html',
  styleUrls: ['./player-race.component.css']
})
export class PlayerRaceComponent {
  @Input()
  player: Player = new Player();

  constructor(
    public stateService: StateService,
    public characterService: CharacterService
  ){

  }
}
