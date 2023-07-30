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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { Card } from "@mui/material";



export const theme = createTheme();

export function Home() {
  const [user, setUser] = React.useState([]);

  useEffect(() => {
    if (!localStorage.getItem("user")) window.location.href = "/";
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user", user);
    if (user.usertype !== 3) window.location.href = "/";
    setUser(user);
    console.log("user is ", user);

  }, []);

  // return (
  //   <ThemeProvider theme={theme}>
  //     <Container component="main" maxWidth="xs">
  //       <CssBaseline />
  //       <Box
  //         sx={{
  //           marginTop: 8,
  //           display: "flex",
  //         }}
  //       >
  //         <Typography component="h1" variant="h5">
  //           Welcome to your dashboard, {user.username} !
  //         </Typography>
  //       </Box>
  //       <Box
  //         sx={{
  //           marginTop: 8,
  //           display: "flex",
  //         }}
  //       >
  //         <Typography component="h1" variant="h5">
  //           You are logged in as patient.
  //         </Typography>
  //       </Box>
  //       <Box
  //         sx={{
  //           marginTop: 8,
  //           display: "flex",
  //           flexDirection: "row",
  //         }}
  //       >
  //         <TestList />
  //       </Box>
  //     </Container>
  //   </ThemeProvider>
  // );
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography component="h1" variant="h4" color="primary" fontWeight="bold">
            Welcome to your dashboard, {user.username}!
          </Typography>
          <Typography component="h2" variant="h6" color="textSecondary" fontWeight="bold" sx={{ marginTop: 1 }}>
            You are logged in as a patient.
          </Typography>
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <TestList />
        </Box>
      </Container>
    </ThemeProvider>
  );
  
}

export function TestList() {
  const [tests, setTests] = React.useState([]);
  useEffect(() => {
    // console.log("token", localStorage.getItem("access_token"));
    axios
      .get("/api/tests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        // console.log("tests", res.data);
        // console.log("tests", tests);
        setTests(res.data.tests);
        console.log(tests, "here");
        // convert string to array of objects
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      {/* <div> */}
      {tests.map((test) => (
        // console.log(test.id)
        <TestCard key={test.id} test={test} />
      ))}
    </Container>
    // </div>
  );
}

// const TestCard = ({ test }) => {
//   return (
//     <Card
//       sx={{
//         marginTop: 8,
//         display: "flex",
//         flexDirection: "row",
//       }}
//       onClick={() => (window.location.href = `/test/${test.id}`)}
//       style={{ cursor: "pointer" }}
//     >
//       {/* <Grid> */}
//       <Grid item xs={8}>
//         <Typography variant="h5" component="h2">
//           {test.case_number}
//         </Typography>
//       </Grid>
//       <Grid item xs={8}>
//         <Typography variant="body2" component="p">
//           {test.case_name}
//         </Typography>
//       </Grid>
//       <Grid item xs={8}>
//         <Typography variant="body2" component="p">
//           {test.date}
//         </Typography>
//       </Grid>
//     </Card>
//     // </Grid>
//   );
// };
const TestCard = ({ test }) => {
  const handleClick = () => {
    window.location.href = `/test/${test.id}`;
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "1rem",
        borderRadius: "1rem",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        },
        maxWidth: "600px",
        margin: "0 auto 1rem",
      }}
      onClick={handleClick}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" marginBottom="0.5rem">
            {test.case_number}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" component="p" marginBottom="0.5rem">
            {test.case_name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" component="p">
            {test.date}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
