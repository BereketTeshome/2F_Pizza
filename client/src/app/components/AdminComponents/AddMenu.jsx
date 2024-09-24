import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SuccessModal from "./SuccessModal"; // Import the SuccessModal component

const AddMenu = () => {
  const [toppings, setToppings] = useState([
    { name: "Cheese", checked: false },
    { name: "Pepperoni", checked: false },
  ]);
  const [newTopping, setNewTopping] = useState("");
  const [pizzaPhoto, setPizzaPhoto] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  // Handle adding a new topping to the list
  const handleAddTopping = () => {
    if (newTopping.trim() !== "") {
      setToppings([...toppings, { name: newTopping, checked: false }]);
      setNewTopping("");
    }
  };

  // Handle toggling topping selection
  const handleToppingChange = (index) => {
    const updatedToppings = [...toppings];
    updatedToppings[index].checked = !updatedToppings[index].checked;
    setToppings(updatedToppings);
  };

  // Handle file input for pizza photo
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setPizzaPhoto(file);
  };

  // Handle form submit
  const handleSubmit = () => {
    // You can add logic to save the pizza data here
    setModalOpen(true); // Open the success modal
  };

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        py: 8,
        borderRadius: 2,
        boxShadow: 3,
        mt: 8,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "50%" }}>
        {/* Centered Add Menu Title */}
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
        >
          Add Menu
        </Typography>

        {/* Pizza Name Input */}
        <TextField
          fullWidth
          label="Pizza Name"
          variant="outlined"
          sx={{ mb: 3 }}
        />

        {/* Toppings Section */}
        <Typography variant="h6" sx={{ mb: 1 }}>
          Toppings
        </Typography>
        <Box sx={{ mb: 2 }}>
          {toppings.map((topping, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={topping.checked}
                  onChange={() => handleToppingChange(index)}
                  sx={{
                    color: "#ff8100", // Orange color for checkboxes
                    "&.Mui-checked": { color: "#ff8100" },
                  }}
                />
              }
              label={topping.name}
            />
          ))}

          {/* Add new topping */}
          <Box sx={{ display: "flex", mt: 2, alignItems: "center" }}>
            <TextField
              label="Add Custom Topping"
              value={newTopping}
              onChange={(e) => setNewTopping(e.target.value)}
              sx={{ flexGrow: 1, mr: 1 }}
            />
            <Button
              onClick={handleAddTopping}
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#ff8100",
                color: "#fff",
                borderRadius: 2,
                minWidth: "40px",
                minHeight: "40px",
                p: 1,
                "&:hover": { bgcolor: "#ff8100" },
              }}
            >
              Add
            </Button>
          </Box>
        </Box>

        {/* Pizza Price Input */}
        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          type="number"
          sx={{ mb: 3 }}
        />

        {/* Upload Pizza Photo Section */}
        <Typography variant="h6" sx={{ mb: 1 }}>
          Upload Pizza Photo
        </Typography>
        <Box
          sx={{
            border: "2px dashed #ccc",
            borderRadius: "8px",
            p: 2,
            textAlign: "center",
            cursor: "pointer",
            mb: 3,
          }}
          onClick={() => document.getElementById("upload-photo").click()} // Clicking the box triggers file input
        >
          <input
            accept="image/*"
            type="file"
            id="upload-photo"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <label htmlFor="upload-photo">
            <IconButton
              component="span"
              sx={{
                color: "#ff8100",
                "&:hover": { bgcolor: "transparent" },
              }}
            >
              <UploadFileIcon fontSize="large" />
            </IconButton>
            <Typography variant="body2">
              {pizzaPhoto ? pizzaPhoto.name : "Upload pizza photo"}
            </Typography>
          </label>
        </Box>

        {/* Centered Submit Button with Half Width */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#ff8100",
              p: 2,
              fontSize: "16px",
              width: "50%",
              "&:hover": { bgcolor: "#ff8100" },
            }}
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </Box>

        {/* Success Modal */}
        <SuccessModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
        />
      </Box>
    </Box>
  );
};

export default AddMenu;
