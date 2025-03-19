import React from "react";
import { DetailContainer } from "@/pods/detail";

interface Props {
  category: string;
  id: string;
  onClose: () => void;
}

export const DetailScene: React.FC<Props> = (props) => {
  const { category, id, onClose } = props;

  return <DetailContainer category={category} id={id} onClose={onClose} />;
};
