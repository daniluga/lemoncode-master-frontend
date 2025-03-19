import { Category } from "./api.model";

export enum Categories {
  member = "Members",
  pokemon = "Pokémon",
  rickAndMorty = "Rick And Morty",
}

const getImagePath = (imageName: string): string => {
  return `/resource/${imageName}`;
};

export const getCategoryLists = async (): Promise<Category[]> => {
  return [
    {
      name: Categories.member,
      image: getImagePath("github.jpg"),
    },
    { name: Categories.pokemon, image: getImagePath("pokemon.jpg") },
    {
      name: Categories.rickAndMorty,
      image: getImagePath("rickandmorty.jpg"),
    },
  ];
};
