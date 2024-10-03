"use client";
import { Box, Typography, Avatar, Button, Card, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Popular = () => {
  const router = useRouter();
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("https://2-f-pizza-backend.vercel.app/pizzas")
      .then((response) => {
        setPizzas(response.data.slice(0, 6));
      })
      .catch((error) => {
        console.error("Error fetching pizzas:", error);
      });
  }, []);

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
        background: "linear-gradient(to bottom, white, #fed2a5, #fff)",
      }}
    >
      <Typography
        id="popularPizzas"
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

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
          justifyContent: "center",
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
              width: "320px",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                width: 300,
                height: 300,
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
                  width: "80%",
                  height: "80%",
                  borderRadius: "50%", // Make the image itself circular
                  objectFit: "cover",
                }}
              />
            </Box>

            <Typography variant="h6" sx={{ textAlign: "start", width: "100%" }}>
              {pizza.pizza_name}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mb: 2, textAlign: "start", width: "100%" }}
            >
              {pizza.toppings.join(", ")}
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

export default Popular;
