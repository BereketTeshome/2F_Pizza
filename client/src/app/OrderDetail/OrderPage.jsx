"use client";
import { useSearchParams } from "next/navigation"; // Use this for query params
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RxArrowTopRight } from "react-icons/rx";
import OrderSuccessPopup from "../components/OrderSuccessPopup";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import relatedPizzas from "../../store/RelatedPizzas"; // Importing related pizzas data from a separate JSON file

const OrderPage = () => {
  const searchParams = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [filtered, setFiltered] = useState("");
  const cookie = new Cookies();
  const token = cookie.get("two_access_token");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const filteredToken = token
        ? token
        : sessionStorage?.getItem("two_access_token");
      setFiltered(filteredToken);
    }
  }, [token]);
  const decodedToken = filtered ? jwtDecode(filtered) : "";
  const phone = decodedToken?.phone;

  // Initialize state for the pizza data
  const [pizzaData, setPizzaData] = useState({
    pizza_name: "",
    toppings: "",
    price: "",
    image: "",
    owner_name: "",
  });

  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState(new Set());
  const [mainImage, setMainImage] = useState(""); // State for the main pizza image

  useEffect(() => {
    // Ensure the query params are available before setting them
    const pizza_name = searchParams.get("name");
    const toppings = searchParams.get("ingredients");
    const price = searchParams.get("price");
    const image = searchParams.get("image");
    const owner_name = searchParams.get("owner_name");

    if (pizza_name && toppings && price && image && owner_name) {
      // Set pizza data from the query
      setPizzaData({ pizza_name, toppings, price, image, owner_name });
      setMainImage(image); // Set the initial main image

      // Split toppings into an array and set as selected toppings
      const initialToppings = toppings.split(", ");
      setSelectedToppings(new Set(initialToppings));
    }
  }, [searchParams]);

  // Handle topping selection
  const handleToggleTopping = (topping) => {
    const updatedToppings = new Set(selectedToppings);
    if (updatedToppings.has(topping)) {
      updatedToppings.delete(topping);
    } else {
      updatedToppings.add(topping);
    }
    setSelectedToppings(updatedToppings);
  };

  // Handle quantity change
  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const totalPrice = Number(pizzaData.price) * quantity;

  // Handle image change when a tiny pizza is clicked
  const handleImageChange = (image) => {
    setMainImage(image);
  };

  // Handle form submit
  const handleSubmit = async () => {
    const orderData = {
      pizza_name: pizzaData.pizza_name || "Pepperoni Pizza",
      toppings: Array.from(selectedToppings) || [
        "Pepperoni",
        "Cheese",
        "Tomato Sauce",
      ],
      quantity,
      customer_phone: phone,
      owner_name: pizzaData.owner_name,
      order_status: "Preparing",
      order_status_user: "Ordered",
      price: totalPrice || 340,
      image:
        pizzaData.image ||
        "https://againstthegraingourmet.com/cdn/shop/products/Pepperoni_Pizza_Beauty_900x.jpg?v=1658703726",
    };

    try {
      console.log(orderData);
      await axios.post("https://2-f-pizza-backend.vercel.app/order", orderData);
      setModalOpen(true); // Open the success modal
    } catch (error) {
      console.error("Failed to submit order", error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: "flex",
          gap: isSmallScreen ? 2 : 10,
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: isSmallScreen ? "center" : "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
            alignItems: "center",
          }}
        >
          {/* Main Pizza Image */}
          {mainImage && (
            <Box
              sx={{
                width: isSmallScreen ? "250px" : "300px",
                height: isSmallScreen ? "250px" : "300px",
                borderRadius: "50%",
                backgroundColor: "#fbe0c1", // Circle background
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={mainImage}
                alt={pizzaData.pizza_name}
                sx={{
                  width: isSmallScreen ? "220px" : "250px",
                  height: isSmallScreen ? "220px" : "250px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}

          {/* Pizza Image Selector - Vertical */}
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
              }}
            >
              {/* Tiny pizza for current image */}
              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border:
                    mainImage === pizzaData.image ? "2px solid orange" : "",
                }}
                onClick={() => handleImageChange(pizzaData.image)}
              >
                <Box
                  component="img"
                  src={pizzaData.image}
                  alt="Current pizza"
                  sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              {/* Tiny pizza for default image */}
              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border:
                    mainImage === "/alternative.png" ? "2px solid orange" : "",
                }}
                onClick={() => handleImageChange("/alternative.png")}
              >
                <Box
                  component="img"
                  src="/alternative.png"
                  alt="Default pizza"
                  sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Pizza Details */}
        <Box sx={{ mt: isSmallScreen ? 2 : 4 }}>
          <Typography
            variant="h4"
            sx={{ mb: 2, textAlign: isSmallScreen ? "center" : "left" }}
          >
            {pizzaData.pizza_name}
          </Typography>

          {/* Toppings Checkboxes */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: isSmallScreen ? "center" : "flex-start",
            }}
          >
            {pizzaData.toppings &&
              pizzaData.toppings.split(", ").map((topping) => (
                <FormControlLabel
                  key={topping}
                  control={
                    <Checkbox
                      checked={selectedToppings.has(topping)}
                      onChange={() => handleToggleTopping(topping)}
                      sx={{
                        color: "#ff8100",
                        "&.Mui-checked": { color: "#ff8100" },
                      }}
                    />
                  }
                  label={topping}
                />
              ))}
          </Box>

          {/* Quantity Selector */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
              gap: 2,
              justifyContent: isSmallScreen ? "center" : "flex-start",
            }}
          >
            <Button
              variant="contained"
              onClick={() => handleQuantityChange(-1)}
              sx={{
                minWidth: "40px",
                backgroundColor: "orange",
                "&:hover": { backgroundColor: "#e69500" },
              }}
            >
              -
            </Button>
            <Typography sx={{ mx: 2 }}>{quantity}</Typography>
            <Button
              variant="contained"
              onClick={() => handleQuantityChange(1)}
              sx={{
                minWidth: "40px",
                backgroundColor: "orange",

                "&:hover": { backgroundColor: "#e69500" },
              }}
            >
              +
            </Button>
            {/* Total Price */}
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.8rem",
                fontWeight: "bold",
                color: "#01c550",
                position: "relative",
              }}
            >
              {totalPrice}
              <Typography
                variant="body2"
                component="span"
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
          </Box>

          {/* Order Button with icon */}
          <Button
            variant="contained"
            color="warning"
            sx={{
              mt: 2,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }} // Order text and icon
            onClick={handleSubmit}
          >
            Order
            <RxArrowTopRight size={25} />
          </Button>
          {/* Success Modal */}
          <OrderSuccessPopup
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
          />
        </Box>
      </Box>
      {/* Related Pizzas Section with horizontal scroll */}
      <Typography
        sx={{ my: 4, fontSize: "1.7rem", color: "#888", fontWeight: "bold" }}
      >
        Related
      </Typography>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          gap: 3,
          p: 2,
          overflowX: "auto",
        }}
      >
        {relatedPizzas.map((pizza, index) => (
          <Box
            key={index}
            sx={{
              minWidth: "200px",
              width: "250px",
              boxShadow: 3,
              borderRadius: 2,
              px: 1,
              py: 3,
              backgroundColor: "#fff",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: "160px", // Larger circle size
                height: "160px", // Larger circle size
                borderRadius: "50%",
                backgroundColor: "#fbe0c1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mx: "auto",
                mb: 1,
              }}
            >
              <Box
                component="img"
                src={pizza.image}
                alt={pizza.name}
                sx={{
                  width: "140px", // Larger pizza image
                  height: "140px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Typography variant="subtitle1">{pizza.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {pizza.ingredients}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OrderPage;
