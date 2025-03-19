import { generatePath } from "react-router-dom";

interface SwitchRoutes {
  root: string;
  list: string;
}

export const switchRoutes: SwitchRoutes = {
  root: "/",
  list: "/list/:category",
};

interface Routes {
  root: "/";
  list: (category: string) => string;
}

export const routes: Routes = {
  root: "/",
  list: (category) => generatePath(switchRoutes.list, { category }),
};
