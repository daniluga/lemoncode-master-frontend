import React from "react";
import { useParams } from "react-router-dom";
import { ListContainer } from "@/pods/list";
import { DetailScene } from "./detail.scene";

export const ListScene: React.FC = () => {
  const { category } = useParams();
  const [selected, setSelected] = React.useState<string>();
  const [visible, setVisible] = React.useState<boolean>(true);

  const handleCloseDetail = () => {
    setSelected(undefined);
    setVisible(true);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: selected ? "2fr 1fr" : "1fr",
      }}
    >
      <ListContainer category={category} onSelect={setSelected} />
      {selected && (
        <DetailScene
          category={category}
          id={selected}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};
