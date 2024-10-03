"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  Link,
  CircularProgress,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import { z } from "zod";
import axios from "axios";
import Cookies from "universal-cookie";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const LogInAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const cookie = new Cookies();
  const router = useRouter();

  const handleLogin = async () => {
    // Validate input
    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      setErrors(validationResult.error.flatten().fieldErrors);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://2-f-pizza-backend.vercel.app/accounts/login",
        { email, password }
      );
      setIsLoading(false);

      const data = response.data;
      rememberMe
        ? cookie.set("user_token", data.token)
        : sessionStorage.setItem("user_token", data.token);

      router.push("/Dashboard");
    } catch (error) {
      setIsLoading(false);
      if (
        error.response &&
        error.response.data.message === "Incorrect password"
      ) {
        setErrors({ password: ["Incorrect password"] });
      } else {
        setErrors({
          general:
            error.response?.data.message || "Login failed. Please try again.",
        });
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
          alt="Login Page Image"
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
            marginBottom: 2,
          }}
          variant="h5"
        >
          <Box
            component="img"
            sx={{
              height: 32,
              width: 32,
            }}
            alt="login icon"
            src="/logo.png"
          />
          <Typography
            sx={{ color: "#af5901", fontSize: "1.5rem", fontWeight: "bold" }}
          >
            2F-Pizza
          </Typography>
        </Typography>
        <Typography variant="h6" sx={{ paddingY: 1 }}>
          Login As Admin
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />

        {errors.general && (
          <Typography
            color="error"
            variant="body2"
            sx={{ mb: 3, textAlign: "center" }}
          >
            {errors.general}
          </Typography>
        )}

        <TextField
          id="outlined-basic"
          label="Email address"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email?.[0]}
        />

        <TextField
          id="outlined-password"
          label="Password"
          variant="outlined"
          sx={{ marginY: 2 }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password?.[0]}
        />

        <Typography>
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />{" "}
          Remember me
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
          onClick={!isLoading ? handleLogin : null}
          startIcon={
            isLoading && <CircularProgress color="inherit" size={20} />
          }
        >
          {isLoading ? "Logging..." : "Login"}
        </Button>

        <Typography sx={{ textAlign: "center", marginTop: 2 }}>
          Don&apos;t have an account?{" "}
          <Link
            href="/Register"
            sx={{
              textDecoration: "none",
              color: "#ff9921",
              fontWeight: "bold",
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LogInAdmin;
