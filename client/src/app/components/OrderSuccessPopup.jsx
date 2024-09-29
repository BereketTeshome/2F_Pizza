import React from "react";
import { Box, Typography, Modal } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderSuccessPopup = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 8,
          borderRadius: 2,
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        {/* Outer light green circle */}
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            bgcolor: "#d9f2e4", // Light green
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          {/* Inner green circle with check icon */}
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              bgcolor: "#05c605",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircleIcon sx={{ color: "#fff", fontSize: "36px" }} />
          </Box>
        </Box>

        {/* Success message */}
        <Typography variant="h6" sx={{ color: "#05c605", fontWeight: "bold" }}>
          Your order has been successfully completed!
        </Typography>
      </Box>
    </Modal>
  );
};

export default OrderSuccessPopup;
