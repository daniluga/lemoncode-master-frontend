/*******************************************************************************
 * GITHUB
 ******************************************************************************/
export interface MemberDetail {
  id: string;
  login: string;
  name: string;
  company: string;
  bio: string;
  avatar_url: string;
}

/*******************************************************************************
 * POKÉMON
 ******************************************************************************/
export interface PokemonDetails {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonTypes[];
  weight: number;
  height: number;
}

export interface PokemonSprites {
  front_default: string;
}

export interface PokemonTypes {
  type: PokemonType;
}

export interface PokemonType {
  name: string;
}

/*******************************************************************************
 * RICK AND MORTY
 ******************************************************************************/
export interface RickAndMortyData {
  info: RickAndMortyInfo;
  results: RickAndMortyDetails[];
}

export interface RickAndMortyInfo {
  idOrName: string;
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface RickAndMortyDetails {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: RickAndMortyOrigin;
  location: RickAndMortyLocation;
}

export interface RickAndMortyOrigin {
  name: string;
}

export interface RickAndMortyLocation {
  name: string;
}
