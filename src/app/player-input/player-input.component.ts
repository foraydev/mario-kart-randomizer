import { Component, Input } from '@angular/core';
import { Player } from '../model/player';
import { StateService } from '../service/state.service';
import { CharacterService } from '../service/character.service';

@Component({
  selector: 'app-player-input',
  templateUrl: './player-input.component.html',
  styleUrls: ['./player-input.component.css']
})
export class PlayerInputComponent {
  @Input()
  player: Player = new Player();

  showingSelectionMenu: boolean = false;

  constructor(
    public stateService: StateService,
    public characterService: CharacterService
  ) {}

  toggleShowingSelectionMenu() {
    this.showingSelectionMenu = !this.showingSelectionMenu;
  }
}
