import { Component } from '@angular/core';
import { StateService } from '../service/state.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  constructor(
    public stateService: StateService
  ) {

  }
}
