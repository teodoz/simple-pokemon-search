import { Observable } from 'rxjs';

export type PokemonData = {
  name: string;
  id: number;
  sprites: { front_default: string };
  types: PokemonTypes[];
  urlImg?: string;
};

export type PokemonTypes = {
  type: PokemonSlotType;
};

export type PokemonSlotType = {
  name: string;
};

export type PokemonList = {
  name: string;
  url: string;
};
