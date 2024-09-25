"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const OrderPage = () => {
  const router = useRouter();

  // Initialize state for the query parameters
  const [pizzaData, setPizzaData] = useState({
    name: "",
    ingredients: "",
    price: "",
    image: "",
  });

  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState(new Set());

  useEffect(() => {
    // Ensure the router query params are available before setting them
    if (router.query && router.query.name) {
      const { name, ingredients, price, image } = router.query;

      // Set pizza data from the query
      setPizzaData({ name, ingredients, price, image });

      // Split ingredients into an array and set as selected toppings
      if (ingredients) {
        const initialToppings = ingredients.split(", ");
        setSelectedToppings(new Set(initialToppings));
      }
    }
  }, [router.query]);

  const handleToggleTopping = (topping) => {
    const updatedToppings = new Set(selectedToppings);
    if (updatedToppings.has(topping)) {
      updatedToppings.delete(topping);
    } else {
      updatedToppings.add(topping);
    }
    setSelectedToppings(updatedToppings);
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const totalPrice = Number(pizzaData.price) * quantity;

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Ensure that pizzaData.image is available */}
        {pizzaData.image && (
          <img
            src={pizzaData.image}
            alt={pizzaData.name}
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              objectFit: "contain",
            }}
          />
        )}

        {/* Pizza Details */}
        <Box>
          <Typography variant="h4">{pizzaData.name}</Typography>
          <Typography variant="h6">Toppings</Typography>

          {/* Toppings Checkboxes */}
          {pizzaData.ingredients &&
            pizzaData.ingredients
              .split(", ")
              .map((topping) => (
                <FormControlLabel
                  key={topping}
                  control={
                    <Checkbox
                      checked={selectedToppings.has(topping)}
                      onChange={() => handleToggleTopping(topping)}
                    />
                  }
                  label={topping}
                />
              ))}

          {/* Quantity Selector */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </Button>
            <Typography sx={{ mx: 2 }}>{quantity}</Typography>
            <Button variant="contained" onClick={() => handleQuantityChange(1)}>
              +
            </Button>
          </Box>

          {/* Total Price */}
          <Typography variant="h5" sx={{ mt: 2 }}>
            Total: {totalPrice} Birr
          </Typography>

          {/* Order Button */}
          <Button variant="contained" color="warning" sx={{ mt: 2 }}>
            Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderPage;
