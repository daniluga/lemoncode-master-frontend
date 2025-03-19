import React from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContainer } from "@/pods/category";
import { routes } from "@/router";

export const CategoryScene: React.FC = () => {
  const navigate = useNavigate();

  const handleSelect = (category: string) => {
    navigate(routes.list(category));
  };

  return <CategoryContainer onSelect={handleSelect} />;
};
