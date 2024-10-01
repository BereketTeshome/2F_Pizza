const pool = require("../db");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders");
    if (!result.rows.length) {
      return res.status(404).json({ msg: "No orders found!" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const {
    pizza_name,
    toppings,
    quantity,
    customer_phone,
    order_status,
    order_status_user,
    price,
    owner_name,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO orders (pizza_name, toppings, quantity, customer_phone, order_status, order_status_user, price, owner_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        pizza_name,
        toppings,
        quantity,
        customer_phone,
        order_status,
        order_status_user,
        price,
        owner_name,
      ]
    );
    const newOrder = result.rows[0];
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Get a single order by ID
const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Update an existing order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    pizza_name,
    toppings,
    quantity,
    customer_phone,
    order_status,
    order_status_user,
    price,
  } = req.body;

  try {
    const result = await pool.query(
      "UPDATE orders SET pizza_name = $1, toppings = $2, quantity = $3, customer_phone = $4, order_status = $5, order_status_user = $6, price = $7 WHERE id = $8 RETURNING *",
      [
        pizza_name,
        toppings,
        quantity,
        customer_phone,
        order_status,
        order_status_user,
        price,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM orders WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ msg: "Order deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
