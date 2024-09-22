import { Box, Typography } from "@mui/material";
import CarouselComponent from "./Carousel";

const Featured = () => {
  return (
    <Box
      sx={{
        paddingX: 6,
        minHeight: "400px",
        background: "#fff",
      }}
    >
      <Typography sx={{ fontSize: "1.8rem", color: "#999", mb: 1 }}>
        Featured Pizza
      </Typography>
      <CarouselComponent />
    </Box>
  );
};

export default Featured;
