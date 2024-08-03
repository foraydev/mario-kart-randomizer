import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayersComponent } from './players/players.component';
import { PlayerInputComponent } from './player-input/player-input.component';
import { RaceComponent } from './race/race.component';
import { ResultsComponent } from './results/results.component';
import { PlayerRaceComponent } from './player-race/player-race.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    PlayersComponent,
    PlayerInputComponent,
    PlayerRaceComponent,
    RaceComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
