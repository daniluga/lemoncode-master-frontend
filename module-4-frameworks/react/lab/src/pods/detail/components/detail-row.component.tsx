import React from "react";
import { Typography } from "@mui/material";

interface Props {
  detailLabel: string;
}

export const DetailRowComponent: React.FC<React.PropsWithChildren<Props>> = ({
  detailLabel,
  children,
}) => {
  return (
    <Typography variant="body2">
      <strong>{detailLabel}:</strong> {children}
    </Typography>
  );
};
