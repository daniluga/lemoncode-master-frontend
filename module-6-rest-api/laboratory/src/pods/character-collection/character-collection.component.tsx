import * as React from 'react';
import { CharacterEntityVm } from './character-collection.vm';
import { CharacterCard } from './components/character-card.component';
import * as classes from './character-collection.styles';

interface CharacterCollectionProps {
  characterCollection: CharacterEntityVm[];
  onDetail: (id: number) => void;
}

export const CharacterCollectionComponent: React.FunctionComponent<
  CharacterCollectionProps
> = ({ characterCollection, onDetail }) => {
  return (
    <>
      <ul className={classes.list}>
        {characterCollection.map((character) => (
          <li key={character.id}>
            <CharacterCard character={character} onDetail={onDetail} />
          </li>
        ))}
      </ul>
    </>
  );
};
