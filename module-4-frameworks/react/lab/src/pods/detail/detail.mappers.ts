import * as am from "./api/api.model";
import * as vm from "./detail.vm";

/*******************************************************************************
 * GITHUB
 ******************************************************************************/
export const mapMemberDetailFromApiToVm = (
  data: am.MemberDetail
): vm.MemberDetail => ({
  id: data.id,
  login: data.login,
  name: data.name,
  company: data.company,
  bio: data.bio,
  img: data.avatar_url,
});

/*******************************************************************************
 * POKÉMON
 ******************************************************************************/
export const mapPokemonDetailFromApiToVm = (
  data: am.PokemonDetails
): vm.PokemonDetails => ({
  id: data.id,
  name: data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase(),
  img: data.sprites.front_default,
  types: data.types
    .map(
      (type) =>
        type.type.name.charAt(0).toUpperCase() +
        type.type.name.slice(1).toLowerCase()
    )
    .join("/"),
  weight: `${data.weight} kg`,
  height: `${data.height}"`,
});

/*******************************************************************************
 * RICK AND MORTY
 ******************************************************************************/
export const mapRickAndMortyDetailFromApiToVm = (
  data: am.RickAndMortyData
): vm.RickAndMortyDetails => {
  const character = data.results.find(
    (character) => character.name === data.info.idOrName
  );

  return {
    id: character.id,
    name: character.name,
    img: character.image,
    status: character.status,
    species: character.species,
    gender: character.gender,
    origin: character.origin.name,
    location: character.location.name,
  };
};
