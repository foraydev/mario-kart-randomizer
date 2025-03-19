import { RandomService } from "../service/random.service";
import { VsConfig } from "./vsConfig";

export class Track {
    public prefix: string;
    public name: string;
    public numberInMk8: number;
    public numberInSeries: number;
    public biome: string;
    public mk8Cup: string;
    public originCup: string;
    public seed: number = 0;

    constructor(tPrefix: string, tName: string, tNumMk8: number, tNumSeries: number, tBiome: string, tMk8Cup: string, tCup: string) {
        this.prefix = tPrefix;
        this.name = tName;
        this.numberInMk8 = tNumMk8;
        this.numberInSeries = tNumSeries;
        this.biome = tBiome;
        this.mk8Cup = tMk8Cup;
        this.originCup = tCup;
    }

    getCourseName(): string {
        if (this.prefix === "") { return this.name; }
        return this.prefix + " " + this.name;
    }

    getDifficulty(): number {
        switch (this.originCup) {
            case "Mushroom":
                return 0;
            case "Flower":
                return 1;
            case "Lightning":
                return 2;
            case "Star":
                return 3;
            case "Special":
                return 4;
            case "Egg":
                return 2;
            case "Triforce":
                return 0.5;
            case "Crossing":
                return 0.9;
            case "Bell":
                return 3.1;
            case "Tour":
                return 1;
            case "GP":
                return 0.5;
            case "DKR":
                return 1.5;
            case "Custom":
            default:
                return 2;
        }
    }

    public setSeed(config: VsConfig): void {
        if (config.courseSelection != "Random") { return; }
        if (config.sortingField === "None") { return; }
        // difficulty
        let minVal: number = 0;
        let maxVal: number = 4;
        let trackValue: number = this.getDifficulty();
        if (config.sortingField === "MK8DX Order") {
            minVal = 0;
            maxVal = 160;
            trackValue = this.numberInMk8;
        } else if (config.sortingField === "Release Order") {
            minVal = 0;
            maxVal = 181;
            trackValue = this.numberInSeries;
        }
        let randomStrength = config.sortOrder.includes("Somewhat") ? 0.2 : 0;
        let salt = randomStrength === 0 ? 0 : (maxVal - minVal) * RandomService.random(-1, 1);
        this.seed = trackValue + randomStrength * salt;
    }

    public setSeedFromSortedList(config: VsConfig, sortedList: Track[]): void {
        let minVal: number = 0;
        let maxVal: number = 4;
        let trackValue: number = 0;
        if (config.sortingField === "Alphabetical") {
            minVal = 0;
            maxVal = 160;
            trackValue = sortedList.findIndex(t => t.getCourseName() === this.getCourseName());
        }
        let randomStrength = config.sortOrder.includes("Somewhat") ? 0.2 : 0;
        let salt = randomStrength === 0 ? 0 : (maxVal - minVal) * RandomService.random(-1, 1);
        this.seed = trackValue + randomStrength * salt;
    }
}