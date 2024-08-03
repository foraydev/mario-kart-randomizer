import { Component } from '@angular/core';
import { StateService } from '../service/state.service';
import { TrackService } from '../service/track.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  constructor(
    public stateService: StateService,
    public trackService: TrackService
  ) {}
}
