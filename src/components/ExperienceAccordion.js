import React from "react";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Stack, Typography } from "@mui/material";

export default function ExperienceAccordion(props) {
    const { company, jobTitle, dates, logo, jobDuties, skills, extra, logoalt, handleChange, expanded, panel } = props
    return (
        <MuiAccordion square expanded={expanded === panel} onChange={handleChange(panel)} sx={{ backgroundColor: "#353535" }}>
            <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', transform: 'rotate(90deg)' }} />} aria-controls="panel1d-content" id="panel1d-header">
                <Stack direction="row" spacing={1}>
                    <img src={logo} width="30" height="30" alt={logoalt} />
                    {/* <Typography variant="h6" color={"#808080"}>{company}</Typography> */}
                    <Typography variant="h5">{jobTitle}</Typography>
                    <Typography variant="h6" color={"#808080"}>{company}</Typography>
                </Stack>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
                <Typography variant="h6" textAlign="left" >{dates}</Typography>
                {extra ? <Typography variant="h6" color={"#808080"} textAlign="left" >{extra}</Typography> : null}
                <Stack direction="column" justifyContent="space-between" spacing={1} width="85%">
                    <Typography textAlign="left">
                        <b>Daily Activities:</b>
                        <ul>
                            {jobDuties.map((course, i) => {
                                return (
                                    <li key={i}>{course}</li>)
                            })}
                        </ul>
                    </Typography>
                    <Typography textAlign="left">
                        <b>Skills:</b>
                        <ul>
                            {skills.map((skill, i) => {
                                return (
                                    <li key={i}>{skill}</li>)
                            })}
                        </ul>
                    </Typography>
                </Stack>
            </MuiAccordionDetails>
        </MuiAccordion>)
}