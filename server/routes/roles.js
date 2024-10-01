const express = require("express");
const router = express.Router();
const {
  getAllRoles,
  createRole,
  getRole,
  updateRole,
  deleteRole,
} = require("../controllers/roles");

router.get("/", getAllRoles);
router.post("/", createRole);
router.get("/:id", getRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
