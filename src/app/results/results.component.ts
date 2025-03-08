import { Component } from '@angular/core';
import { StateService } from '../service/state.service';
import { TrackService } from '../service/track.service';
import { Chart } from 'angular-highcharts';
import { PlayerPlacement } from '../model/player-placement';
import { RaceResult } from '../model/race-result';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  public chart: Chart;

  constructor(
    public stateService: StateService,
    public trackService: TrackService
  ) {
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Results'
      },
      credits: {
        enabled: false
      },
      series: [],
      xAxis: {
        labels: {
          formatter: (val) => {
            if (val.pos % 1 !== 0 || val.pos >= this.trackService.tracksInRace.length) { return ''; }
            return this.trackService.tracksInRace[val.pos].getCourseName()
          },
          step: 1
        },
        crosshair: true
      },
      tooltip: {
        formatter: function () {
          let raceResult: RaceResult = TrackService.results[ResultsComponent.getXIndex(this.x)];
          let playerPoints = raceResult.playerPlacements
          playerPoints.sort((a, b) => { return b.pointsEarned - a.pointsEarned; })
          return playerPoints.reduce((s, placement) => {
              return s + '<br/>' + placement.name + ': +' +
                  placement.pointsEarned + ' => ' + placement.totalPoints;
          }, '<b>' + raceResult.trackName + '</b>');
      },
        shared: true
      }
    });

    this.stateService.players.forEach(player => {
      const pointsData: (number | undefined)[] = TrackService.results.map(r => {
        return r.playerPlacements.find(placement => placement.id === player.id);
      }).map(result => result?.totalPoints);
      this.chart.addSeries({
        name: player.name.value,
        data: pointsData,
        color: this.stateService.getColor(player.id)
      } as any, undefined, false);
    });
  }

  public static getXIndex(x: any): number {
    if (Number.isInteger(x)) {
      return x;
    }
    return parseInt(x);
  }
}
