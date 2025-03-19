import { Injectable } from "@angular/core";
import { Character } from "../model/character";

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    characters: Character[] = [
        {
            key: 'mario',
            name: 'Mario',
            imageUrl: 'mario-icon.png'
        },
        {
            key: 'luigi',
            name: 'Luigi',
            imageUrl: 'luigi-icon.png'
        },
        {
            key: 'peach',
            name: 'Peach',
            imageUrl: 'peach-icon.png'
        },
        {
            key: 'daisy',
            name: 'Daisy',
            imageUrl: 'daisy-icon.png'
        },
        {
            key: 'rosalina',
            name: 'Rosalina',
            imageUrl: 'rosalina-icon.png'
        },
        {
            key: 'yoshi',
            name: 'Yoshi',
            imageUrl: 'yoshi-icon.png'
        },
        {
            key: 'yoshi-lblue',
            name: 'Light Blue Yoshi',
            imageUrl: 'yoshi-icon-lblue.png'
        },
        {
            key: 'yoshi-black',
            name: 'Black Yoshi',
            imageUrl: 'yoshi-icon-black.png'
        },
        {
            key: 'yoshi-red',
            name: 'Red Yoshi',
            imageUrl: 'yoshi-icon-red.png'
        },
        {
            key: 'yoshi-yellow',
            name: 'Yellow Yoshi',
            imageUrl: 'yoshi-icon-yellow.png'
        },
        {
            key: 'yoshi-white',
            name: 'White Yoshi',
            imageUrl: 'yoshi-icon-white.png'
        },
        {
            key: 'yoshi-dblue',
            name: 'Blue Yoshi',
            imageUrl: 'yoshi-icon-dblue.png'
        },
        {
            key: 'yoshi-pink',
            name: 'Pink Yoshi',
            imageUrl: 'yoshi-icon-pink.png'
        },
        {
            key: 'yoshi-orange',
            name: 'Orange Yoshi',
            imageUrl: 'yoshi-icon-orange.png'
        },
        {
            key: 'toad',
            name: 'Toad',
            imageUrl: 'toad-icon.png'
        },
        {
            key: 'koopa-troopa',
            name: 'Koopa Troopa',
            imageUrl: 'koopa-troopa-icon.png'
        },
        {
            key: 'shy-guy',
            name: 'Shy Guy',
            imageUrl: 'shy-guy-icon.png'
        },
        {
            key: 'shy-guy-lblue',
            name: 'Light Blue Shy Guy',
            imageUrl: 'shy-guy-icon-lblue.png'
        },
        {
            key: 'shy-guy-black',
            name: 'Black Shy Guy',
            imageUrl: 'shy-guy-icon-black.png'
        },
        {
            key: 'shy-guy-green',
            name: 'Green Shy Guy',
            imageUrl: 'shy-guy-icon-green.png'
        },
        {
            key: 'shy-guy-yellow',
            name: 'Yellow Shy Guy',
            imageUrl: 'shy-guy-icon-yellow.png'
        },
        {
            key: 'shy-guy-white',
            name: 'White Shy Guy',
            imageUrl: 'shy-guy-icon-white.png'
        },
        {
            key: 'shy-guy-dblue',
            name: 'Blue Shy Guy',
            imageUrl: 'shy-guy-icon-dblue.png'
        },
        {
            key: 'shy-guy-pink',
            name: 'Pink Shy Guy',
            imageUrl: 'shy-guy-icon-pink.png'
        },
        {
            key: 'shy-guy-orange',
            name: 'Orange Shy Guy',
            imageUrl: 'shy-guy-icon-orange.png'
        },
        {
            key: 'lakitu',
            name: 'Lakitu',
            imageUrl: 'lakitu-icon.png'
        },
        {
            key: 'toadette',
            name: 'Toadette',
            imageUrl: 'toadette-icon.png'
        },
        {
            key: 'king-boo',
            name: 'King Boo',
            imageUrl: 'king-boo-icon.png'
        },
        {
            key: 'baby-mario',
            name: 'Baby Mario',
            imageUrl: 'baby-mario-icon.png'
        },
        {
            key: 'baby-luigi',
            name: 'Baby Luigi',
            imageUrl: 'baby-luigi-icon.png'
        },
        {
            key: 'baby-peach',
            name: 'Baby Peach',
            imageUrl: 'baby-peach-icon.png'
        },
        {
            key: 'baby-daisy',
            name: 'Baby Daisy',
            imageUrl: 'baby-daisy-icon.png'
        },
        {
            key: 'baby-rosalina',
            name: 'Baby Rosalina',
            imageUrl: 'baby-rosalina-icon.png'
        },
        {
            key: 'metal-mario',
            name: 'Metal Mario',
            imageUrl: 'metal-mario-icon.png'
        },
        {
            key: 'gold-mario',
            name: 'Gold Mario',
            imageUrl: 'gold-mario-icon.png'
        },
        {
            key: 'pink-gold-peach',
            name: 'Pink Gold Peach',
            imageUrl: 'pink-gold-peach-icon.png'
        },
        {
            key: 'wario',
            name: 'Wario',
            imageUrl: 'wario-icon.png'
        },
        {
            key: 'waluigi',
            name: 'Waluigi',
            imageUrl: 'waluigi-icon.png'
        },
        {
            key: 'donkey-kong',
            name: 'Donkey Kong',
            imageUrl: 'donkey-kong-icon.png'
        },
        {
            key: 'bowser',
            name: 'Bowser',
            imageUrl: 'bowser-icon.png'
        },
        {
            key: 'dry-bones',
            name: 'Dry Bones',
            imageUrl: 'dry-bones-icon.png'
        },
        {
            key: 'bowser-jr',
            name: 'Bowser Jr.',
            imageUrl: 'bowser-jr-icon.png'
        },
        {
            key: 'dry-bowser',
            name: 'Dry Bowser',
            imageUrl: 'dry-bowser-icon.png'
        },
        {
            key: 'lemmy',
            name: 'Lemmy',
            imageUrl: 'lemmy-icon.png'
        },
        {
            key: 'larry',
            name: 'Larry',
            imageUrl: 'larry-icon.png'
        },
        {
            key: 'wendy',
            name: 'Wendy',
            imageUrl: 'wendy-icon.png'
        },
        {
            key: 'ludwig',
            name: 'Ludwig',
            imageUrl: 'ludwig-icon.png'
        },
        {
            key: 'iggy',
            name: 'Iggy',
            imageUrl: 'iggy-icon.png'
        },
        {
            key: 'roy',
            name: 'Roy',
            imageUrl: 'roy-icon.png'
        },
        {
            key: 'morton',
            name: 'Morton',
            imageUrl: 'morton-icon.png'
        },
        {
            key: 'tanooki-mario',
            name: 'Tanooki Mario',
            imageUrl: 'tanooki-mario-icon.png'
        },
        {
            key: 'cat-peach',
            name: 'Cat Peach',
            imageUrl: 'cat-peach-icon.png'
        },
        {
            key: 'link',
            name: 'Link',
            imageUrl: 'link-icon.png'
        },
        {
            key: 'link-botw',
            name: 'Link',
            imageUrl: 'link-icon-botw.png'
        },
        {
            key: 'villager-male',
            name: 'Villager',
            imageUrl: 'villager-male-icon.png'
        },
        {
            key: 'villager-female',
            name: 'Villager',
            imageUrl: 'villager-female-icon.png'
        },
        {
            key: 'isabelle',
            name: 'Isabelle',
            imageUrl: 'isabelle-icon.png'
        },
        {
            key: 'inkling-girl',
            name: 'Inkling Girl',
            imageUrl: 'inkling-girl-icon.png'
        },
        {
            key: 'inkling-girl-green',
            name: 'Inkling Girl',
            imageUrl: 'inkling-girl-icon-green.png'
        },
        {
            key: 'inkling-girl-pink',
            name: 'Inkling Girl',
            imageUrl: 'inkling-girl-icon-pink.png'
        },
        {
            key: 'inkling-boy',
            name: 'Inkling Boy',
            imageUrl: 'inkling-boy-icon.png'
        },
        {
            key: 'inkling-boy-purple',
            name: 'Inkling Boy',
            imageUrl: 'inkling-boy-icon-purple.png'
        },
        {
            key: 'inkling-boy-lblue',
            name: 'Inkling Boy',
            imageUrl: 'inkling-boy-icon-lblue.png'
        },
        {
            key: 'birdo',
            name: 'Birdo',
            imageUrl: 'birdo-icon.png'
        },
        {
            key: 'birdo-lblue',
            name: 'Birdo (Light Blue)',
            imageUrl: 'birdo-icon-lblue.png'
        },
        {
            key: 'birdo-black',
            name: 'Birdo (Black)',
            imageUrl: 'birdo-icon-black.png'
        },
        {
            key: 'birdo-red',
            name: 'Birdo (Red)',
            imageUrl: 'birdo-icon-red.png'
        },
        {
            key: 'birdo-yellow',
            name: 'Birdo (Yellow)',
            imageUrl: 'birdo-icon-yellow.png'
        },
        {
            key: 'birdo-white',
            name: 'Birdo (White)',
            imageUrl: 'birdo-icon-white.png'
        },
        {
            key: 'birdo-dblue',
            name: 'Birdo (Blue)',
            imageUrl: 'birdo-icon-dblue.png'
        },
        {
            key: 'birdo-green',
            name: 'Birdo (Green)',
            imageUrl: 'birdo-icon-green.png'
        },
        {
            key: 'birdo-orange',
            name: 'Birdo (Orange)',
            imageUrl: 'birdo-icon-orange.png'
        },
        {
            key: 'petey-piranha',
            name: 'Petey Piranha',
            imageUrl: 'petey-piranha-icon.png'
        },
        {
            key: 'wiggler',
            name: 'Wiggler',
            imageUrl: 'wiggler-icon.png'
        },
        {
            key: 'kamek',
            name: 'Kamek',
            imageUrl: 'kamek-icon.png'
        },
        {
            key: 'diddy-kong',
            name: 'Diddy Kong',
            imageUrl: 'diddy-kong-icon.png'
        },
        {
            key: 'funky-kong',
            name: 'Funky-Kong',
            imageUrl: 'funky-kong-icon.png'
        },
        {
            key: 'pauline',
            name: 'Pauline',
            imageUrl: 'pauline-icon.png'
        },
        {
            key: 'peachette',
            name: 'Peachette',
            imageUrl: 'peachette-icon.png'
        },
        {
            key: 'mii',
            name: 'Mii',
            imageUrl: 'mii-icon.png'
        },
    ];

    baseUrl: string = '../../assets/images/characters/';

    public getImageUrl(key: string): string {
        return this.baseUrl + this.characters.find(c => c.key === key)?.imageUrl;
    }

    public getCharacterName(key: string): string | undefined {
        return this.characters.find(c => c.key === key)?.name;
    }
}