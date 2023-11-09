import { Component, Input, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() pokemon?: PokemonData;

  constructor() {}

  ngOnInit(): void {}
}
