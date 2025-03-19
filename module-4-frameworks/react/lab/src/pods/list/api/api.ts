import { PokemonExtendedDetails } from "./api.model";
import { Categories } from "@/pods/category/api";

/*******************************************************************************
 * GENERIC GET DATA
 ******************************************************************************/
export const getData = async <T>(
  apiToRequest: string,
  organiztion?: string
): Promise<T> => {
  try {
    let apiResponse: Response | null = null;

    switch (apiToRequest) {
      case Categories.member:
        apiResponse = await fetch(
          `https://api.github.com/orgs/${organiztion}/members`
        );
        break;
      case Categories.pokemon:
        apiResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=151`
        );
        break;
      case Categories.rickAndMorty:
        apiResponse = await fetch(`https://rickandmortyapi.com/api/character`);
        break;
      default:
        console.error("Invalid API category.");
        return null;
    }

    if (!apiResponse || !apiResponse.ok) {
      return null;
    }

    return await apiResponse.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

/*******************************************************************************
 * GET POKÉMON SPECIFIC DATA
 ******************************************************************************/
export const getPokemonDetails = async (
  url: string
): Promise<PokemonExtendedDetails> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching pokemon details:", error);
    return undefined;
  }
};
