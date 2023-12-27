import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  constructor(private pokeService: PokemonService) {
    this.pokeService.urlImgObservable.subscribe((u) => (this.urlImg = u));
  }

  ngOnInit(): void {}

  onImageLoad() {
    this.loaded = true;
  }
}
