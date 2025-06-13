import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { PropsWithChildren } from "react";

interface Props {
  id: string | number;
  name: string;
  img: string;
  onClose: () => void;
}

export const CardDetailComponent: React.FC<PropsWithChildren<Props>> = ({
  id,
  name,
  img,
  onClose,
  children,
}) => {
  return (
    <Card
      sx={{
        flexGrow: 1,
        margin: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "sticky",
      }}
    >
      <Typography
        color="secondary"
        variant="h6"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        {name}
      </Typography>
      <CardMedia
        component="img"
        image={img}
        alt="avatar"
        sx={{
          height: 200,
          width: 200,
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <CardContent style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body2">
          <strong>ID:</strong> {id}
        </Typography>
        {children}
      </CardContent>
      <Button color="secondary" variant="contained" onClick={onClose}>
        Close detail
      </Button>
    </Card>
  );
};
