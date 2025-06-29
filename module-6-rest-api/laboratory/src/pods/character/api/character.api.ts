import { Character } from './character.api-model';
import axios from 'axios';
import { characters } from '../../../../server/src/mock-data';
import { Character as MockCharacter } from '../../../../server/src/model';

export const getCharacter = async (id: string): Promise<Character> => {
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  return data;
};

export const getMockCharacter = async (id: string): Promise<Character> => {
  const { data } = await axios.get<MockCharacter>(`api/character/${id}`);
  return data;
};

export const saveMockCharacter = async (
  character: MockCharacter
): Promise<boolean> => {
  if (character.id) {
    await axios.put(`api/character/${character.id}`, character);
  } else {
    await axios.post('api/character', character);
  }
  return true;
};
