import React, { useState } from "react";
import { CategoryConfig } from "./list.vm";
import { ListComponent } from "./list.component";
import * as api from "./api";
import {
  mapAllPokemonFromApiToVm,
  mapAllRickAndMortyFromApiToVm,
  mapMembersFromApiToVm,
} from "./list.mappers";
import { Categories } from "../category/api";

interface Props {
  category: string;
  onSelect: (id: string) => void;
}

export const ListContainer: React.FC<Props> = (props) => {
  const { category, onSelect } = props;
  const [data, setData] = React.useState<CategoryConfig[]>([]);
  const [organization, setOrganization] = useState<string>("lemoncode");

  React.useEffect(() => {
    if (!category) return;

    let fetchData: Promise<CategoryConfig[]>;

    switch (category) {
      case Categories.member:
        fetchData = api
          .getData(category, organization)
          .then(mapMembersFromApiToVm);
        break;
      case Categories.pokemon:
        fetchData = api.getData(category).then(mapAllPokemonFromApiToVm);
        break;
      case Categories.rickAndMorty:
        fetchData = api.getData(category).then(mapAllRickAndMortyFromApiToVm);
        break;
      default:
        return;
    }

    fetchData.then(setData);
  }, [category, organization]);

  return (
    <ListComponent
      categoryList={category}
      listItems={data}
      onSelect={onSelect}
      organization2={organization}
      onSelectOrganization={setOrganization}
    />
  );
};
