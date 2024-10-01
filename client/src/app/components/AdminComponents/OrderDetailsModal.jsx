import React from "react";
import { Box, Typography, Modal, Chip, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Function to generate consistent colors based on topping names
const getToppingColor = (topping) => {
  const hash = topping
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

const OrderDetailsModal = ({ open, onClose, order }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 5,
          outline: "none", // Prevent outline on focus
        }}
      >
        {/* Close Icon */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#9e9e9e",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Modal Title */}
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            textAlign: "center",
          }}
        >
          Order details
        </Typography>

        {/* Pizza Name */}
        <Typography sx={{ color: "#333" }}>
          Name: <strong>{order.pizzaName}</strong>
        </Typography>

        {/* Toppings Section */}
        <Typography sx={{ mt: 1, color: "#333" }}>
          <strong>Toppings:</strong>
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 0.5 }}>
          {order.topping.split(", ").map((topping, index) => (
            <Chip
              key={index}
              label={topping}
              sx={{
                backgroundColor: getToppingColor(topping),
                borderRadius: "8px",
                color: "#fff",
              }}
            />
          ))}
        </Box>

        {/* Quantity */}
        <Typography sx={{ mt: 2, color: "#333" }}>
          Quantity:<strong> {order.quantity}</strong>
        </Typography>
      </Box>
    </Modal>
  );
};

export default OrderDetailsModal;
