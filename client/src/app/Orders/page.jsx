import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  Card,
  Divider,
} from "@mui/material";

const pizzas = [
  {
    name: "Margherita",
    ingredients: "Tomato, Mozzarella, Basil",
    price: "100",
    image: "/full_pizza.png",
  },
  {
    name: "Pepperoni",
    ingredients: "Pepperoni, Mozzarella, Tomato",
    price: "120",
    image: "/full_pizza.png",
  },
  {
    name: "BBQ Chicken",
    ingredients: "Chicken, BBQ Sauce, Onions",
    price: "140",
    image: "/full_pizza.png",
  },
  {
    name: "Margherita",
    ingredients: "Tomato, Mozzarella, Basil",
    price: "100",
    image: "/full_pizza.png",
  },
  {
    name: "Pepperoni",
    ingredients: "Pepperoni, Mozzarella, Tomato",
    price: "120",
    image: "/full_pizza.png",
  },
  {
    name: "BBQ Chicken",
    ingredients: "Chicken, BBQ Sauce, Onions",
    price: "140",
    image: "/full_pizza.png",
  },
];

const Orders = () => {
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

      <Grid container spacing={5}>
        {pizzas.map((pizza, index) => (
          <Grid item xs={12} sm={6} md={3.9} key={index}>
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
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  style={{
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
                {pizza.name}
              </Typography>

              {/* Pizza Ingredients */}
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mb: 2, textAlign: "start", width: "100%" }}
              >
                {pizza.ingredients}
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
                  {pizza.price}
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
                <Button
                  variant="contained"
                  color="warning"
                  sx={{
                    textTransform: "none",
                    px: 8,
                    py: 1.5,
                    fontSize: "1.3rem",
                  }}
                >
                  Order
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Orders;
