import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RandomService {
    public static random(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    public static randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    public static selectFromList(list: any[], num: number): any[] {
        if (num < 1) { num = 1; }
        if (num > list.length) { num = list.length; }
        let bucket = [];
        let retVal = [];

        for (let i = 0; i <= list.length; i++) {
            bucket.push(i);
        }

        while (retVal.length < num) {
            var randomIndex = Math.floor(Math.random()*(bucket.length - 1));
            retVal.push(list[bucket.splice(randomIndex, 1)[0]]);
        }
        return retVal;
    }

    public static toSorted(list: any[], compareFn: (a: any, b: any) => number): any[] {
        let newList = list.map(e => e);
        newList.sort(compareFn);
        return newList;
    }
}