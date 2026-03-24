import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { PokemonData, PokemonList } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  pokemon?: PokemonData;
  @Output() pokemonEmitter = new EventEmitter<PokemonData>();
  @ViewChild('field') field: ElementRef<HTMLInputElement>;

  searchTerm = new Subject<string>();
  suggestions: string[] = [];
  loading: boolean = false;
  showSearchButton: boolean = false;

  constructor(private pokemonService: PokemonService) {
    this.pokemonService.pokemonObservable.subscribe((p) => (this.pokemon = p));
  }

  ngOnInit(): void {
    // Observa o loading do serviço
    this.pokemonService.loadingPokemons.subscribe((isLoading) => {
      this.loading = isLoading;
    });

    // Fluxo de autocomplete
    this.searchTerm
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((term) => this.pokemonService.search(term)),
      )
      .subscribe((results) => {
        this.suggestions = results;
      });
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    // Se contém número → mostra botão e limpa sugestões
    if (/^\d+$/.test(value)) {
      this.suggestions = [];
      this.showSearchButton = true;
      return;
    }

    // Se só tem letras → autocomplete normal
    this.showSearchButton = false;
    this.searchTerm.next(value);
  }

  onKeyDown(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;

    if (/^\d+$/.test(value) && event.key === 'Enter') {
      this.getPokemon(value);
    }
  }

  getPokemon(name: string) {
    this.loading = true;
    this.suggestions = [];
    this.pokemonService.pokemonObservable.next(undefined);
    name = name.replaceAll(' ', '-');
    this.pokemonService.getPokemon(name).subscribe({
      next: (res) => {
        this.field.nativeElement.blur();
        this.pokemonService.pokemonObservable.next({
          id: res.id,
          name: res.name,
          sprites: res.sprites,
          types: res.types,
        });
        this.loading = false;
        this.pokemonEmitter.emit(this.pokemon);
        this.pokemonService.urlImgObservable.next(
          environment.pokeApiImg.img + res.id.toString() + '.png',
        );
        this.pokemonService.error.next(false);
      },
      error: (err) => {
        this.field.nativeElement.value = '';
        this.field.nativeElement.blur();
        this.loading = false;
        this.pokemonEmitter.emit(undefined);
        this.pokemonService.error.next(true);
      },
    });
  }
}
