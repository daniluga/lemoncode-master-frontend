import React from "react";
import {
  CardDetailComponent,
  MemberDetailComponent,
  PokemonDetailComponent,
  RickAndMortyDetailComponent,
} from "./components";
import {
  CATEGORY,
  MemberDetail,
  PokemonDetails,
  RickAndMortyDetails,
} from "./detail.vm";

interface Props {
  itemDetail: CATEGORY;
  visible: boolean;
  onClose: () => void;
}

// Type guards para verificar qué tipo de detalle estamos usando
const isMemberDetail = (detail: CATEGORY): detail is MemberDetail =>
  "login" in detail;
const isPokemonDetail = (detail: CATEGORY): detail is PokemonDetails =>
  "types" in detail;
const isRickAndMortyDetail = (
  detail: CATEGORY
): detail is RickAndMortyDetails => "status" in detail;

export const DetailComponent: React.FC<Props> = (props: Props) => {
  const { itemDetail, visible, onClose } = props;

  const renderDetails = () => {
    if (isMemberDetail(itemDetail)) {
      return (
        <MemberDetailComponent
          login={itemDetail.login}
          company={itemDetail.company}
          bio={itemDetail.bio}
        />
      );
    }
    if (isPokemonDetail(itemDetail)) {
      return (
        <PokemonDetailComponent
          types={itemDetail.types}
          weight={itemDetail.weight}
          height={itemDetail.height}
        />
      );
    }
    if (isRickAndMortyDetail(itemDetail)) {
      return (
        <RickAndMortyDetailComponent
          status={itemDetail.status}
          species={itemDetail.species}
          gender={itemDetail.gender}
          origin={itemDetail.origin}
          location={itemDetail.location}
        />
      );
    }
  };

  return (
    <>
      {visible && (
        <CardDetailComponent
          id={itemDetail.id}
          name={itemDetail.name}
          img={itemDetail.img}
          onClose={onClose}
        >
          {renderDetails()}
        </CardDetailComponent>
      )}
    </>
  );
};
