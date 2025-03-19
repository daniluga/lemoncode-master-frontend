import React from "react";
import { CATEGORY } from "./detail.vm";
import * as api from "./api/api";
import {
  mapMemberDetailFromApiToVm,
  mapPokemonDetailFromApiToVm,
  mapRickAndMortyDetailFromApiToVm,
} from "./detail.mappers";
import { DetailComponent } from "./detail.component";
import { Categories } from "../category/api";

interface Props {
  category: string;
  id: string;
  onClose: () => void;
}

export const DetailContainer: React.FC<Props> = (props) => {
  const { category, id, onClose } = props;
  const [itemDetail, setItemDetail] = React.useState<CATEGORY>({} as CATEGORY);
  const [visible, setVisible] = React.useState<boolean>(true);

  React.useEffect(() => {
    switch (category) {
      case Categories.member:
        api
          .getData(category, id)
          .then(mapMemberDetailFromApiToVm)
          .then(setItemDetail);
        break;
      case Categories.pokemon:
        api
          .getData(category, id)
          .then(mapPokemonDetailFromApiToVm)
          .then(setItemDetail);
        break;
      case Categories.rickAndMorty:
        api
          .getData(category, id)
          .then(mapRickAndMortyDetailFromApiToVm)
          .then(setItemDetail);
        break;
      default:
        return;
    }
  }, [id]);

  return (
    <>
      <DetailComponent
        itemDetail={itemDetail}
        visible={visible}
        onClose={() => {
          setVisible(false);
          onClose();
        }}
      />
    </>
  );
};
