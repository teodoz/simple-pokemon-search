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
  urlImg: string;
  loaded: boolean;
  currentYear: number;

  constructor(private pokemonService: PokemonService) {
    this.pokemonService.urlImgObservable.subscribe((u) => (this.urlImg = u));
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  onImageLoad() {
    this.loaded = true;
  }
}
