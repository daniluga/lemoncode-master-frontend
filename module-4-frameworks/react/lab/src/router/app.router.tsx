import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ListScene, CategoryScene } from "@/scenes";
import { switchRoutes } from "./routes";
import { AppLayout } from "@/layout";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path={switchRoutes.root} element={<CategoryScene />} />
          <Route path={switchRoutes.list} element={<ListScene />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};
