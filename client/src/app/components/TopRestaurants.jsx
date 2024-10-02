import { Box, Typography } from "@mui/material";
import TopCarousel from "./TopCarousel";
const TopRestaurants = () => {
  return (
    <Box
      sx={{
        paddingX: { xs: 1, sm: 6 },
        minHeight: "400px",
        background: "linear-gradient(to bottom, white, #fed2a5, white)",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.8rem",
          color: "#999",
          mb: 8,
          position: "relative",
          top: "40px",
        }}
      >
        Top Restaurants
      </Typography>
      <TopCarousel />
    </Box>
  );
};

export default TopRestaurants;
