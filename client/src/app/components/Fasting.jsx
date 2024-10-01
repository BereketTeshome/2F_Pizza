"use client";
import { Box, Typography, Avatar, Button, Card, Divider } from "@mui/material";
import { useRouter } from "next/navigation";

const pizzas = [
  {
    id: 1,
    pizza_name: "Fasting Margherita",
    owner_name: "Healthy Eats",
    owner_image: "profile5.png",
    toppings: ["Tomato Sauce", "Fresh Mozzarella", "Basil"],
    quantity: 1,
    created_at: "2024-10-01T00:30:23.018Z",
    price: 100,
    image: "/Fasting Margherita.png",
  },
  {
    id: 2,
    pizza_name: "Fasting Veggie Supreme",
    owner_name: "Green Kitchen",
    owner_image: "profile4.png",
    toppings: ["Spinach", "Bell Peppers", "Mushrooms", "Olives"],
    quantity: 1,
    created_at: "2024-10-01T00:30:23.018Z",
    price: 120,
    image: "/Fasting Veggie Supreme.png",
  },
  {
    id: 3,
    pizza_name: "Fasting Spinach & Feta",
    owner_name: "Mediterranean Bites",
    owner_image: "profile3.png",
    toppings: ["Spinach", "Feta Cheese", "Garlic"],
    quantity: 1,
    created_at: "2024-10-01T00:30:23.018Z",
    price: 110,
    image: "/Fasting Spinach & Feta.png",
  },
  {
    id: 4,
    pizza_name: "Fasting Pesto Veggie",
    owner_name: "Healthy Cravings",
    owner_image: "profile2.png",
    toppings: ["Pesto Sauce", "Zucchini", "Cherry Tomatoes"],
    quantity: 1,
    created_at: "2024-10-01T00:30:23.018Z",
    price: 140,
    image: "/Fasting Pesto Veggie.png",
  },
  {
    id: 5,
    pizza_name: "Fasting Caprese Delight",
    owner_name: "Fresh Flavors",
    owner_image: "profile1.png",
    toppings: ["Tomato Slices", "Fresh Mozzarella", "Basil Pesto"],
    quantity: 1,
    created_at: "2024-10-01T00:30:23.018Z",
    price: 115,
    image: "/Fasting Caprese Delight.png",
  },
  {
    id: 6,
    pizza_name: "Fasting BBQ Veggie",
    owner_name: "Grill & Chill",
    owner_image: "profile.png",
    toppings: ["BBQ Sauce", "Corn", "Red Onion", "Bell Peppers"],
    quantity: 1,
    created_at: "2024-10-01T00:30:23.018Z",
    price: 125,
    image: "/Fasting BBQ Veggie.png",
  },
];

const Fasting = () => {
  const router = useRouter();
  const handleOrderClick = (pizza) => {
    // Create a URL with query parameters
    const params = new URLSearchParams({
      name: pizza.name,
      ingredients: pizza.ingredients,
      price: pizza.price,
      image: pizza.image,
    });

    router.push(`/OrderDetail?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        paddingX: 6,
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
        {pizzas.map((pizza, index) => (
          <Card
            key={index}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "20px",
              minWidth: "290px",
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
                alt={pizza.name}
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
              {pizza.name}
            </Typography>

            {/* Pizza Ingredients */}
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mb: 2, textAlign: "start", width: "100%" }}
            >
              {pizza.ingredients}
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
                <Typography
                  variant="body2"
                  sx={{
                    position: "absolute",
                    top: "-2px",
                    right: "-20px",
                    fontSize: "0.8rem",
                    color: "black",
                  }}
                >
                  Birr
                </Typography>
              </Typography>
              <Button
                variant="contained"
                color="warning"
                sx={{
                  textTransform: "none",
                  px: 6,
                  py: 1,
                  fontSize: "1.3rem",
                }}
                onClick={() => handleOrderClick(pizza)}
              >
                Order
              </Button>
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
