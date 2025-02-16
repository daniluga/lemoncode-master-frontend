import React from "react";
import { CenterLayout } from "@/layout";
import { LoginContainer } from "@/pods/login";

export const LoginScene: React.FC = () => {
  return (
    <CenterLayout>
      <LoginContainer /> {/* // Esto es el POD. */}
    </CenterLayout>
  );
};
