import React from "react";
import { Box, Button, Typography, Link } from "@mui/material";
import { BsBoxArrowDown } from "react-icons/bs";

const NothingFound = () => {
  return (
    <Box
      className="flex flex-col items-center justify-center min-h-screen"
      sx={{
        backgroundColor: "#f9f9f9",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <img src="/404.png" alt="404 Not Found" className="mb-6 w-96 h-72" />
      <Typography variant="h5" className="mb-4">
        Looks like you haven’t ordered any pizza! 🍕
      </Typography>
      <Typography variant="body1" className="mb-6">
        Did you forget how delicious our pizzas are? 😋 Go back and grab one!
      </Typography>
      <Link href="/" className="no-underline">
        <Button
          variant="contained"
          color="primary"
          endIcon={<BsBoxArrowDown />}
          sx={{
            backgroundColor: "#ff7043",
            mt: 6,
            "&:hover": {
              backgroundColor: "#ff5722",
            },
          }}
        >
          Back to Home
        </Button>
      </Link>
    </Box>
  );
};

export default NothingFound;
