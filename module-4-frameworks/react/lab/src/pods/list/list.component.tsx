import React from "react";
import { useDebounce } from "use-debounce";
import {
  Box,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { CategoryConfig } from "./list.vm";
import SearchIcon from "@mui/icons-material/Search";
import { Categories } from "../category/api";
import { LoadComponent } from "./components";

interface Props {
  categoryList: string;
  listItems: CategoryConfig[];
  onSelect: (name: string) => void;
  organization2: string;
  onSelectOrganization: (organization: string) => void;
}

export const ListComponent: React.FC<Props> = ({
  categoryList,
  listItems,
  onSelect,
  organization2,
  onSelectOrganization,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = React.useState("");
  const [organization, setOrganization] = React.useState(organization2);
  const [pendingFilter, setPendingFilter] = React.useState(organization);

  const [filterDebounced] = useDebounce(filter, 500);

  const filteredItems = React.useMemo(() => {
    if (!filterDebounced) return listItems;
    return listItems.filter((user) =>
      user.name.toLowerCase().includes(filterDebounced.toLowerCase())
    );
  }, [filterDebounced, listItems]);

  React.useEffect(() => {
    setPage(0);
  }, [filteredItems]);

  const paginatedItems = React.useMemo(() => {
    return filteredItems.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredItems, page, rowsPerPage]);

  return (
    <Paper sx={{ margin: 2, height: "100vh", overflow: "auto" }}>
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 500px)",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Box>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Search for members"
            variant="outlined"
            placeholder="Search for members..."
            color="secondary"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            value={filter}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFilter(event.target.value)
            }
          />
        </Box>

        {categoryList === Categories.member && (
          <Box>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Search for organizations"
              variant="outlined"
              color="secondary"
              placeholder="Search for organizations..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
              value={pendingFilter}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPendingFilter(event.target.value)
              }
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter" && pendingFilter.trim() !== "") {
                  setOrganization(pendingFilter);
                  onSelectOrganization(pendingFilter);
                }
              }}
            />
          </Box>
        )}
      </Box>

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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
};
