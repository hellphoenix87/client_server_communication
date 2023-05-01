import React from "react";
import { Toolbar, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const styles = {
  searchInput: {
    borderRadius: "15px",
    color: "#124346",
    flex: "0 0 50%",
  },
};

const rootStyles = {};

const SearchToolbar = ({ onFilterChange, onFilterNameChange }) => {
  const handleFilterId = (event) => {
    if (onFilterChange) {
      onFilterChange(event);
    }
  };

  const handleFilterName = (event) => {
    if (onFilterNameChange) {
      onFilterNameChange(event);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
      <TextField
        label="Filter by Index Number"
        variant="outlined"
        size="small"
        //PropInput={{ style: { styles } }}
        InputProps={{ style: styles.searchInput }}
        onChange={handleFilterId}
      />

      <Divider orientation="vertical" flexItem />

      <TextField
        label="Filter by Name"
        variant="outlined"
        size="small"
        InputProps={{ style: styles.searchInput }}
        onChange={handleFilterName}
      />
    </Stack>
  );
};

export default SearchToolbar;
