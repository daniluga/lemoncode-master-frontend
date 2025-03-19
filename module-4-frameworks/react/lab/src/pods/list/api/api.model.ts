export type CategoryConfig = Member | PokemonExtendedDetails | RickAndMorty;

/*******************************************************************************
 * GITHUB
 ******************************************************************************/
export interface Member {
  id: number;
  login: string;
  avatar_url: string;
}

/*******************************************************************************
 * POKÉMON
 ******************************************************************************/
export interface Pokemon {
  results: PokemonDetails[];
}

export interface PokemonDetails {
  name: string;
  url: string;
}

export interface PokemonExtendedDetails {
  id: number;
  name: string;
  sprites: PokemonSprites;
}

export interface PokemonSprites {
  front_default: string;
}

/*******************************************************************************
 * RICK AND MORTY
 ******************************************************************************/
export interface RickAndMorty {
  results: RickAndMortyExtendedDetails[];
}

export interface RickAndMortyExtendedDetails {
  id: number;
  name: string;
  image: string;
}
