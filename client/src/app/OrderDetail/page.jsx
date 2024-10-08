// Import Suspense from React
import { Suspense } from "react";
import OrderPage from "./OrderPage"; // Assuming OrderPage is in the same directory
import { Box } from "@mui/material";

const OrderDetail = () => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            minHeight: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </Box>
      }
    >
      <OrderPage />
    </Suspense>
  );
};

export default OrderDetail;
