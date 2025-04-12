import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

export interface Person {
  name: string;
  id: string;
}

const config: Config = {
  dictionaries: [names],
};

export const createPersons = (numberOfItems: number): Person[] => {
  return [...Array(numberOfItems).keys()].map(() => ({
    name: uniqueNamesGenerator(config),
    id: crypto.randomUUID(),
  }));
};
