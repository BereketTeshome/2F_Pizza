require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pizzasRouter = require("./routes/pizzas");
const orderRouter = require("./routes/orders");
const roleRouter = require("./routes/roles");
const usersRouter = require("./routes/users");

const app = express();

app.use(express.json());
app.use(cors());

const pool = require("./db");

const testConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Connected to DB successfully:", result.rows[0]);
  } catch (err) {
    console.error("DB connection error:", err.message);
  }
};

testConnection();

app.use("/pizzas", pizzasRouter);
app.use("/order", orderRouter);
app.use("/role", roleRouter);
app.use("/accounts", usersRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
