import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginScene, ListScene, DetailScene } from "@/scenes";
import { switchRoutes } from "./routes";
import { AppLayout } from "@/layout";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={switchRoutes.root} element={<LoginScene />} />
        <Route
          path="*"
          element={
            <AppLayout>
              <Routes>
                <Route path={switchRoutes.list} element={<ListScene />} />
                <Route path={switchRoutes.detail} element={<DetailScene />} />
              </Routes>
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};
