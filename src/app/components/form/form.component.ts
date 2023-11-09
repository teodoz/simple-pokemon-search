import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PokemonData } from 'src/app/models/pokemon.model';
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

  constructor(private pokeService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemon('pikachu');
  }

  checkEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.getPokemon(this.field?.nativeElement?.value);
    }
  }

  getPokemon(name: string) {
    this.loading = true;
    this.pokeService.getPokemon(name).subscribe({
      next: (res) => {
        this.pokemon = {
          id: res.id,
          name: res.name,
          sprites: res.sprites,
          types: res.types,
        };
        this.loading = false;
        this.pokemonEmitter.emit(this.pokemon);
      },
      error: (err) => {
        this.loading = false;

        alert('Pokémon não encontrado! Tente outro nome.');
      },
    });
  }
}
