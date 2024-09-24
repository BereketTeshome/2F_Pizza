import React, { useState, useMemo } from "react";
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
import OrderDetailsModal from "./OrderDetailsModal"; // Import the new modal

const OrdersManagement = () => {
  const [data, setData] = useState([
    {
      pizzaName: "Margherita",
      topping: "Cheese",
      quantity: 2,
      customerNo: "+251977622890",
      createdAt: "2024-09-23 13:45",
      status: "preparing",
    },
    {
      pizzaName: "Pepperoni",
      topping: "Pepperoni",
      quantity: 1,
      customerNo: "+251977622890",
      createdAt: "2024-09-22 15:30",
      status: "ready",
    },
    {
      pizzaName: "Hawaiian",
      topping: "Pineapple, Ham",
      quantity: 3,
      customerNo: "+251977622890",
      createdAt: "2024-09-21 11:15",
      status: "delivered",
    },
  ]);

  const [openTopping, setOpenTopping] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
        Orders
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
