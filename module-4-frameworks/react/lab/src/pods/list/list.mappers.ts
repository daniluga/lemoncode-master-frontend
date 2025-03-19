import * as api from "./api";
import * as am from "./api/api.model";
import * as vm from "./list.vm";

/*******************************************************************************
 * GITHUB
 ******************************************************************************/
export const mapMembersFromApiToVm = (data: am.Member[]): vm.Member[] =>
  !data ? [] : data.map(mapMemberFromApiToVm);

export const mapMemberFromApiToVm = (data: am.Member): vm.Member => ({
  id: data.id,
  name: data.login,
  img: data.avatar_url,
});

/*******************************************************************************
 * POKÉMON
 ******************************************************************************/
export const mapAllPokemonFromApiToVm = async (
  data: am.Pokemon
): Promise<vm.PokemonExtendedDetails[]> => {
  const pokemonDetailsRequests = data.results.map(
    async (pokemonDetail: am.PokemonDetails) => {
      const pokemonDetails: am.PokemonExtendedDetails =
        await api.getPokemonDetails(pokemonDetail.url);
      return pokemonDetails;
    }
  );

  const allPokemonDetails = await Promise.all(pokemonDetailsRequests);

  return allPokemonDetails.map(mapPokemonFromApiToVm);
};

export const mapPokemonFromApiToVm = (
  data: am.PokemonExtendedDetails
): vm.PokemonExtendedDetails => ({
  id: data.id,
  name: data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase(),
  img: data.sprites.front_default,
});

/*******************************************************************************
 * RICK AND MORTY
 ******************************************************************************/
export const mapAllRickAndMortyFromApiToVm = (
  data: am.RickAndMorty
): vm.RickAndMortyExtendedDetails[] => {
  const characters = data.results.map(
    (character: am.RickAndMortyExtendedDetails) => {
      return character;
    }
  );

  return characters.map(mapRickAndMortyFromApiToVm);
};

export const mapRickAndMortyFromApiToVm = (
  data: am.RickAndMortyExtendedDetails
): vm.RickAndMortyExtendedDetails => ({
  id: data.id,
  name: data.name,
  img: data.image,
});
