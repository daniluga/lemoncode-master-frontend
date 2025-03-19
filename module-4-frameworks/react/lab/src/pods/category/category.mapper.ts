import * as am from "./api/api.model";
import * as vm from "./category.vm";

export const mapCategoriesFromApiToVm = (data: am.Category[]): vm.Category[] =>
  data.map(mapCategoryFromApiToVm);

export const mapCategoryFromApiToVm = (data: am.Category): vm.Category => ({
  name: data.name,
  image: data.image,
});
