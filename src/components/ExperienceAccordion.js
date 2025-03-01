import React from "react";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Grid, Stack, Typography } from "@mui/material";

export default function ExperienceAccordion(props) {
    const { company, jobTitle, dates, logo, jobDuties, skills, extra, logoalt, handleChange, expanded, panel } = props
    return (
        <MuiAccordion square expanded={expanded === panel} onChange={handleChange(panel)} sx={{ backgroundColor: "#353535", marginBottom: "5px"  }}>
            <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', transform: 'rotate(90deg)' }} />} aria-controls="panel1d-content" id="panel1d-header">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={1}>
                        <img src={logo} width="30" height="auto" alt={logoalt} />
                    </Grid>
                    <Grid item xs={9} md={5} lg={4}>
                        <Typography variant="h5">{jobTitle}</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{display:{xs: "inline-block", md: "none"}}}></Grid>
                    <Grid item xs={9} md={5} lg={6}>
                        <Typography variant="h6" color={"#808080"}>{company}</Typography>
                    </Grid>
                </Grid>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
                <Typography variant="h6" textAlign="left" >{dates}</Typography>
                {extra ? <Typography variant="h6" color={"#808080"} textAlign="left" >{extra}</Typography> : null}
                <Stack direction="column" justifyContent="space-between" spacing={1} width="85%" textAlign="left">
                    <Typography>
                        <b>Daily Activities:</b>
                    </Typography>
                        <ul>
                            {jobDuties.map((course, i) => {
                                return (
                                    <li key={i}>{course}</li>)
                            })}
                        </ul>
                    <Typography textAlign="left">                    
                        <b>Skills:</b>
                    </Typography>
                        <ul>
                            {skills.map((skill, i) => {
                                return (
                                    <li key={i}>{skill}</li>)
                            })}
                        </ul>
                </Stack>
            </MuiAccordionDetails>
        </MuiAccordion>)
}