"use client";
import { Box, Typography, Avatar, Button, Card, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import FastingPizzas from "../../store/Fasting";
import { useSelector } from "react-redux";
const Fasting = () => {
  const router = useRouter();
  const email = useSelector((state) => state.auth.email);
  const handleOrderClick = (pizza) => {
    // Create a URL with query parameters
    const params = new URLSearchParams({
      name: pizza.pizza_name,
      ingredients: pizza.toppings.join(", "),
      price: pizza.price,
      image: pizza.image,
      owner_name: pizza.owner_name,
    });

    router.push(`/OrderDetail?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        paddingX: { xs: 1, sm: 6 },
        background: "linear-gradient(to bottom, white, #FFF8F1)",
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
        Fasting
      </Typography>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 5,
          paddingBottom: 4,
          scrollbarWidth: "none", // For Firefox
          "&::-webkit-scrollbar": {
            display: "none", // For WebKit-based browsers (Chrome, Safari, etc.)
          },
        }}
      >
        {FastingPizzas.map((pizza, index) => (
          <Card
            key={index}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "20px",
              minWidth: "250px",
              flexShrink: 0,
            }}
          >
            {/* Circular Background with Pizza Image */}
            <Box
              sx={{
                width: 250,
                height: 250,
                borderRadius: "50%",
                overflow: "hidden", // Ensure the content is clipped to the rounded container
                background: "#fbe6cc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              <img
                src={pizza.image}
                alt={pizza.pizza_name}
                style={{
                  width: "90%",
                  height: "90%",
                  borderRadius: "50%", // Crop the image itself into a circle
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Pizza Name */}
            <Typography variant="h6" sx={{ textAlign: "start", width: "100%" }}>
              {pizza.pizza_name}
            </Typography>

            {/* Pizza Ingredients */}
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mb: 2, textAlign: "start", width: "100%" }}
            >
              {pizza.toppings.join(", ")}
            </Typography>

            {/* Price and Order Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                mb: 2,
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  color: "#01c550",
                  position: "relative",
                }}
              >
                {pizza.price}
                <Box
                  component="span"
                  variant="body2"
                  sx={{
                    position: "absolute",
                    top: "-2px",
                    right: "-25px",
                    fontSize: "0.8rem",
                    color: "black",
                  }}
                >
                  Birr
                </Box>
              </Typography>
              {email ? (
                <Button
                  variant="contained"
                  color="warning"
                  sx={{
                    textTransform: "none",
                    px: 5,
                    py: 1.2,
                    fontSize: "1.1rem",
                  }}
                  onClick={() => handleOrderClick(pizza)}
                >
                  Order
                </Button>
              ) : (
                <Button
                  variant="contained"
                  component="a"
                  href="/Login"
                  color="warning"
                  sx={{
                    textTransform: "none",
                    px: 5,
                    py: 1.2,
                    fontSize: "1.1rem",
                  }}
                >
                  Order
                </Button>
              )}
            </Box>

            <Divider sx={{ width: "100%", mb: 2 }} />

            {/* User Profile with Avatar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Avatar
                src={pizza.owner_image}
                alt={pizza.owner_name}
                sx={{ width: 40, height: 40, mr: "auto" }}
              />
              <Typography variant="body2">{pizza.owner_name}</Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Fasting;
