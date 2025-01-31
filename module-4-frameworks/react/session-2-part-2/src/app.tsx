import React from "react";
import { Demo } from "./demo";
import { Demo2 } from "./demo-2";
import { Demo3 } from "./demo-3";

export const App = () => {
  return (
    <>
      <div>
        <Demo />
      </div>
      <div>
        <Demo2 />
      </div>
      <div>
        <Demo3 />
      </div>
    </>
  );
};
