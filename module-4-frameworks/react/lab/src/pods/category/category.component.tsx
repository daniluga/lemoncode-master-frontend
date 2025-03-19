import React from "react";
import * as vm from "./category.vm";
import { Category, CategoryContainer } from "./components";

interface Props {
  categories: vm.Category[];
  onSelect: (category: string) => void;
}

export const CategoryComponent: React.FC<Props> = (props) => {
  const { categories, onSelect } = props;

  return (
    <CategoryContainer>
      {categories.map((category) => (
        <Category key={category.name}>
          <img
            width={"100%"}
            height={"200px"}
            src={category.image}
            alt={`Avatar of ${category.name}`}
            onClick={() => onSelect(category.name)}
          />
          <span>{category.name}</span>
        </Category>
      ))}
    </CategoryContainer>
  );
};
