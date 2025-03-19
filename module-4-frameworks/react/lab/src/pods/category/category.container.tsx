import React from "react";
import * as api from "./api";
import { CategoryComponent } from "./category.component";
import { mapCategoriesFromApiToVm } from "./category.mapper";
import { Category } from "./category.vm";

interface Props {
  onSelect: (category: string) => void;
}

export const CategoryContainer: React.FC<Props> = (props) => {
  const { onSelect } = props;
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    api.getCategoryLists().then(mapCategoriesFromApiToVm).then(setCategories);
  }, []);

  return <CategoryComponent categories={categories} onSelect={onSelect} />;
};
