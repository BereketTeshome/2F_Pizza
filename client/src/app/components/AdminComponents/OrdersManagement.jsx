import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // To decode the token and extract restaurantname
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import OrderDetailsModal from "./OrderDetailsModal";
import Cookies from "universal-cookie";

const OrdersManagement = () => {
  const [data, setData] = useState([]);
  const [openTopping, setOpenTopping] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get token from cookies
        const cookie = new Cookies();
        const token =
          cookie.get("user_token") || sessionStorage.getItem("user_token");
        const decodedToken = token ? jwtDecode(token) : "";
        const restaurantname = decodedToken.restaurantname;

        if (restaurantname) {
          // Fetch all orders
          const response = await axios.get("http://localhost:6543/order");

          // Filter orders by restaurantname
          const filteredData = response.data.filter(
            (order) => order.owner_name === restaurantname
          );

          const formattedData = filteredData.map((order) => ({
            id: order.id,
            pizzaName: order.pizza_name,
            topping: order.toppings.join(", "),
            quantity: order.quantity,
            customerNo: order.customer_phone,
            createdAt: order.created_at,
            status: order.order_status.toLowerCase(), // Convert to lowercase for consistent status handling
          }));

          setData(formattedData);
        } else {
          console.error("No token found!");
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenTopping = (order) => {
    setSelectedOrder(order);
    setOpenTopping(true);
  };

  const handleCloseTopping = () => setOpenTopping(false);

  const handleStatusChange = (index, status) => {
    const updatedData = [...data];
    updatedData[index].status = status;
    setData(updatedData);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "rowNumber",
        header: "No.",
        size: 20,
        Cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "pizzaName",
        header: "Name",
        size: 150,
        Cell: ({ cell }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="/full_pizza.png"
              alt="Pizza"
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
            <Typography>{cell.getValue()}</Typography>
          </Box>
        ),
      },
      {
        accessorKey: "topping",
        header: "Topping",
        size: 150,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "#ff8100",
            }}
          >
            <IconButton
              onClick={() => handleOpenTopping(row.original)}
              sx={{ color: "#ff8100" }}
            >
              <VisibilityIcon />
            </IconButton>
            <Typography>Toppings</Typography>
          </Box>
        ),
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        size: 150,
        Cell: ({ cell }) => (
          <Typography sx={{ textAlign: "center" }}>
            {cell.getValue()}
          </Typography>
        ),
      },
      {
        accessorKey: "customerNo",
        header: "Customer No.",
        size: 200,
        Cell: ({ cell }) => (
          <Typography sx={{ textAlign: "center" }}>
            {cell.getValue()}
          </Typography>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        size: 170,
        Cell: ({ cell }) => (
          <Typography sx={{ textAlign: "center" }}>
            {new Date(cell.getValue()).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
              month: "numeric",
              day: "numeric",
              year: "2-digit",
            })}
          </Typography>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 160,
        Cell: ({ row }) => {
          const status = row.original.status;
          const statusStyles = {
            preparing: { backgroundColor: "#ffa500", color: "#fff" },
            ready: { backgroundColor: "green", color: "#fff" },
            delivered: { backgroundColor: "green", color: "#fff" },
          };
          return (
            <Box sx={{ width: 140 }}>
              <FormControl fullWidth>
                <Select
                  value={status}
                  onChange={(e) =>
                    handleStatusChange(row.index, e.target.value)
                  }
                  sx={{
                    ...statusStyles[status],
                    border: "none",
                    color: "#fff",
                    borderRadius: 2,
                    height: "35px",
                    borderColor: "#fff",
                    width: "137px",
                  }}
                >
                  <MenuItem
                    value="preparing"
                    sx={{ backgroundColor: "orange", color: "#fff" }}
                  >
                    Preparing
                  </MenuItem>
                  <MenuItem
                    value="ready"
                    sx={{ backgroundColor: "green", color: "#fff" }}
                  >
                    Ready
                  </MenuItem>
                  <MenuItem
                    value="delivered"
                    sx={{ backgroundColor: "green", color: "#fff" }}
                  >
                    <CheckIcon fontSize="0.9rem" /> Delivered
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          );
        },
      },
    ],
    [data]
  );

  return (
    <Box sx={{ bgcolor: "#fff", p: 3, borderRadius: 1, boxShadow: 3, mt: 8 }}>
      <Typography sx={{ marginBottom: 1.2, fontWeight: "bold", color: "#666" }}>
        Orders Management
      </Typography>
      <Box width={"100%"}>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableColumnResizing
        />
      </Box>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          open={openTopping}
          onClose={handleCloseTopping}
          order={selectedOrder}
        />
      )}
    </Box>
  );
};

export default OrdersManagement;
