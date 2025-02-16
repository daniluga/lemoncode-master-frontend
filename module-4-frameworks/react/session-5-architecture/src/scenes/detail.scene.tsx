import { DetailContainer } from "@/pods/detail";
import React from "react";
import { useParams } from "react-router-dom";

export const DetailScene: React.FC = () => {
  const { id } = useParams();
  return <DetailContainer id={id} />;
};
