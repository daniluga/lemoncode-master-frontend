import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchComponentProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
}) => (
  <Box>
    <TextField
      fullWidth
      id="outlined-basic"
      label={label}
      variant="outlined"
      placeholder={placeholder}
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
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  </Box>
);
