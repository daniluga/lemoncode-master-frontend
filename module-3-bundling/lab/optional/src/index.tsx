import React from "react";
import { createRoot } from "react-dom/client";
import { GreetComponent } from "./greet-component";
import logo from "./content/logo_1.png";

const root = createRoot(document.getElementById("root"));
root.render(
  <div>
    <img src={logo} style={{ width: 150 }} />
    <GreetComponent />
  </div>
);
