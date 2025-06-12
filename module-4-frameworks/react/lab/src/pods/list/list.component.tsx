import React from "react";
import { useDebounce } from "use-debounce";
import { Box, Paper, TablePagination } from "@mui/material";
import { Categories } from "../category/api";
import { SearchComponent, TableComponent } from "./components";
import { CategoryConfig } from "./list.vm";

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
        <SearchComponent
          label="Search for members"
          placeholder="Search for members..."
          value={filter}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(event.target.value)
          }
        />
        {categoryList === Categories.member && (
          <SearchComponent
            label="Search for organizations"
            placeholder="Search for organizations..."
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
        )}
      </Box>
      <TableComponent paginatedItems={paginatedItems} onSelect={onSelect} />
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
