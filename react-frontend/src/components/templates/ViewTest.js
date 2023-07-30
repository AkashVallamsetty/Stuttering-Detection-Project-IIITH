import React, { Component, useEffect } from "react";
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
import { LoremIpsum } from "react-lorem-ipsum";
import { Divider } from "@mui/material";
import axios from "axios";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc";
import { useParams } from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import aiishPic from "../images/logo.png";
import { useReactToPrint } from 'react-to-print';
import "./style.css";

export default function ViewTest() {
  const { id } = useParams();
  const [test, setTest] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    axios
      .get(`/api/test/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.test);
        setTest(JSON.parse(res.data.test));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    const opt = {
      margin: 1,
      filename: 'test_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2.5 },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },


    };

    // // New Promise-based usage:
    // html2pdf()
    //   .set(opt)
    //   .from(input)
    //   .save();

    // Old monolithic-style usage:
    // html2pdf(input, opt);
  };

    const componentRef = React.useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: 'Report',
      pageStyle: '@page { margin: 20px; }',
    });

  return (
    <Container component="main" maxWidth="s">
      <CssBaseline />
      {loading ? (
        <div>
          <Typography component="h1" variant="h5">
            Loading...
          </Typography>
        </div>
      ) : (
        <>
        <div >
          <br />
          <div ref={componentRef} style={{width: '100%'}}>
            <div style={{ display: 'flex', flex: 1, alignItems: "center", justifyContent: 'center' }}>
              <img src={aiishPic} alt="AIISH Logo" width={150}></img>
            </div>
            <br />
            <br />
            <Typography variant="h5">
              <span style={{ fontWeight: 'bold' }}>Demographic Details</span>
            </Typography>
            <br />

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Case Number</span>
              </Typography>
              <Typography variant="body1">
                : {test.case_number}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Case Name</span>
              </Typography>
              <Typography variant="body1">
                : {test.case_name}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Age</span>
              </Typography>
              <Typography variant="body1">
                : {test.age} years
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Contact Number</span>
              </Typography>
              <Typography variant="body1">
                : {test.contact_number}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Email</span>
              </Typography>
              <Typography variant="body1">
                : {test.email}
              </Typography>
            </Box>
                <Box
              sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>Family History</span>
              </Typography>
              <Typography variant="body1"> : {test.family_history}</Typography>
            </Box>

            <Box
              sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>Model</span>
              </Typography>
              <Typography variant="body1"> : {test.model_type}</Typography>
            </Box>
            

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Occupation</span>
              </Typography>
              <Typography variant="body1">
                : {test.occupation}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Education</span>
              </Typography>
              <Typography variant="body1">
                : {test.education}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Address</span>
              </Typography>
              <Typography variant="body1">
                : {test.address}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Duration</span>
              </Typography>
              <Typography variant="body1">
                : {test.duration} Months
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Nature</span>
              </Typography>
              <Typography variant="body1">
                : {test.nature}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Percentage of disfluencies in Spontaneous speech</span>
              </Typography>
              <Typography variant="body1">
                : -
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Percentage of disfluencies in Reading</span>
              </Typography>
              <Typography variant="body1">
                : -
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Overall percentage of disfluencies</span>
              </Typography>
              <Typography variant="body1">
                : -
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Total number of syllables uttered</span>
              </Typography>
              <Typography variant="body1">
                : {test.total_score ?? "-"}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>Doctor Email</span>
              </Typography>
              <Typography variant="body1">
                : {test.doctor}
              </Typography>
            </Box>
            <div className="pagebreak"></div>
            <Box>
              <br />
              <Divider />
              <br />
              <DisplayQuestions questions={test.questions} />
              <DisplayPassages passages={test.passages} />
            </Box>
          </div>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="8vh"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrint}
            >
              <Grid container direction="row" spacing={1} alignItems={'center'} justify={'center'} style={{ width: "100%" }}>
                <Grid item>
                  Download Report
                </Grid>
              </Grid>
            </Button>
          </Box>
        </div>
        </>
      )}
    </Container>
  );
}

const DisplayQuestions = ({ questions }) => {
  return (
    <div>
      <Typography component="h1" variant="h5">
        {" "}
        <span style={{ fontWeight: 'bold' }}>Questions</span>{" "}
      </Typography>

      {questions.map((question, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <DisplayQuestion question={question} />
          </div>
        );
      })}
    </div>
  );
};

const DisplayQuestion = ({ question }) => {
  const score = question.score;
  const prolongation = score[0];
  const repetition = score[1];
  const blocking = score[2];
  const predictedSyllables = question.bound;

  const totalScore = prolongation + repetition + blocking;
  const percentage = ((totalScore / predictedSyllables) * 100);
  return (
    <div>
      <Typography component="h1" variant="h5">
        {question.text}
      </Typography>
      <br />
      <audio controls>
        <source src={question.source} type="audio/webm" controls />
      </audio>

      {/* <Typography variant="body2">
        <p style={{ fontWeight: "bold" }}>Actual boundaries : {question.bound} </p>
      </Typography> */}
      <Typography variant="body2">
        <p style={{ fontWeight: "bold" }}>Prolongation : {score[0]} </p>
      </Typography>
      <Typography variant="body2">
        <p style={{ fontWeight: "bold" }}>Repetition : {score[1]} </p>
      </Typography>
      <Typography variant="body2">
        <p style={{ fontWeight: "bold" }}>Blocking : {score[2]} </p>
      </Typography>
      {/* <Typography variant="body2">
        <p style={{ fontWeight: "bold" }}>Predicted Boundaries : {score[3]} </p>
      </Typography> */}
      <Typography variant="body2">
        <p style={{ fontWeight: "bold" }}>Percentage: {percentage.toFixed(2)} </p>
      </Typography>

	  <br/>

      <Divider />
      <br />
    </div>
  );
};

const DisplayPassages = ({ passages }) => {
  return (
    <div>
      <Typography component="h1" variant="h5">
        {" "}
        <span style={{ fontWeight: 'bold' }}>Passages</span>{" "}
      </Typography>
      {passages.map((passage, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <DisplayPassage passage={passage} />
          </div>
        );
      })}
    </div>
  );
};

const DisplayPassage = ({ passage }) => {
  // transpose the passage.score array
  const score = passage.score;
  const prolongation = score[0];
  const repetition = score[1];
  const blocking = score[2];
  const predictedSyllables = passage.bound;

  const totalScore = prolongation + repetition + blocking;
  const percentage = ((totalScore / predictedSyllables) * 100);
  console.log(score);

  return (
    <div>
      <Typography component="h1" variant="h5">
        {passage.text}
      </Typography>
      <audio controls>
        <source src={passage.source} type="audio/webm" controls />
      </audio>
{/* 
      <Typography variant="body2">
        <p style={{ fontWeight: "bold" }}>Actual boundaries : {passage.bound} </p>
      </Typography> */}
      <Typography variant="body2">
        <p style={{ fontWeight: "bold" }}>Prolongation : {score[0]} </p>
      </Typography>
      <Typography variant="body2">
        <p style={{ fontWeight: "bold" }}>Repetition : {score[1]} </p>
      </Typography>
      <Typography variant="body2">
        <p style={{ fontWeight: "bold" }}>Blocking : {score[2]} </p>
      </Typography>
      {/* <Typography variant="body2">
        <p style={{ fontWeight: "bold" }}>Predicted boundaries : {score[3]} </p>
      </Typography> */}
       <Typography variant="body2">
        <p style={{ fontWeight: "bold" }}>Percentage: {percentage.toFixed(2)} </p>
      </Typography>

	  <br/>

      <Divider />
      <br />
    </div>
  );
};
