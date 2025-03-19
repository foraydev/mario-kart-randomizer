import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Track } from '../model/track';
import { VsConfig } from '../model/vsConfig';
import { RandomService } from './random.service';
import { StateService } from './state.service';
import { RaceResult } from '../model/race-result';
import { PlayerPlacement } from '../model/player-placement';
import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  public tracks: Track[];

  public tracksInRace: Track[];

  public static results: RaceResult[];

  public numberOfRaces: FormControl;
  public startingCourse: FormControl;
  public courseSelection: FormControl;
  public sortingField: FormControl;
  public sortingOrder: FormControl;
  public useBoosterCoursePass: FormControl;
  public useCTGPDX: FormControl;

  public courseSelectionOptions = [
    "Random",
    "In Order (MK8DX)",
    "In Order (Release)"
  ];

  public sortingFields = [
    "None",
    "Difficulty",
    "MK8DX Order",
    "Release Order"
  ];

  public currentRace = 0;

  constructor(
    public stateService: StateService
  ) {
    this.numberOfRaces = new FormControl(8);
    this.useBoosterCoursePass = new FormControl(true);
    this.useCTGPDX = new FormControl(true);

    this.tracks = [];
    this.tracksInRace = [];
    TrackService.results = [];

    this.generateTrackPool();

    this.startingCourse = new FormControl("Random");
    this.courseSelection = new FormControl("Random");
    this.sortingField = new FormControl("None");
    this.sortingOrder = new FormControl("Ascending");
  }

  public getVsConfig(): VsConfig {
    return new VsConfig(this.numberOfRaces.value, this.startingCourse.value, this.courseSelection.value, this.sortingField.value, this.sortingOrder.value);
  }

  public getCurrentRace(): string {
    return this.tracksInRace[this.currentRace].getCourseName();
  }

  public getCurrentRaceCup(): string {
    console.log('tracks: ', this.tracksInRace);
    return this.tracksInRace[this.currentRace].mk8Cup;
  }

  public isFinalRace(): boolean {
    return this.currentRace === this.tracksInRace.length - 1;
  }

  public advanceRace(): void {
    this.stateService.players.forEach(player => {
      player.points += player.pointsAdded.value;
    });
    TrackService.results.push(new RaceResult(this.currentRace + 1, this.getCurrentRace(), this.stateService.players.map(p => new PlayerPlacement(p))))
    if (this.currentRace + 1 >= this.tracksInRace.length) {
      this.stateService.setState('results');
    } else {
      this.currentRace++;
    }
  }

  public getCourseDropdownOptions(): string[] {
    return ["Random"].concat(this.tracks.map(t => t.getCourseName()));
  }

  public getSortingOptions(): string[] {
    if (this.courseSelection.value.includes("In Order")) {
      return ["Ascending", "Descending"];
    }
    if (this.sortingField.value == "Difficulty") {
      return ["Somewhat Ascending", "Somewhat Descending"];
    }
    return ["Ascending", "Somewhat Ascending", "Somewhat Descending", "Descending"];
  }

  public shouldUseStartingCourse(): boolean {
    return this.courseSelection.value !== "Random";
  }

  public shouldUseSortingField(): boolean {
    return this.courseSelection.value == "Random";
  }

  public shouldUseSortingOrder(): boolean {
    return !(this.courseSelection.value === "Random" && this.sortingField.value === "None");
  }

  public generateSetOfTracks(): void {
    this.generateTrackPool();
    this.currentRace = 0;
    this.stateService.players.forEach((player) => {
      player.points = 0;
    });
    TrackService.results = [];
    let numOfRaces = this.numberOfRaces.value;
    if (this.courseSelection.value == "Random") {
      this.tracksInRace = RandomService.selectFromList(this.tracks, numOfRaces);
      if (this.sortingField.value !== "None") {
        let config: VsConfig = this.getVsConfig();
        this.tracksInRace.forEach(t => t.setSeed(config));
        if (this.sortingOrder.value.includes("Ascending")) {
          this.tracksInRace.sort((a: Track, b: Track) => { return a.seed - b.seed; });
        } else {
          this.tracksInRace.sort((a: Track, b: Track) => { return b.seed - a.seed; });
        }
      }
    } else {
      let tempOrder;
      if (this.courseSelection.value == "In Order (MK8DX)") {
        tempOrder = RandomService.toSorted(this.tracks, (a: Track, b: Track) => { return a.numberInMk8 - b.numberInMk8; });
      } else {
        tempOrder = RandomService.toSorted(this.tracks, (a: Track, b: Track) => { return a.numberInSeries - b.numberInSeries; });
      }
      let startingTrackName = this.startingCourse.value === "Random" ? RandomService.selectFromList(this.tracks, 1)[0].getCourseName() : this.startingCourse.value;
      let startingIndex = this.tracks.findIndex((t: Track) => { return t.getCourseName() === startingTrackName; });
      console.log('starting course: '+startingTrackName);
      console.log('startingIndex: '+startingIndex);
      console.log(this.tracks.map(t => t.getCourseName()));
      this.tracksInRace = [];
      for (let i = 0; i < numOfRaces; i++) {
        let currIndex = this.sortingOrder.value.includes("Ascending") ? (startingIndex + i) % this.tracks.length : (startingIndex - i) % this.tracks.length;
        this.tracksInRace.push(tempOrder[currIndex]);
      }
    }
    this.stateService.setState('race');
  }

  public generateTrackPool(): void {
    this.tracks = [];
    this.tracks.push(new Track("", "Mario Kart Stadium", 1, 121, "Circuit", "Mushroom", "Mushroom"));
    this.tracks.push(new Track("", "Water Park", 2, 122, "Water", "Mushroom", "Mushroom"));
    this.tracks.push(new Track("", "Sweet Sweet Canyon", 3, 123, "Unique", "Mushroom", "Mushroom"));
    this.tracks.push(new Track("", "Thwomp Ruins", 4, 124, "Unique", "Mushroom", "Mushroom"));
    this.tracks.push(new Track("", "Mario Circuit", 5, 125, "Circuit", "Flower", "Flower"));
    this.tracks.push(new Track("", "Toad Harbor", 6, 126, "Unique", "Flower", "Flower"));
    this.tracks.push(new Track("", "Twisted Mansion", 7, 127, "Ghost", "Flower", "Flower"));
    this.tracks.push(new Track("", "Shy Guy Falls", 8, 128, "Unique", "Flower", "Flower"));
    this.tracks.push(new Track("", "Sunshine Airport", 9, 129, "Unique", "Star", "Star"));
    this.tracks.push(new Track("", "Dolphin Shoals", 10, 130, "Water", "Star", "Star"));
    this.tracks.push(new Track("", "Electrodrome", 11, 131, "Unique", "Star", "Star"));
    this.tracks.push(new Track("", "Mount Wario", 12, 132, "Snow", "Star", "Star"));
    this.tracks.push(new Track("", "Cloudtop Cruise", 13, 133, "Sky", "Special", "Special"));
    this.tracks.push(new Track("", "Bone-Dry Dunes", 14, 134, "Desert", "Special", "Special"));
    this.tracks.push(new Track("", "Bowser's Castle", 15, 135, "Lava","Special",  "Special"));
    this.tracks.push(new Track("", "Rainbow Road", 16, 136, "Space", "Special", "Special"));
    this.tracks.push(new Track("Wii", "Moo Moo Meadows", 17, 90, "Grass", "Shell", "Mushroom"));
    this.tracks.push(new Track("GBA", "Mario Circuit", 18, 41, "Circuit", "Shell", "Flower"));
    this.tracks.push(new Track("DS", "Cheep Cheep Beach", 19, 75, "Beach", "Shell", "Mushroom"));
    this.tracks.push(new Track("N64", "Toad's Turnpike", 20, 25, "City", "Shell", "Flower"));
    this.tracks.push(new Track("GCN", "Dry Dry Desert", 21, 60, "Desert", "Banana", "Mushroom"));
    this.tracks.push(new Track("SNES", "Donut Plains 3", 22, 16, "Grass", "Banana", "Special"));
    this.tracks.push(new Track("N64", "Royal Raceway", 23, 31, "Circuit", "Banana", "Star"));
    this.tracks.push(new Track("3DS", "DK Jungle", 24, 117, "Jungle", "Banana", "Special"));
    this.tracks.push(new Track("DS", "Wario Stadium", 25, 85, "Stadium", "Leaf", "Special"));
    this.tracks.push(new Track("GCN", "Sherbet Land", 26, 65, "Snow", "Leaf", "Star"));
    this.tracks.push(new Track("3DS", "Music Park", 27, 111, "Unique", "Leaf", "Flower"));
    this.tracks.push(new Track("N64", "Yoshi Valley", 28, 34, "Grass", "Leaf", "Special"));
    this.tracks.push(new Track("DS", "Tick-Tock Clock", 29, 82, "Unique", "Lightning", "Star"));
    this.tracks.push(new Track("3DS", "Piranha Plant Slide", 30, 113, "Water", "Lightning", "Star"));
    this.tracks.push(new Track("Wii", "Grumble Volcano", 31, 100, "Lava", "Lightning", "Star"));
    this.tracks.push(new Track("N64", "Rainbow Road", 32, 36, "Space", "Lightning", "Special"));
    this.tracks.push(new Track("GCN", "Yoshi Circuit", 33, 67, "Circuit", "Egg", "Star"));
    this.tracks.push(new Track("", "Excitebike Arena", 34, 137, "Stadium", "Egg", "Egg"));
    this.tracks.push(new Track("", "Dragon Driftway", 35, 138, "Unique", "Egg", "Egg"));
    this.tracks.push(new Track("", "Mute City", 36, 140, "City", "Egg", "Egg"));
    this.tracks.push(new Track("Wii", "Wario's Gold Mine", 37, 96, "Unique", "Triforce", "Flower"));
    this.tracks.push(new Track("SNES", "Rainbow Road", 38, 20, "Space", "Triforce", "Special"));
    this.tracks.push(new Track("", "Ice Ice Outpost", 39, 140, "Snow", "Triforce", "Triforce"));
    this.tracks.push(new Track("", "Hyrule Circuit", 40, 141, "Circuit", "Triforce", "Triforce"));
    this.tracks.push(new Track("GCN", "Baby Park", 41, 59, "Unique", "Crossing", "Mushroom"));
    this.tracks.push(new Track("GBA", "Cheese Land", 42, 43, "Desert", "Crossing", "Flower"));
    this.tracks.push(new Track("", "Wild Woods", 43, 142, "Jungle", "Crossing", "Crossing"));
    this.tracks.push(new Track("", "Animal Crossing", 44, 143, "Unique", "Crossing", "Crossing"));
    this.tracks.push(new Track("3DS", "Neo Bowser City", 45, 115, "City", "Bell", "Star"));
    this.tracks.push(new Track("GBA", "Ribbon Road", 46, 50, "Unique", "Bell", "Star"));
    this.tracks.push(new Track("", "Super Bell Subway", 47, 144, "Unique", "Bell", "Bell"));
    this.tracks.push(new Track("", "Big Blue", 48, 145, "Unique", "Bell", "Bell"));
    if (this.useBoosterCoursePass.value) {
      this.tracks.push(new Track("Tour", "Paris Promenade", 49, 147, "City", "Golden Dash", "Tour"));
      this.tracks.push(new Track("3DS", "Toad Circuit", 50, 105, "Circuit", "Golden Dash", "Mushroom"));
      this.tracks.push(new Track("N64", "Choco Mountain", 51, 27, "Mountain", "Golden Dash", "Flower"));
      this.tracks.push(new Track("Wii", "Coconut Mall", 52, 94, "Unique", "Golden Dash", "Flower"));
      this.tracks.push(new Track("Tour", "Tokyo Blur", 53, 147, "City", "Lucky Cat", "Tour"));
      this.tracks.push(new Track("DS", "Shroom Ridge", 54, 80, "Grass", "Lucky Cat", "Flower"));
      this.tracks.push(new Track("GBA", "Sky Garden", 55, 46, "Sky", "Lucky Cat", "Lightning"));
      this.tracks.push(new Track("", "Ninja Hideaway", 56, 159, "Unique", "Lucky Cat", "Tour"));
      this.tracks.push(new Track("Tour", "New York Minute", 57, 146, "City", "Turnip", "Tour"));
      this.tracks.push(new Track("SNES", "Mario Circuit 3", 58, 10, "Circuit", "Turnip", "Flower"));
      this.tracks.push(new Track("N64", "Kalimari Desert", 59, 24, "Desert", "Turnip", "Mushroom"));
      this.tracks.push(new Track("DS", "Waluigi Pinball", 60, 79, "Unique", "Turnip", "Flower"));
      this.tracks.push(new Track("Tour", "Sydney Sprint", 61, 160, "City", "Propeller", "Tour"));
      this.tracks.push(new Track("GBA", "Snow Land", 62, 49, "Snow", "Propeller", "Star"));
      this.tracks.push(new Track("Wii", "Mushroom Gorge", 63, 91, "Grass", "Propeller", "Mushroom"));
      this.tracks.push(new Track("", "Sky-High Sundae", 64, 166, "Unique", "Propeller", "Tour"));
      this.tracks.push(new Track("Tour", "London Loop", 65, 149, "City", "Rock", "Tour"));
      this.tracks.push(new Track("GBA", "Boo Lake", 66, 42, "Ghost", "Rock", "Flower"));
      this.tracks.push(new Track("3DS", "Rock Rock Mountain", 67, 112, "Mountain", "Rock", "Flower"));
      this.tracks.push(new Track("Wii", "Maple Treeway", 68, 99, "Unique", "Rock", "Star"));
      this.tracks.push(new Track("Tour", "Berlin Byways", 69, 157, "City", "Moon", "Tour"));
      this.tracks.push(new Track("DS", "Peach Gardens", 70, 86, "Grass", "Moon", "Special"));
      this.tracks.push(new Track("", "Merry Mountain", 71, 155, "Snow", "Moon", "Tour"));
      this.tracks.push(new Track("3DS", "Rainbow Road", 72, 120, "Space", "Moon", "Special"));
      this.tracks.push(new Track("Tour", "Amsterdam Drift", 73, 164, "City", "Fruit", "Tour"));
      this.tracks.push(new Track("GBA", "Riverside Park", 74, 39, "Jungle", "Fruit", "Mushroom"));
      this.tracks.push(new Track("Wii", "DK Summit", 75, 95, "Snow", "Fruit", "Flower"));
      this.tracks.push(new Track("", "Yoshi's Island", 76, 170, "Unique", "Fruit", "Tour"));
      this.tracks.push(new Track("Tour", "Bangkok Rush", 77, 165, "City", "Boomerang", "Tour"));
      this.tracks.push(new Track("DS", "Mario Circuit", 78, 83, "Circuit", "Boomerang", "Star"));
      this.tracks.push(new Track("GCN", "Waluigi Stadium", 79, 64, "Stadium", "Boomerang", "Flower"));
      this.tracks.push(new Track("Tour", "Singapore Speedway", 80, 163, "City", "Boomerang", "Tour"));
      this.tracks.push(new Track("Tour", "Athens Dash", 81, 171, "City", "Feather", "Tour"));
      this.tracks.push(new Track("GCN", "Daisy Cruiser", 82, 63, "Unique", "Feather", "Flower"));
      this.tracks.push(new Track("Wii", "Moonview Highway", 83, 102, "City", "Feather", "Special"));
      this.tracks.push(new Track("", "Squeaky-Clean Sprint", 84, 172, "Unique", "Feather", "Tour"));
      this.tracks.push(new Track("Tour", "Los Angeles Laps", 85, 154, "City", "Cherry", "Tour"));
      this.tracks.push(new Track("GBA", "Sunset Wilds", 86, 48, "Desert", "Cherry", "Lightning"));
      this.tracks.push(new Track("Wii", "Koopa Cape", 87, 98, "Water", "Cherry", "Star"));
      this.tracks.push(new Track("Tour", "Vancouver Velocity", 88, 150, "City", "Cherry", "Tour"));
      this.tracks.push(new Track("Tour", "Rome Avanti", 89, 173, "City", "Acorn", "Tour"));
      this.tracks.push(new Track("GCN", "DK Mountain", 90, 68, "Mountain", "Acorn", "Flower"));
      this.tracks.push(new Track("Wii", "Daisy Circuit", 91, 97, "Circuit", "Acorn", "Star"));
      this.tracks.push(new Track("", "Piranha Plant Cove", 92, 169, "Water", "Acorn", "Tour"));
      this.tracks.push(new Track("Tour", "Madrid Drive", 93, 175, "City", "Spiny", "Tour"));
      this.tracks.push(new Track("3DS", "Rosalina's Ice World", 94, 118, "Snow", "Spiny", "Special"));
      this.tracks.push(new Track("SNES", "Bowser Castle 3", 95, 14, "Lava", "Spiny", "Star"));
      this.tracks.push(new Track("Wii", "Rainbow Road", 96, 104, "Space", "Spiny", "Special"));
    }
    if (this.useCTGPDX.value) {
      this.tracks.push(new Track("GPDX", "Omatsuri Circuit", 97, 120.45, "Circuit", "Boo", "GP"));
      this.tracks.push(new Track("SNES", "Vanilla Lake 1", 98, 13, "Snow", "Boo", "Star"));
      this.tracks.push(new Track("GBA", "Broken Pier", 99, 54, "Ghost", "Boo", "Special"));
      this.tracks.push(new Track("", "Mystic Tangle", 100, 165.5, "Jungle", "Boo", "Custom"));
      this.tracks.push(new Track("GP", "Snow Panic", 101, 88.5, "Snow", "Blooper", "GP"));
      this.tracks.push(new Track("SNES", "Mario Circuit 2", 102, 5, "Circuit", "Blooper", "Mushroom"));
      this.tracks.push(new Track("", "Volcanic Skyway", 103, 158.5, "Unique", "Blooper", "Custom"));
      this.tracks.push(new Track("", "Whale Lagoon", 104, 179, "Unique", "Blooper", "Custom"));
      this.tracks.push(new Track("GPDX", "DK Jungle", 105, 120.7, "Jungle", "Penguin", "GP"));
      this.tracks.push(new Track("N64", "Frappe Snowland", 106, 26, "Snow", "Penguin", "Flower"));
      this.tracks.push(new Track("3DS", "Mario Circuit", 107, 110, "Circuit", "Penguin", "Flower"));
      this.tracks.push(new Track("DKR", "Jungle Falls", 108, 36.43, "Jungle", "Penguin", "DKR"));
      this.tracks.push(new Track("SNES", "Koopa Beach 1", 109, 11, "Beach", "Piranha Plant", "Star"));
      this.tracks.push(new Track("GCN", "Mario Circuit", 110, 62, "Circuit", "Piranha Plant", "Flower"));
      this.tracks.push(new Track("DS", "Desert Hills", 111, 77, "Desert", "Piranha Plant", "Flower"));
      this.tracks.push(new Track("", "Pill Hill Valley", 112, 180, "Grass", "Piranha Plant", "Custom"));
      this.tracks.push(new Track("GBA", "Lakeside Park", 113, 53, "Jungle", "Cloud", "Special"));
      this.tracks.push(new Track("", "Wario Circuit", 114, 165.4, "Circuit", "Cloud", "Custom"));
      this.tracks.push(new Track("N64", "Banshee Boardwalk", 115, 35, "Ghost", "Cloud", "Special"));
      this.tracks.push(new Track("", "Creep Sea Cape", 116, 165.45, "Water", "Cloud", "Custom"));
      this.tracks.push(new Track("N64", "Koopa Troopa Beach", 117, 23, "Beach", "Crown", "Mushroom"));
      this.tracks.push(new Track("3DS", "Wario Shipyard", 118, 114, "Water", "Crown", "Star"));
      this.tracks.push(new Track("", "Somnom Labyrinth", 119, 168.6, "Unique", "Crown", "Custom"));
      this.tracks.push(new Track("DKR", "Walrus Cove", 120, 36.46, "Snow", "Crown", "DKR"));
      this.tracks.push(new Track("SNES", "Koopa Beach 2", 121, 17, "Beach", "Grand Star", "Special"));
      this.tracks.push(new Track("", "Green Hill Zone", 122, 165.43, "Unique", "Grand Star", "Custom"));
      this.tracks.push(new Track("", "Cavi Cape Cliffside", 123, 165.47, "Mountain", "Grand Star", "Custom"));
      this.tracks.push(new Track("", "Nabbit's Secret Island", 124, 168.5, "Grass", "Grand Star", "Custom"));
      this.tracks.push(new Track("Wii", "Luigi Circuit", 125, 89, "Circuit", "Multi Moon", "Mushroom"));
      this.tracks.push(new Track("RMX", "Choco Island 1", 126, 152, "Mountain", "Multi Moon", "Tour"));
      this.tracks.push(new Track("", "Boshi's Skatepark", 127, 158.4, "Unique", "Multi Moon", "Custom"));
      this.tracks.push(new Track("", "Windmill Isle", 128, 181, "Unique", "Multi Moon", "Custom"));
      this.tracks.push(new Track("", "Sky High Cathedral", 129, 177, "Ghost", "Invincibility Leaf", "Custom"));
      this.tracks.push(new Track("", "Shipwreck Shore", 130, 177.1, "Unique", "Invincibility Leaf", "Custom"));
      this.tracks.push(new Track("GPDX", "Bowser's Castle", 131, 120.9, "Lava", "Invincibility Leaf", "GP"));
      this.tracks.push(new Track("N64", "DK's Jungle Parkway", 132, 33, "Jungle", "Invincibility Leaf", "Special"));
      this.tracks.push(new Track("", "Humpback Pump Track", 133, 145.5, "Unique", "Squid", "Custom"));
      this.tracks.push(new Track("", "Area 64", 134, 170.6, "Grass", "Squid", "Custom"));
      this.tracks.push(new Track("", "Cheep Cheep Cove", 135, 168.5, "Water", "Squid", "Custom"));
      this.tracks.push(new Track("", "Teehee Trails", 136, 168.7, "Desert", "Squid", "Custom"));
      this.tracks.push(new Track("DKR", "Fossil Canyon", 137, 36.42, "Desert", "Heart", "Custom"));
      this.tracks.push(new Track("DS", "DK Pass", 138, 81, "Snow", "Heart", "Star"));
      this.tracks.push(new Track("GBA", "Bowser Castle 4", 139, 55, "Lava", "Heart", "Special"));
      this.tracks.push(new Track("RMX", "Rainbow Road 1", 140, 153, "Space", "Heart", "Tour"));
      this.tracks.push(new Track("", "Dry Dry Falls", 141, 177.2, "Desert", "Shine Sprite", "Custom"));
      this.tracks.push(new Track("SNES", "Donut Plains 2", 142, 8, "Grass", "Shine Sprite", "Flower"));
      this.tracks.push(new Track("GP", "Pac Mountain", 143, 88.7, "Grass", "Shine Sprite", "GP"));
      this.tracks.push(new Track("", "Vacay Bay", 144, 162.5, "Beach", "Shine Sprite", "Custom"));
      this.tracks.push(new Track("", "Moo Moo Mountain", 145, 170.5, "Grass", "Life Mushroom", "Custom"));
      this.tracks.push(new Track("GPDX", "Tropical Coast", 146, 120.35, "Beach", "Life Mushroom", "GP"));
      this.tracks.push(new Track("3DS", "Shy Guy Bazaar", 147, 108, "Desert", "Life Mushroom", "Mushroom"));
      this.tracks.push(new Track("N64", "Bowser's Castle", 148, 32, "Lava", "Life Mushroom", "Special"));
      this.tracks.push(new Track("GPDX", "Kingdom Way", 149, 120.25, "Unique", "Ice Flower", "GP"));
      this.tracks.push(new Track("", "Alpine Skyway", 150, 168.65, "Snow", "Ice Flower", "Custom"));
      this.tracks.push(new Track("Wii", "Bowser's Castle", 151, 103, "Lava", "Ice Flower", "Special"));
      this.tracks.push(new Track("GBA", "Rainbow Road", 152, 56, "Space", "Ice Flower", "Special"));
      this.tracks.push(new Track("SNES", "Choco Island 1", 153, 6, "Mountain", "Prankster Comet", "Flower"));
      this.tracks.push(new Track("DKR", "Haunted Woods", 154, 36.56, "Ghost", "Prankster Comet", "DKR"));
      this.tracks.push(new Track("3DS", "Bowser's Castle", 155, 119, "Lava", "Prankster Comet", "Special"));
      this.tracks.push(new Track("DS", "Rainbow Road", 156, 88, "Space", "Prankster Comet", "Special"));
      this.tracks.push(new Track("GCN", "Mushroom Bridge", 157, 61, "Grass", "Coin", "Flower"));
      this.tracks.push(new Track("GBA", "Luigi Circuit", 158, 45, "Circuit", "Coin", "Lightning"));
      this.tracks.push(new Track("DS", "Delfino Square", 159, 78, "City", "Coin", "Flower"));
      this.tracks.push(new Track("", "Piranha Plant Pipeline", 160, 173, "Unique", "Coin", "Tour"));
    }
  }
}
