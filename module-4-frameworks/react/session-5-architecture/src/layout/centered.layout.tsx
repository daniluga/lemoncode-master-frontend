import React, { PropsWithChildren } from "react";

export const CenterLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="center-layout">{children}</div>
);
