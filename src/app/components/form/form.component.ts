import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { of } from 'rxjs';
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
  @ViewChild('field') field: ElementRef | undefined;

  loading: boolean = false;

  constructor(private pokeService: PokemonService) {
    this.pokeService.pokemonObservable.subscribe((p) => (this.pokemon = p));
  }

  ngOnInit(): void {}

  checkEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.getPokemon(this.field?.nativeElement?.value);
    }
  }

  getPokemon(name: string) {
    this.loading = true;
    this.pokeService.pokemonObservable.next(undefined);
    name = name.replaceAll(' ', '-');
    this.pokeService.getPokemon(name).subscribe({
      next: (res) => {
        this.pokeService.pokemonObservable.next({
          id: res.id,
          name: res.name,
          sprites: res.sprites,
          types: res.types,
        });
        this.loading = false;
        this.pokemonEmitter.emit(this.pokemon);
        this.pokeService.urlImgObservable.next(
          environment.pokeDex.img + res.id.toString().padStart(3, '0') + '.png'
        );
        this.pokeService.error.next(false);
      },
      error: (err) => {
        this.loading = false;
        this.pokemonEmitter.emit(undefined);
        this.pokeService.error.next(true);
      },
    });
  }
}
