import { AuthContext } from "@/core/providers/auth";
import React, { PropsWithChildren } from "react";

export const AppLayout: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const { user } = React.useContext(AuthContext);

  return (
    <div className="app-container-layout">
      <div className="app-header-layout">
        <div>My app</div>
        <div>User: {user}</div>
      </div>
      <main>{children}</main>
    </div>
  );
};
