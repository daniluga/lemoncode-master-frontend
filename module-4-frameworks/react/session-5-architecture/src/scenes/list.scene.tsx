import { DetailContainer } from "@/pods/detail";
import { ListContainer } from "@/pods/list";
import React from "react";

export const ListScene: React.FC = () => {
  const [selected, setSelected] = React.useState<string>();

  return (
    <div style={{ display: "flex" }}>
      <ListContainer onSelect={setSelected} />
      {selected && <DetailContainer id={selected} key={selected} />}
    </div>
  );
};
