import { Box } from "@mui/material";
import React from "react";
import CodeIcon from "@mui/icons-material/Code";
import CodeOffIcon from "@mui/icons-material/CodeOff";

export const AppLogo: React.FC = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        mr: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isHovered ? (
        <CodeOffIcon color="secondary" />
      ) : (
        <CodeIcon color="secondary" />
      )}
    </Box>
  );
};
