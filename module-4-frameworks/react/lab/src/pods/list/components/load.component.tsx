import React, { useEffect } from "react";
import { CircularProgress, TableCell, TableRow } from "@mui/material";

export const LoadComponent: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <TableRow>
        <TableCell align="center" colSpan={3}>
          {isLoading ? (
            <CircularProgress size="30px" color="secondary" />
          ) : (
            <p>No items found. Please search again.</p>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};
