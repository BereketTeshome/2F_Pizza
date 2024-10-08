"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  Link,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";

const schema = z
  .object({
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

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    adminName: "",
    restaurantName: "",
    logo: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    phone: "",
    isAdmin: "",
  });
  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = () => {
    setChecked(!checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      schema.parse(formData);
      await axios.post(
        "https://2-f-pizza-backend.vercel.app/accounts/register",
        formData
      );
      alert("User registered successfully!");
      setIsLoading(false);
      router.push("/Login");
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
    <Box sx={{ width: "100%", display: "flex" }}>
      <Box
        sx={{
          background: "#ff9921",
          width: "50%",
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
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
          paddingX: "3%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
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
          </Typography>
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
            label="Location"
            variant="outlined"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={!!errors.location}
            helperText={errors.location}
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
          {isLoading ? "signing up..." : "Sign Up"}
        </Button>
        <Typography sx={{ textAlign: "center", marginTop: 2 }}>
          Already have an account?{" "}
          <Link href="/Login" sx={{ textDecoration: "none", color: "#ff9921" }}>
            Login
          </Link>
        </Typography>
        <Typography sx={{ textAlign: "center", marginTop: 2 }}>
          Want to register as an Admin?{" "}
          <Link
            href="/RegisterAdmin"
            sx={{ textDecoration: "none", color: "#ff9921" }}
          >
            Register as Admin
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
