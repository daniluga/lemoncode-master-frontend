export type CategoryConfig =
  | Member
  | PokemonExtendedDetails
  | RickAndMortyExtendedDetails;

/*******************************************************************************
 * GITHUB
 ******************************************************************************/
export interface Member {
  id: number;
  name: string;
  img: string;
}

/*******************************************************************************
 * POKÉMON
 ******************************************************************************/
export interface PokemonExtendedDetails {
  id: number;
  name: string;
  img: string;
}

/*******************************************************************************
 * RICK AND MORTY
 ******************************************************************************/
export interface RickAndMortyExtendedDetails {
  id: number;
  name: string;
  img: string;
}
