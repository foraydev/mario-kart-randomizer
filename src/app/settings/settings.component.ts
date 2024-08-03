import { Component } from '@angular/core';
import { TrackService } from '../service/track.service';
import { StateService } from '../service/state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(
    public trackService: TrackService,
    public stateService: StateService
  ) {}
}
