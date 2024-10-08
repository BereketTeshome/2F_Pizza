"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Button, Card } from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

import NothingFound from "../components/NothingFound";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const cookie = new Cookies();
  const token = cookie.get("two_access_token");

  const [filteredToken, setFilteredToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if we are in the browser
      setFilteredToken(token || sessionStorage?.getItem("two_access_token"));
    }
  }, [token]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!filteredToken) return;

      const decodedToken = jwtDecode(filteredToken);
      const customerPhone = decodedToken?.phone;

      if (!customerPhone) {
        setError("Phone number not found in cookies.");
        return;
      }

      try {
        const response = await axios.get(
          "https://2-f-pizza-backend.vercel.app/order"
        );
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
  }, [filteredToken]);

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

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {orders.map((order) => (
          <Card
            key={order.id}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "20px",
              minWidth: "300px",
              width: "100%",
              maxWidth: "350px",
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

            {/* Price and Order Status */}
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
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color:
                    order.order_status_user === "Ordered"
                      ? "#f57c00"
                      : "#008000",
                }}
              >
                {order.order_status_user === "Ordered" ? "Ordered" : "Received"}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Orders;
