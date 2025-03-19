import React, { PropsWithChildren, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import { ThemeContext } from "@/core";
import { routes } from "@/router";
import { AppLogo } from "./components";

export const AppLayout: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <AppLogo />
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="secondary"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Laboratorio React
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <HomeIcon
              color="secondary"
              onClick={() => navigate(routes.root)}
              sx={{ cursor: "pointer" }}
            />
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? (
                <LightModeIcon sx={{ color: "customColors.light" }} />
              ) : (
                <DarkModeIcon sx={{ color: "customColors.dark" }} />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};
