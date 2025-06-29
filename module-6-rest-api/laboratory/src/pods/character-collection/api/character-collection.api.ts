import axios from 'axios';
import {
  CharacterListResponse,
  CharacterListResponseWithGraphql,
} from './character-collection.api-model';
import { graphql } from '#core/api';

export const getCharacterCollection =
  async (): Promise<CharacterListResponse> => {
    const { data } = await axios.get<CharacterListResponse>(
      'https://rickandmortyapi.com/api/character'
    );
    return data;
  };

export const getMockCharacterCollection =
  async (): Promise<CharacterListResponse> => {
    const { data } = await axios.get<CharacterListResponse>('/api/character');
    return data;
  };

export const getCharacterColletcionWithGraphql =
  async (): Promise<CharacterListResponse> => {
    const query = `
      query {
        characters {
          info {
            count
            pages 
            next
            prev
          }
          results {
            id
            name
            status
            species
            type
            gender
            origin {
              name
            }
            location {
              name
            }
            image
            episode {
              id
            }
          }
        }
      }
    `;

    const response = await graphql<CharacterListResponseWithGraphql>({
      query,
    });

    const { info, results } = response.characters;

    return { info, results };
  };
