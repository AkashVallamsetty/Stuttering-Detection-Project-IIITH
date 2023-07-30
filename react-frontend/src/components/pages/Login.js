import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Context from "@mui/base/TabsUnstyled/TabsContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { notify } from "../templates/Toast";
import { Input, IconButton, InputAdornment } from "@mui/material";

import aiishPic from "../images/AIISH_LoGO.jpeg";
import iiitPic from "../images/IIITLoGO.jpeg";

const theme = createTheme();

export default function Login() {
  const {
    register,
    control,
    handleSubmit,
    formState,
    clearErrors,
    getValues,
    setError,
  } = useForm();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    //    send data as form data
    console.log(data);

    axios
      .post("/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Login Success", res);
        notify(res.data.message, "success");
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        localStorage.setItem("user", res.data.user);
        setTimeout(() => {
          const user = JSON.parse(localStorage.getItem("user"));
          console.log(user);

          if (user.usertype === 0) {
            // super_admin
            console.log("superadmin");
            window.location.href = "/superadmin";
          } else if (user.usertype === 1) {
            // admin
            console.log("admin");
            window.location.href = "/admin";
          } else if (user.usertype === 2) {
            // doctor
            console.log("doctor");
            window.location.href = "/doctor";
          } else if (user.usertype === 3) {
            // patient
            console.log("patient");
            window.location.href = "/patient";
          } else {
            console.log("others");
            notify("Invalid user type", "error");
          }
        }, 2000);
      })
      .catch((err) => {
        console.log("Login Error", err);
        notify(err.response.data.message, "error");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.usertype === 0) {
        window.location.href = "/superadmin";
      } else if (user.usertype === 1) {
        window.location.href = "/admin";
      } else if (user.usertype === 2) {
        window.location.href = "/doctor";
      } else if (user.usertype === 3) {
        window.location.href = "/patient";
      } else {
        window.location.href = "/login";
      }
    }
  }, []);

  return (
<ThemeProvider theme={theme}>
  <Box minHeight="100vh" display="flex" flexDirection="column" >
  <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
    <Box flexGrow={1}>      
    <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom 
        style={{
          padding: "2rem", 
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", 
          fontFamily: "Montserrat, sans-serif", 
          letterSpacing: "0.05rem",
          color: "#4caf50", /* Green color */
          fontWeight: 400, /* bold */
          lineHeight: 1.2 /* spacing between lines */
        }}>
        Stuttering Detection Platform
        <Typography variant="subtitle1" align="center" style={{ 
          fontSize: "1.2rem", 
          marginTop: "2px", /* add some margin */
          color: "grey" /* dark gray color */
        }}>
          A tool for detecting speech disfluencies
        </Typography>
      </Typography>

      <Grid container justifyContent="center" alignItems="center" style={{ height: "100%" }}>
        <Grid item xs={12} sm={6} md={4}>
          <Box p={3} borderRadius={8} boxShadow={3} bgcolor="background.paper">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={3}>
                <Typography variant="h5" component="h1" align="center">
                  Sign In
                </Typography>
              </Box>

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                {...register("email", {
                  required: true,
                  validate: {
                    email: (value) =>
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ||
                      "Invalid email address",
                  },
                })}
                helperText={formState.errors.email?.message}
                error={formState.errors.email ? true : false}
                autoComplete="email"
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                // show hidden icon
                {...register("password", {
                  required: true,
                })}
                helperText={formState.errors.password?.message}
                error={formState.errors.password ? true : false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box mt={2}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={
                    formState.isSubmitting || formState.isValidating
                      ? true
                      : false
                  }
                >
                  {formState.isSubmitting || formState.isValidating
                    ? "Loading..."
                    : "Sign In"}
                </Button>
              </Box>
            </form>

            <Box mt={2} display="flex" justifyContent="space-between">
              <Link href="/forgotpassword" variant="body2">
                Forgot password?
              </Link>
              <Link href="/register" variant="body2">
                Sign Up
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>

    <Box bgcolor="primary.main" color="white" p={2} textAlign="center">
    <Typography variant="subtitle2">
  Developed by IIIT Hyderabad
</Typography>

    </Box>
  </Box>
</ThemeProvider>

  );
}