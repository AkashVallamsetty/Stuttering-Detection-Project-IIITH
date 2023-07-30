import React, { useRef, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Context from "@mui/base/TabsUnstyled/TabsContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { Card,CardContent,Tooltip } from "@mui/material";
// import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



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
    if (user.usertype !== 0) window.location.href = "/";
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
            You are logged in as SUPERADMIN.
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
        },
      })
      .then((res) => {
        setdoctors(res.data.doctors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      {doctors.map((test) => (
        <div key={test.id} onClick={() => window.location.href = `/user/${test.id}`} style={{ cursor: "pointer" }}>
        <UserCard key={test.id} test={test} />
        </div>
      ))}
    </Container>
  );
}

export function PatientsList() {
  const [patients, setpatients] = React.useState([]);
  const [edit, setedit] = React.useState([]);
  function handleClick(test) {
    console.log("yo");
    console.log(test);
  }

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
        // window.location.reload();
        // console.log(tests, "here");
        // convert string to array of objects
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      {/* <div> */}
      {patients.map((test) => (
        <div key={test.id} onClick={() => window.location.href = `/user/${test.id}`} style={{ cursor: "pointer" }}>
          <UserCard key={test.id} test={test}  />
        </div>
      ))}
    </Container>
    // </div>
  );
}

const UserCard = ({ test }) => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const [textInput, setTextInput] = useState("");
  const [textInput2, setTextInput2] = useState("");

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };
  const handleTextInputChange2 = (event) => {
    setTextInput2(event.target.value);
  };
  const nusername = useRef("");
  function edit_name(username) {
    console.log("rann");
    const article = JSON.stringify({
      param: username,
      param2: textInput,
    });
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    axios("/api/doctors/edit", {
      method: "POST",
      data: article,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        window.location.reload();
        handleClose();
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function edit_email(email) {
    console.log("rann");
    const article = JSON.stringify({
      param: email,
      param2: textInput2,
    });
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    axios("/api/doctors/edit2", {
      method: "POST",
      data: article,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        window.location.reload();
        handleClose2();
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function delete_user(email) {
    const article = JSON.stringify({
      email: email,
    });
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    axios("/api/doctors/delete", {
      method: "POST",
      data: article,
      headers: headers,
    })
      .then((res) => {
        window.location.reload();
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  const [openDialog, setOpenDialog] = useState(false);

  return ( 
    <Card sx={{marginTop:2,display:"flex",flexDirection:"row",alignItems:"center",padding:"1rem",boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.5)",borderRadius:"10px"}} >
  <Grid container spacing={2} alignItems="center">
  <Grid item xs={6}>
    <Typography variant="h5" component="h2" textAlign="center" >
      {test.username}
      <Tooltip title="Edit Username">
      <IconButton size="small" onClick={(event) => { event.stopPropagation(); handleOpen(); }}  sx={{ bgcolor: "#e0e0e0", ml: "0.5rem" }}>
        <EditIcon sx={{ color: "blue" }} />
      </IconButton>
      </Tooltip>
    </Typography>
  </Grid>
  <Grid item xs={5}>
    <Typography variant="body" component="p" textAlign="center">
      {test.email}
      <Tooltip title="Edit Email">
      <IconButton size="small" onClick={(event) => { event.stopPropagation(); handleOpen2(); }} sx={{ bgcolor: "#e0e0e0", ml: "0.5rem" }}>
        <EditIcon sx={{ color: "blue" }} />
      </IconButton>
      </Tooltip>
      
    </Typography>
  </Grid>
  <Grid item xs={1}>
  <Tooltip title="Delete user">
    <IconButton
      size="small"
      onClick={(event) => {
        event.stopPropagation();
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this user? This action cannot be undone."
        );
        if (confirmDelete) {
          delete_user(test.email);
        }
      }}
      color="secondary"
    >
      <DeleteIcon />
    </IconButton>
  </Tooltip>
</Grid>


</Grid>

<Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description" onClick={(event) => { event.stopPropagation()}}>
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <Card sx={{ width: 400 }}>
      <CardContent>
        <Typography id="modal-title" variant="h5" component="h2" sx={{ mb: 2 }}>
          Edit Username
        </Typography>
        <TextField
          id="standard-basic"
          label="Username"
          variant="filled"
          fullWidth
          value={textInput}
          onChange={(event) => {
            handleTextInputChange(event);
          }}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={(event) => { event.stopPropagation(); handleClose(); }} sx={{ borderRadius: '20px', py: 1, px: 3 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={(event) => {event.stopPropagation(); edit_name(test.username); handleClose(); }} sx={{ borderRadius: '20px', py: 1, px: 3 }}>
            Save
          </Button>
        </Box>
      </CardContent>
    </Card>
  </Box>
</Modal>
  
  <Modal open={open2} onClose={handleClose2} aria-labelledby="modal-title" aria-describedby="modal-description" onClick={(event) => { event.stopPropagation()}}>
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <Card sx={{ width: 400 }}>
      <CardContent>
        <Typography id="modal-title" variant="h5" component="h2" sx={{ mb: 2 }}>
          Edit Email
        </Typography>
        <TextField
          id="standard-basic"
          label="Email"
          variant="filled"
          fullWidth
          value={textInput2}
          onChange={handleTextInputChange2}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={(event) => { event.stopPropagation(); handleClose2(); }} sx={{ borderRadius: '20px', py: 1, px: 3 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={(event) => {  edit_email(test.email); handleClose2(); }} sx={{ borderRadius: '20px', py: 1, px: 3 }}>
              Save
          </Button>

        </Box>
      </CardContent>
    </Card>
  </Box>
</Modal>
</Card>
  );  
};
