import { PokemonService } from 'src/app/services/pokemon.service';
import { Component, ApplicationRef } from '@angular/core';
import { PokemonData } from './models/pokemon.model';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pokemon?: PokemonData;
  tstr: boolean;
  loading: boolean = true;
  pokemonLogoUrl: string = 'assets/pokemon.svg';
  languages: string[] = ['pt-br', 'en'];

  constructor(
    private pokeService: PokemonService,
    public translate: TranslateService,
    private appRef: ApplicationRef,
  ) {
    this.pokeService.error.subscribe((err) => (this.tstr = err));

    // Ocultar carregador quando o aplicativo Angular está estável (renderização inicial concluída).
    this.appRef.isStable
      .pipe(first((stable) => stable === true))
      .subscribe(() => {
        this.loading = false;
      });
    // fallback: ocultar carregador após 5s caso isStable não emita
    setTimeout(() => (this.loading = false), 2000);
  }

  closeTstr() {
    this.tstr = false;
  }

  changeLanguage(code: string) {
    this.translate.use(code);
  }
}
