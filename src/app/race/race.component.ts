import { Component } from '@angular/core';
import { StateService } from '../service/state.service';
import { TrackService } from '../service/track.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent {
  cupIconBaseUrl = 'assets/images/cups/';

  courseIconBaseUrl = 'assets/images/courses/'

  constructor(
    public stateService: StateService,
    public trackService: TrackService
  ) {}

  getCupIconUrl(cup: string): string {
    return this.cupIconBaseUrl + cup.replace(' ', '_').toLowerCase() + '_icon.png';
  }

  getCourseImageUrl(track: string): string {
    return this.courseIconBaseUrl + track.replaceAll(' ', '_').replaceAll('\'', '').replaceAll('-', '_').toLowerCase() + '.webp';
  }
}
