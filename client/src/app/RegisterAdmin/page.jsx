"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const schema = z
  .object({
    adminname: z.string().min(1, "Admin Name is required"),
    restaurantname: z.string().min(1, "Restaurant Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
    location: z.string().min(1, "Location is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisterAdmin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    adminname: "",
    restaurantname: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    phone: "",
    logo: null,
  });
  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleAccept = () => {
    setChecked(!checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const uniqueName = `restaurant_owners/${uuidv4()}-${file.name}`;
      try {
        const storage = getStorage();
        const storageRef = ref(storage, uniqueName);
        await uploadBytesResumable(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        setImageUrl(downloadUrl);
        setFormData({ ...formData, logo: downloadUrl });
      } catch (error) {
        console.error("Error uploading image to Firebase:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      schema.parse(formData);

      // Send form data including the image URL (logo)
      await axios.post("http://localhost:6543/accounts/register", {
        ...formData,
        logo: imageUrl || "/user.png", // Default image URL in case none is provided
        status: true,
        isadmin: true,
      });
      alert("Admin registered successfully!");
      setIsLoading(false);
      router.push("/LoginAdmin");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = {};
        err.errors.forEach(({ path, message }) => {
          formattedErrors[path[0]] = message;
        });
        setErrors(formattedErrors);
        setIsLoading(false);
      } else {
        alert("An error occurred. Please try again.");
        setIsLoading(false);
      }
    }
  };

  return (
    <Box sx={{ width: "100%", display: "flex", height: "fit-content" }}>
      <Box
        sx={{
          background: "#ff9921",
          width: "50%",
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 200,
            width: 200,
          }}
          alt="Sign up Page Image"
          src="/logo.png"
        />
      </Box>
      <Box
        sx={{
          padding: "3%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: { xs: "100%", md: "50%" },
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginBottom: 4,
          }}
          variant="h5"
        >
          <Box
            component="img"
            sx={{
              height: 40,
              width: 40,
            }}
            alt="login icon"
            src="/logo.png"
          />{" "}
          <Typography
            sx={{
              color: "#af5901",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            2F-Pizza
          </Typography>{" "}
          <br />
        </Typography>
        <Typography variant="h6" sx={{ paddingY: 1 }}>
          SignUp As Admin
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField
            label="Admin Name"
            variant="outlined"
            type="text"
            name="adminname"
            value={formData.adminname}
            onChange={handleChange}
            error={!!errors.adminname}
            helperText={errors.adminname}
          />
          <TextField
            label="Email address"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            label="Restaurant Name"
            variant="outlined"
            type="text"
            name="restaurantname"
            value={formData.restaurantname}
            onChange={handleChange}
            error={!!errors.restaurantname}
            helperText={errors.restaurantname}
          />
          <TextField
            label="Location"
            variant="outlined"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={!!errors.location}
            helperText={errors.location}
          />

          {/* File Upload with Icon */}
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              p: 2,
              textAlign: "center",
              cursor: "pointer",
              mb: 3,
            }}
            onClick={() => document.getElementById("upload-photo").click()}
          >
            <input
              accept="image/*"
              type="file"
              id="upload-photo"
              style={{ display: "none" }}
              onChange={handleImageChange}
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
                {formData.logo ? "Image uploaded" : "Upload restaurant logo"}
              </Typography>
            </label>
          </Box>
        </Box>

        <Typography>
          <Checkbox onClick={handleAccept} /> I accept the Terms and Conditions.
        </Typography>

        <Button
          sx={{
            background: `${isLoading ? "lightgray" : "#ff9921"}`,
            cursor: `${isLoading ? "not-allowed" : "pointer"}`,
            color: "#fff",
            ":hover": {
              bgcolor: `${isLoading ? "lightgray" : "#446497"}`,
            },
          }}
          disabled={!checked}
          onClick={isLoading === false && handleSubmit}
        >
          {isLoading ? "Signing up..." : "Register as Admin"}
        </Button>
        <Typography sx={{ textAlign: "center", marginTop: 2 }}>
          Already have an account?{" "}
          <Link href="/LoginAdmin" underline="none">
            <Typography component="span" sx={{ color: "#ff9921" }}>
              Login
            </Typography>
          </Link>
        </Typography>
        <Typography sx={{ textAlign: "center", marginTop: 2 }}>
          Want to register as a user?{" "}
          <Link href="/Register" underline="none">
            <Typography component="span" sx={{ color: "#ff9921" }}>
              Register as User
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterAdmin;
