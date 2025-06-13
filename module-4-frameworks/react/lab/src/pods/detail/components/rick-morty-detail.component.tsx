import React from "react";
import { DetailRowComponent } from "./detail-row.component";

interface Props {
  status: string;
  species: string;
  gender: string;
  origin: string;
  location: string;
}

export const RickAndMortyDetailComponent: React.FC<Props> = ({
  status,
  species,
  gender,
  origin,
  location,
}) => {
  return (
    <>
      <DetailRowComponent detailLabel="Status">{status}</DetailRowComponent>
      <DetailRowComponent detailLabel="Species">{species}</DetailRowComponent>
      <DetailRowComponent detailLabel="Gender">{gender}</DetailRowComponent>
      <DetailRowComponent detailLabel="Origin">{origin}</DetailRowComponent>
      <DetailRowComponent detailLabel="Location">{location}</DetailRowComponent>
    </>
  );
};
