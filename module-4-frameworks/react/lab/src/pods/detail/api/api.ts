import { Categories } from "@/pods/category/api";

/*******************************************************************************
 * GENERIC GET DATA
 ******************************************************************************/
export const getData = async <T>(
  category: string,
  idOrName: string
): Promise<T> => {
  let apiResponse: Response;

  try {
    switch (category) {
      case Categories.member:
        apiResponse = await fetch(`https://api.github.com/users/${idOrName}`);
        break;
      case Categories.pokemon:
        apiResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${idOrName}`
        );
        break;
      case Categories.rickAndMorty:
        const apiResponseNotRefined = await fetch(
          `https://rickandmortyapi.com/api/character`
        );
        const data = await apiResponseNotRefined.json();
        apiResponse = { ...data, info: { ...data.info, idOrName } };
        return apiResponse as T;
    }

    return await apiResponse.json();
  } catch (error) {
    console.error("Error fetching members:", error);
    return undefined;
  }
};
