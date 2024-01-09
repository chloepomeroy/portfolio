import React from "react";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Grid, Stack, Typography, Box, Button } from "@mui/material";
import PageTitle from "./Titles";

//import logos
import mcmasterLogo from "../assets/mcmasterLogo.png"
import algonquinLogo from "../assets/algonquinLogo.png"
import gatechLogo from "../assets/gatechLogo.png"

function CustomAccordion(props) {
    const { programLink, degree, program, logo, schoolAndYear, description, selectedCoursework, handleChange, expanded, panel } = props
    return (
        <MuiAccordion square expanded={expanded === panel} onChange={handleChange(panel)} sx={{ backgroundColor: "#353535" }}>
            <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', transform: 'rotate(90deg)' }} />} aria-controls="panel1d-content" id="panel1d-header">
                <Stack direction="row" spacing={1}>
                    <img src={logo} width="30" height="30" />
                    <Typography variant="h5">{degree}</Typography>
                    <Typography variant="h6" color={"#808080"}>{" " + program}</Typography>
                </Stack>
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
                <Stack direction="column" justifyContent="space-between" spacing={1} width="85%">
                    <Typography textAlign="left">
                        {description}
                    </Typography>
                    <Typography textAlign="left">
                        <b>Selected Coursework:</b>
                        <ul>
                            {selectedCoursework.map((course, i) => {
                                return (
                                    <li key={i}>{course}</li>)
                            })}
                        </ul>
                    </Typography>
                </Stack>
            </MuiAccordionDetails>
        </MuiAccordion>)
}

export default function EducationAccordion() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }}>
            <Grid item xs={10} style={{ textAlign: "left" }}>
                <PageTitle pageTitle="Education" />
            </Grid>

            <Grid item xs={10} style={{ justifyContent: "center" }}>
                <CustomAccordion
                    programLink={"https://pe.gatech.edu/degrees/analytics"}
                    degree={"Master of Science (expected by 09/2024)"}
                    program={"Analytics (Computational Track)"}
                    logo={gatechLogo}
                    schoolAndYear={"Georgia Tech, 2022-2024"}
                    description={"This is an interdisciplinary data science and analytics degree program that leverages three different colleges at Georgia Tech: Computing, Engineering, and Business. The program focuses on machine learning/AI, statistical modeling and learning, data storage and pipelining, data visualization, optimization and simulation, and business analytics/applications."}
                    selectedCoursework={["Deep Learning", "Machine Learning", "Network Science", "Optimization"]}
                    handleChange={handleChange}
                    expanded={expanded}
                    panel="panel-1"
                />
            </Grid>

            <Grid item xs={10} style={{ justifyContent: "center" }}>
                <CustomAccordion
                    programLink={"https://www.algonquincollege.com/sat/program/business-intelligence-system-infrastructure/"}
                    degree={"Graduate Certificate"}
                    program={"Business Intelligence Systems Infrastructure"}
                    logo={algonquinLogo}
                    schoolAndYear={"Algonquin College, 2020-2021"}
                    description={"This program provides specialized knowledge and skills to support the corporate use of Business Intelligence, Data Visualization, Data Science, Cloud Services, and Agile Project Management. The focus is  on learning how to collect, analyze, design, build, integrate and manage systems in order to facilitate data-driven decision-making."}
                    selectedCoursework={["Data Visualization", "Data Modeling", "Cloud Data Architecture", "Database Administration"]}
                    handleChange={handleChange}
                    expanded={expanded}
                    panel="panel-2"
                />
            </Grid>

            <Grid item xs={10} style={{ justifyContent: "center" }}>
                <CustomAccordion
                    programLink={"https://academiccalendars.romcmaster.ca/preview_program.php?catoid=53&poid=26963"}
                    degree={"Bachelor of Science"}
                    program={"Honours Mathematics and Physics"}
                    logo={mcmasterLogo}
                    schoolAndYear={"McMaster University, 2016-2020"}
                    description={"This is a Physics specialization that focuses more  heavily on mathematics and theoretical topics."}
                    selectedCoursework={["Scientific Computing", "Linear Algebra", "Multivariable Calculus", "Probability and Statistics"]}
                    handleChange={handleChange}
                    expanded={expanded}
                    panel="panel-3"
                />
            </Grid>
        </Grid>
    );

}