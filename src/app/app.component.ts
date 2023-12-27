import { PokemonService } from 'src/app/services/pokemon.service';
import { Component } from '@angular/core';
import { PokemonData } from './models/pokemon.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: ` <div class="container">
      <div class="languages">
        <button
          *ngFor="let lang of languages"
          class="flag"
          (click)="changeLanguage(lang)"
          [ngClass]="{ active: this.translate.currentLang === lang }"
          [title]="lang === 'en' ? 'English' : 'Português (Brasil)'"
        >
          <img
            [src]="'assets/' + lang + '.svg'"
            width="21"
            [height]="lang === 'en' ? '14' : '15'"
            [alt]="lang"
          />
        </button>
      </div>
      <h1>
        <span class="angular"
          ><img class="logo" src="assets/angular-logo.svg" width="70" /></span
        ><img [src]="pokemonLogoUrl" width="100" /><span>{{
          'main.header.search' | translate
        }}</span>
      </h1>
      <span class="teodoz"
        >{{ 'main.header.author.by' | translate }}
        <strong>Saulo Teodoz</strong></span
      >
      <app-form (pokemonEmitter)="pokemon = $event"></app-form>
      <app-card [pokemon]="pokemon"></app-card>
      <router-outlet></router-outlet>
    </div>
    <div class="tstr" [ngClass]="{ show: tstr }">
      <div class="container">
        <div class="header">
          <h3>{{ 'main.tstr.title' | translate }}</h3>
          <div class="close" (click)="closeTstr()">✖</div>
        </div>
        <span>{{ 'main.tstr.description' | translate }}</span>
      </div>
    </div>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pokemon?: PokemonData;
  tstr: boolean;
  pokemonLogoUrl: string = 'assets/pokemon.svg';
  languages: string[] = ['pt-BR', 'en'];

  constructor(
    private pokeService: PokemonService,
    public translate: TranslateService
  ) {
    pokeService.error.subscribe((err) => (this.tstr = err));
  }

  closeTstr() {
    this.tstr = false;
  }

  changeLanguage(code: string) {
    this.translate.use(code);
  }
}
