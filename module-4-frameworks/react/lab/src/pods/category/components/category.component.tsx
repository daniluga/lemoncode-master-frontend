import { styled } from "@mui/material";

export const Category = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  gap: "20px",
  ":hover": {
    transition: "transform 0.3s ease",
    transform: "scale(1.1)",
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
}));

export const CategoryContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  margin: "50px",
});
