import * as mockServer from '../../../server/src/model';
import * as apiModel from './api/character.api-model';
import * as viewModel from './character.vm';

export const mapCharacterFromApiToVm = (
  character: apiModel.Character
): viewModel.CharacterEntityVm => ({
  id: character.id,
  name: character.name,
  status: character.status,
  species: character.species,
  type: character.type,
  gender: character.gender,
  origin: {
    name: character.origin.name,
    url: character.origin.url,
  },
  location: {
    name: character.location.name,
    url: character.location.url,
  },
  image: character.image,
  episode: character.episode,
  url: character.url,
  created: character.created,
});

export const mapMockCharacterFromApiToVm = (
  character: mockServer.Character
): viewModel.CharacterEntityVm => ({
  id: character.id,
  name: character.name,
  status: character.status,
  species: character.species,
  type: character.type,
  gender: character.gender,
  origin: {
    name: character.origin.name,
    url: character.origin.url,
  },
  location: {
    name: character.location.name,
    url: character.location.url,
  },
  image: character.image,
  episode: character.episode,
  url: character.url,
  created: character.created,
  bestSentence: character.bestSentence,
});

export const mapMockCharacterFromVmToApi = (
  character: viewModel.CharacterEntityVm
): viewModel.CharacterEntityVm => ({
  ...character,
  bestSentence: character.bestSentence,
});
