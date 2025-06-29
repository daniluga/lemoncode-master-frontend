import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacterCollection } from './character-collection.hook';
import { CharacterCollectionComponent } from './character-collection.component';
import { linkRoutes } from '#core/router';

export const CharacterCollectionContainer = () => {
  const { characterCollection, loadCharacterCollection } =
    useCharacterCollection();
  const navigate = useNavigate();

  React.useEffect(() => {
    loadCharacterCollection();
  }, []);

  const handleDetail = (id: number) => {
    navigate(linkRoutes.characterDetail(id));
  };

  return (
    <CharacterCollectionComponent
      characterCollection={characterCollection}
      onDetail={handleDetail}
    />
  );
};
