import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from './api';
import { CharacterEntityVm } from './character.vm';
import {
  mapCharacterFromApiToVm,
  mapMockCharacterFromApiToVm,
  mapMockCharacterFromVmToApi,
} from './character.mappers';
import { CharacterComponent } from './character.component';

export const CharacterContainer: React.FunctionComponent = () => {
  const [character, setCharacter] = React.useState<CharacterEntityVm>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMockMode = import.meta.env.VITE_USE_MOCK_SERVER === 'true';

  const handleLoadCharacter = async () => {
    if (isMockMode) {
      const mockCharacter = await api.getMockCharacter(id);
      setCharacter(mapMockCharacterFromApiToVm(mockCharacter));
    } else {
      const character = await api.getCharacter(id);
      setCharacter(mapCharacterFromApiToVm(character));
    }
  };

  const handleSave = async (character: CharacterEntityVm) => {
    const apiCharacter = mapMockCharacterFromVmToApi(character);
    const success = await api.saveMockCharacter(apiCharacter);

    if (success) {
      setCharacter(character);
      navigate(-1);
    } else {
      alert('Error saving character');
    }
  };

  React.useEffect(() => {
    if (id) {
      handleLoadCharacter();
    }
  }, [id]);

  return character ? (
    <CharacterComponent character={character} onSave={handleSave} />
  ) : (
    <div>Cargando personaje...</div>
  );
};
