import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonData } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  pokemon?: PokemonData;
  @Output() pokemonEmitter = new EventEmitter<PokemonData>();

  loading: boolean = false;

  constructor(private pokeService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemon('pikachu');
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
