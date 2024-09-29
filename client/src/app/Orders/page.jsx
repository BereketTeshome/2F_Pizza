"use client";
import { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, Card } from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import NothingFound from "../components/NothingFound";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const cookie = new Cookies();
  const token = cookie.get("user_token");
  const filteredToken = token ? token : sessionStorage?.getItem("user_token");
  const decodedToken = filteredToken ? jwtDecode(filteredToken) : "";

  useEffect(() => {
    const fetchOrders = async () => {
      const customerPhone = decodedToken?.phone;

      if (!customerPhone) {
        setError("Phone number not found in cookies.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:6543/order");
        const filteredOrders = response.data.filter(
          (order) => order.customer_phone === customerPhone
        );
        setOrders(filteredOrders);
      } catch (error) {
        setError("Failed to fetch orders.");
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  if (orders.length < 1) {
    return <NothingFound />;
  }

  return (
    <Box
      sx={{
        paddingX: 6,
        background: "linear-gradient(to bottom, white, #fed2a5, #FFF8F1)",
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
        Order History
      </Typography>

      {error && (
        <Typography
          sx={{
            color: "red",
            fontSize: "1.2rem",
            mb: 4,
          }}
        >
          {error}
        </Typography>
      )}

      <Grid container spacing={5}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={3.9} key={order.id}>
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
              {/* Circular Background with Pizza Image */}
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
                <Box
                  component="img"
                  src="/full_pizza.png" // Assuming all pizzas use the same image
                  alt={order.pizza_name}
                  sx={{
                    width: "87%",
                    height: "87%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              {/* Pizza Name */}
              <Typography
                variant="h6"
                sx={{ textAlign: "start", width: "100%", fontWeight: "bold" }}
              >
                {order.pizza_name}
              </Typography>

              {/* Pizza Ingredients */}
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mb: 2, textAlign: "start", width: "100%" }}
              >
                {order.toppings.join(", ")}
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
                  {order.price}
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
                <Typography
                  variant="contained"
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color:
                      order.order_status_user === "Ordered"
                        ? "#f57c00"
                        : "#008000",
                  }}
                >
                  {order.order_status_user === "Ordered"
                    ? "Ordered"
                    : "Received"}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Orders;
