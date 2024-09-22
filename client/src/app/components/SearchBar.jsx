import React from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import { FiSearch } from "react-icons/fi"; // Import search icon from react-icons

const SearchBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "700px",
        margin: "auto",
        borderRadius: "50px",
        backgroundColor: "#fff",
        padding: "7px 15px",
        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
      }}
    >
      <InputBase
        sx={{
          flex: 1,
          padding: "10px 15px",
          fontSize: "1.5rem",
        }}
        placeholder="Search for pizzas..."
        inputProps={{ "aria-label": "search for pizzas" }}
      />
      <IconButton
        sx={{
          padding: "20px",
          backgroundColor: "orange",
          borderRadius: "50%",
          color: "white",
          marginLeft: "10px",
        }}
        aria-label="search"
      >
        <FiSearch size={24} />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
