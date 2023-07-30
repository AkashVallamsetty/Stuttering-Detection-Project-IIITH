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
const theme = createTheme();

export default function ForgotPassword() {
    // write code for edit password
    const [oldPasswd, setOldPasswd] = React.useState("");
    const [newPasswd, setNewPasswd] = React.useState("");

    const oldPasswdHandler = (event) => {
        setOldPasswd(event.target.value);
    };

    const newPasswdHandler = (event) => {
        setNewPasswd(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <section>
                        <p>Enter old password:</p>
                        <input value={oldPasswd} onChange={(event) => oldPasswdHandler(event)}></input>
                        <p>Enter new password:</p>
                        <input value={newPasswd} onChange={(event) => newPasswdHandler(event)}></input>
                        <br></br>
                        <Button onClick={() => {
                            setOldPasswd("");
                            setNewPasswd("");
                        }} >Change!</Button>
                    </section>
                </Box>
            </Container>
        </ThemeProvider>
    );
}