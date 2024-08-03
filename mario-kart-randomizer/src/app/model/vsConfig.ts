export class VsConfig {
    public numberOfRaces: number;
    public startingCourse: string;
    public courseSelection: string;
    public sortingField: string;
    public sortOrder: string;

    constructor(num: number, starter: string, selection: string, sortField: string, order: string) {
        this.numberOfRaces = num;
        this.startingCourse = starter;
        this.courseSelection = selection;
        this.sortingField = sortField;
        this.sortOrder = order;
    }
}