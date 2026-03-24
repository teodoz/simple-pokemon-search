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

    // Hide loader when Angular app is stable (initial rendering complete).
    this.appRef.isStable
      .pipe(first((stable) => stable === true))
      .subscribe(() => {
        this.loading = false;
      });
    // fallback: hide loader after 5s in case isStable doesn't emit
    setTimeout(() => (this.loading = false), 5000);
  }

  closeTstr() {
    this.tstr = false;
  }

  changeLanguage(code: string) {
    this.translate.use(code);
  }
}
