const express = require("express");
const router = express.Router();
const {
  getAllPizzas,
  createPizza,
  getPizza,
  updatePizza,
  deletePizza,
} = require("../controllers/pizzas");

router.get("/", getAllPizzas);
router.post("/", createPizza);
router.get("/:id", getPizza);
router.put("/:id", updatePizza);
router.delete("/:id", deletePizza);

module.exports = router;
