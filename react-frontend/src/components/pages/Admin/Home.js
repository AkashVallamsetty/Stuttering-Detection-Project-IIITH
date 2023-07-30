import React, { useEffect } from "react";
// import { Controller, useForm } from "react-hook-form";
// import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Context from "@mui/base/TabsUnstyled/TabsContext";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { Card } from "@mui/material";
// import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
// import styled from "styled-components";

export const theme = createTheme();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ marginTop: 2, padding: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export function Home() {
  const [user, setUser] = React.useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (!localStorage.getItem("user")) window.location.href = "/";
    const user = JSON.parse(localStorage.getItem("user"));
    // if (user.usertype !== 0 || user.usertype === 1) window.location.href = "/";
    setUser(user);
    console.log("user", user);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography component="h1" variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold', color: theme.palette.primary.main }}>
            Welcome to your dashboard, {user.username}!
          </Typography>
          <Typography component="h2" variant="h5" sx={{ marginBottom: 4, color: theme.palette.secondary.main }}>
            You are logged in as ADMIN.
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 2 }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                centered
                sx={{ backgroundColor: theme.palette.background.paper }}
              >
                <Tab label="Doctors" {...a11yProps(0)} sx={{ fontWeight: 'bold' }} />
                <Tab label="Patients" {...a11yProps(1)} sx={{ fontWeight: 'bold' }} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <DoctorsList />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PatientsList />
            </TabPanel>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export function DoctorsList() {
  const [doctors, setdoctors] = React.useState([]);

  useEffect(() => {
    // console.log("token", localStorage.getItem("access_token"));
    axios
      .get("/api/doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          // "Access-Control-Allow-Origin": "*"
        },
      })
      .then((res) => {
        // console.log("tests", res.data);
        // console.log("tests", tests);
        setdoctors(res.data.doctors);
        // console.log(tests, "here");
        // convert string to array of objects
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      {doctors.map((test) => (
        <div key={test.id} onClick={() => window.location.href = `/user/${test.id}`} style={{ cursor: "pointer" }}>
          <UserCard test={test} />
        </div>
      ))}
    </Container>
  );
}

export function PatientsList() {
  const [patients, setpatients] = React.useState([]);

  useEffect(() => {
    // console.log("token", localStorage.getItem("access_token"));
    axios
      .get("/api/patients", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        // console.log("tests", res.data);
        // console.log("tests", tests);
        setpatients(res.data.patients);
        // console.log(tests, "here");
        // convert string to array of objects
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      {patients.map((test) => (
        <div key={test.id} onClick={() => window.location.href = `/user/${test.id}`} style={{ cursor: "pointer" }}>
          <UserCard test={test} />
        </div>
      ))}
    </Container>
  );
  
}

const UserCard = ({ test }) => {
  return (
    <Card sx={{marginTop:2,display:"flex",flexDirection:"row",alignItems:"center",padding:"1rem",boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.5)",borderRadius:"10px"}} >
  <Grid container spacing={2} alignItems="center">
    <Grid item xs={6}>
      <Typography variant="h5" component="h2" textAlign="center" >
        {test.username}
        </Typography>
    </Grid>
    <Grid item xs={6}>
    <Typography variant="body" component="p" textAlign="center" >
        {test.email}
      </Typography>
    </Grid>
  </Grid>
  </Card>
  );
};
