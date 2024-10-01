const pool = require("../db");

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM roles");
    if (!result.rows.length) {
      return res.status(404).json({ msg: "No roles found!" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Create a new role
const createRole = async (req, res) => {
  const { role_name, owner_name, permissions } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO roles (role_name, owner_name, permissions, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [role_name, owner_name, permissions]
    );
    const newRole = result.rows[0];
    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Get a single role by ID
const getRole = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM roles WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Update an existing role
const updateRole = async (req, res) => {
  const { id } = req.params;
  const { role_name, owner_name, permissions } = req.body;

  try {
    const result = await pool.query(
      "UPDATE roles SET role_name = $1, owner_name = $2, permissions = $3 WHERE id = $4 RETURNING *",
      [role_name, owner_name, permissions, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Delete a role
const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM roles WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.status(200).json({ msg: "Role deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllRoles,
  createRole,
  getRole,
  updateRole,
  deleteRole,
};
