import { Component } from '@angular/core';
import { PokemonData } from './models/pokemon.model';

@Component({
  selector: 'app-root',
  template: ` <div class="container">
    <h1>Simple <img [src]="pokemonLogoUrl" width="100" /> Search</h1>
    <app-form (pokemonEmitter)="pokemon = $event"></app-form>
    <app-card [pokemon]="pokemon"></app-card>
    <router-outlet></router-outlet>
  </div>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pokemon?: PokemonData;
  pokemonLogoUrl: string =
    'https://assets.pokemon.com/assets/cms2-pt-br/img/misc/gus/buttons/logo-pokemon-79x45.png';
}
