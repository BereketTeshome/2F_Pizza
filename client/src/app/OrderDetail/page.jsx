// Import Suspense from React
import { Suspense } from "react";
import OrderPage from "./OrderPage"; // Assuming OrderPage is in the same directory

const OrderDetail = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderPage />
    </Suspense>
  );
};

export default OrderDetail;
