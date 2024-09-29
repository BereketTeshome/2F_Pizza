"use client";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  Card,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";

const Popular = () => {
  const router = useRouter();

  const pizzas = [
    {
      name: "Margherita",
      ingredients: "Tomato, Mozzarella, Basil",
      price: "100",
      image: "/full_pizza.png",
      user: { name: "John Doe", avatar: "/profile.png" },
    },
    {
      name: "Pepperoni",
      ingredients: "Pepperoni, Mozzarella, Tomato",
      price: "120",
      image: "/full_pizza.png",
      user: { name: "Jane Smith", avatar: "/profile.png" },
    },
    {
      name: "BBQ Chicken",
      ingredients: "Chicken, BBQ Sauce, Onions",
      price: "140",
      image: "/full_pizza.png",
      user: { name: "Alex Johnson", avatar: "/profile.png" },
    },
    {
      name: "Margherita",
      ingredients: "Tomato, Mozzarella, Basil",
      price: "100",
      image: "/full_pizza.png",
      user: { name: "John Doe", avatar: "/profile.png" },
    },
    {
      name: "Pepperoni",
      ingredients: "Pepperoni, Mozzarella, Tomato",
      price: "120",
      image: "/full_pizza.png",
      user: { name: "Jane Smith", avatar: "/profile.png" },
    },
    {
      name: "BBQ Chicken",
      ingredients: "Chicken, BBQ Sauce, Onions",
      price: "140",
      image: "/full_pizza.png",
      user: { name: "Alex Johnson", avatar: "/profile.png" },
    },
  ];

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
        background: "linear-gradient(to bottom, white, #fed2a5, #fff)",
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
        Popular Pizzas
      </Typography>

      <Grid container spacing={5}>
        {pizzas.map((pizza, index) => (
          <Grid item xs={12} sm={6} md={3.9} key={index}>
            <Card
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
                scale: "0.9",
              }}
            >
              <Box
                sx={{
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
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
                  style={{ width: "87%", height: "87%", objectFit: "contain" }}
                />
              </Box>

              <Typography
                variant="h6"
                sx={{ textAlign: "start", width: "100%" }}
              >
                {pizza.name}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mb: 2, textAlign: "start", width: "100%" }}
              >
                {pizza.ingredients}
              </Typography>

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
                    px: 8,
                    py: 1.5,
                    fontSize: "1.3rem",
                  }}
                  onClick={() => handleOrderClick(pizza)}
                >
                  Order
                </Button>
              </Box>

              <Divider sx={{ width: "100%", mb: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <Avatar
                  src={pizza.user.avatar}
                  alt={pizza.user.name}
                  sx={{ width: 40, height: 40, mr: "auto" }}
                />
                <Typography variant="body2">{pizza.user.name}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Popular;
