import React from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import { FiSearch } from "react-icons/fi";

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
        padding: "5px 12px",
        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
        scale: "0.9",
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
          ":hover": {
            backgroundColor: "blue",
          },
        }}
        aria-label="search"
      >
        <FiSearch size={24} />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
