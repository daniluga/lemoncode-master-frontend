export type CATEGORY = MemberDetail | PokemonDetails | RickAndMortyDetails;

/*******************************************************************************
 * GITHUB
 ******************************************************************************/
export interface MemberDetail {
  id: string;
  login: string;
  name: string;
  company: string;
  bio: string;
  img: string;
}

/*******************************************************************************
 * POKÉMON
 ******************************************************************************/
export interface PokemonDetails {
  id: number;
  name: string;
  img: string;
  types: string;
  weight: string;
  height: string;
}

/*******************************************************************************
 * RICK AND MORTY
 ******************************************************************************/
export interface RickAndMortyDetails {
  id: string;
  name: string;
  img: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  location: string;
}
