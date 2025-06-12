import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CategoryConfig } from "../list.vm";
import { LoadComponent } from "./load.component";

interface TableComponentProps {
  paginatedItems: Array<CategoryConfig>;
  onSelect: (name: string) => void;
}

export const TableComponent: React.FC<TableComponentProps> = ({
  paginatedItems,
  onSelect,
}) => (
  <TableContainer sx={{ maxHeight: "calc(100vh - 200px)" }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>Image</TableCell>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!paginatedItems.length && <LoadComponent />}
        {paginatedItems.map((listItem) => (
          <TableRow
            key={listItem.id}
            onClick={() => {
              onSelect(listItem.name);
            }}
          >
            <TableCell>
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10%",
                }}
                src={listItem.img}
                alt={`Avatar of ${listItem.name}`}
              />
            </TableCell>
            <TableCell>{listItem.id}</TableCell>
            <TableCell>{listItem.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
