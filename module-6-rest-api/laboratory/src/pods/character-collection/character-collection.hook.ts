import * as React from 'react';
import { mapToCollection } from '#common/mappers';
import {
  getCharacterCollection,
  getCharacterColletcionWithGraphql,
  getMockCharacterCollection,
} from './api';
import { mapFromApiToVm } from './character-collection.mapper';
import { CharacterEntityVm } from './character-collection.vm';
import { mapMockCharacterFromApiToVm } from '#pods/character/character.mappers';

export const useCharacterCollection = () => {
  const [characterCollection, setCharacterCollection] = React.useState<
    CharacterEntityVm[]
  >([]);
  const isMockMode = import.meta.env.VITE_USE_MOCK_SERVER === 'true';
  const isGraphqlMode = import.meta.env.VITE_USE_GRAPHQL === 'true';

  const loadCharacterCollection = () => {
    if (isMockMode) {
      getMockCharacterCollection().then((result) => {
        setCharacterCollection(
          mapToCollection(result.results, mapMockCharacterFromApiToVm)
        );
      });
    } else {
      if (isGraphqlMode) {
        getCharacterColletcionWithGraphql().then((result) => {
          setCharacterCollection(
            mapToCollection(result.results, mapFromApiToVm)
          );
        });
      } else {
        getCharacterCollection().then((result) => {
          setCharacterCollection(
            mapToCollection(result.results, mapFromApiToVm)
          );
        });
      }
    }
  };

  return { characterCollection, loadCharacterCollection };
};
