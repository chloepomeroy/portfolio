import React from "react";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Stack, Grid, Typography, Button } from "@mui/material";
import { Link } from 'react-router-dom';

export default function EducationAccordion(props) {
    const { programLink, degree, program, logo, logoalt, schoolAndYear, description, selectedCoursework, projectTitle, projectLink, handleChange, expanded, panel } = props
    return (
        <MuiAccordion square expanded={expanded === panel} onChange={handleChange(panel)} sx={{ backgroundColor: "#353535" }}>
            <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', transform: 'rotate(90deg)' }} />} aria-controls="panel1d-content" id="panel1d-header">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={1} justifyContent="left">
                        <img src={logo} width="30" height="auto" alt={logoalt} />
                    </Grid>
                    <Grid item xs={9} md={5} lg={4}>
                        <Typography variant="h5">{degree}</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{display:{xs: "inline-block", md: "none"}}}></Grid>
                    <Grid item xs={9} md={5} lg={6}>
                        <Typography variant="h6" color={"#808080"}>{" " + program}</Typography>
                    </Grid>
                </Grid>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
                <Stack direction="row" justifyContent="space-between" marginBottom={1}>
                    <Typography variant="h6" textAlign="left" >{schoolAndYear}</Typography>
                    <Button
                        href={programLink}
                        variant="outlined"
                        sx={{ marginLeft: { xs: 0, md: 3 } }}
                    >
                        Program Details
                    </Button>
                </Stack>
                <Stack direction="column" justifyContent="space-between" spacing={1} width="85%" textAlign="left">
                    <Typography>
                        {description}
                    </Typography>
                    <Typography>
                        <b>Selected Coursework:</b>
                    </Typography>
                        <ul>
                            {selectedCoursework.map((course, i) => {
                                return (
                                    <li key={i}>{course}</li>)
                            })}
                        </ul>
                    <Stack direction="row" justifyContent="space-between">
                        {projectTitle ? <Button
                            component={Link} to={projectLink}
                            variant="contained"
                            sx={{ marginLeft: { xs: 0, md: 3 } }}
                        >
                            {projectTitle}
                        </Button> : null}
                    </Stack>
                </Stack>
            </MuiAccordionDetails>
        </MuiAccordion>)
}