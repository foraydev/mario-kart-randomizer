import { Component, Input } from '@angular/core';
import { CharacterService } from '../service/character.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.css']
})
export class CharacterSelectComponent {
  @Input({required: true})
  public control: FormControl;

  constructor(
    public characterService: CharacterService
  ) {
    this.control = new FormControl();
  }

  setNewValue(newVal: string) {
    this.control.patchValue(newVal);
  }
}
