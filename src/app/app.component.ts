import { Component } from '@angular/core';
import { TrackService } from './service/track.service';
import { StateService } from './service/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mario-kart-randomizer';

  constructor(
    public trackService: TrackService,
    public stateService: StateService
  ) {}
}
