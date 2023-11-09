export type PokemonData = {
  name: string;
  id: number;
  sprites: { front_default: string };
  types: PokemonTypes[];
};

export type PokemonTypes = {
  type: PokemonSlotType;
};

export type PokemonSlotType = {
  name: string;
};
