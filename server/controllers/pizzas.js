const pool = require("../db");

// Get all pizzas
const getAllPizzas = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pizza");
    if (result.rows.length < 0) {
      return res.status(404).json({ msg: "No pizza found" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Create a new pizza
const createPizza = async (req, res) => {
  const {
    pizza_name,
    owner_name,
    owner_image,
    toppings,
    quantity,
    price,
    image,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO pizza 
        (pizza_name, owner_name, owner_image, toppings, quantity, price, image) 
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [pizza_name, owner_name, owner_image, toppings, quantity, price, image]
    );

    const newPizza = result.rows[0];
    res.status(201).json(newPizza);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Get a single pizza by ID
const getPizza = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM pizza WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pizza not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Update an existing pizza
const updatePizza = async (req, res) => {
  const { id } = req.params;
  const { pizza_name, toppings, quantity, price, image } = req.body;

  try {
    const result = await pool.query(
      "UPDATE pizza SET pizza_name = $1, toppings = $2, quantity = $3, price = $4, image = $5 WHERE id = $6 RETURNING *",
      [pizza_name, toppings, quantity, price, image, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pizza not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Delete a pizza
const deletePizza = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM pizza WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Pizza not found" });
    }
    res.status(200).json({ msg: "Pizza deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllPizzas,
  createPizza,
  getPizza,
  updatePizza,
  deletePizza,
};
