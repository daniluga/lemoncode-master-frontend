import React from "react";
import { DetailRowComponent } from "./detail-row.component";

interface Props {
  types: string;
  weight: string;
  height: string;
}

export const PokemonDetailComponent: React.FC<Props> = ({
  types,
  weight,
  height,
}) => {
  return (
    <>
      <DetailRowComponent detailLabel="Types">{types}</DetailRowComponent>
      <DetailRowComponent detailLabel="Weight">{weight}</DetailRowComponent>
      <DetailRowComponent detailLabel="Height">{height}</DetailRowComponent>
    </>
  );
};
