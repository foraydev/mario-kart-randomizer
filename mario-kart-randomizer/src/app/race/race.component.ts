import { Component } from '@angular/core';
import { StateService } from '../service/state.service';
import { TrackService } from '../service/track.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent {
  constructor(
    public stateService: StateService,
    public trackService: TrackService
  ) {}
}
