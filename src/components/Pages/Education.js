import React from "react";
import EducationAccordion from "../EducationAccordion";
import { Box, Grid } from "@mui/material";
import PageTitle from "../Titles";

//import logos
import mcmasterLogo from "../../assets/mcmasterLogo.png"
import algonquinLogo from "../../assets/algonquinLogo.png"
import gatechLogo from "../../assets/gatechLogo.png"

export default function Education() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div id="education" >
            <Box sx={{ width: "100%", justifyContent: "center", flexGrow: 1, mb: 8 }}>
                <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }}>
                    <Grid item xs={10} style={{ textAlign: "left" }}>
                        <PageTitle pageTitle="Education" />
                    </Grid>

                    <Grid item xs={10} style={{ justifyContent: "center" }}>
                        <EducationAccordion
                            programLink={"https://pe.gatech.edu/degrees/analytics"}
                            degree={"Master of Science"}
                            program={"Analytics (Computational Track)"}
                            logo={gatechLogo}
                            logoalt={"The logo for Georgia Institute of Technology"}
                            schoolAndYear={"Georgia Tech, 2022-2024"}
                            description={"This is an interdisciplinary data science and analytics degree program that leverages three different colleges at Georgia Tech: Computing, Engineering, and Business. The program focuses on machine learning/AI, statistical modeling and learning, data storage and pipelining, data visualization, optimization and simulation, and business analytics/applications."}
                            selectedCoursework={["Deep Learning", "Machine Learning", "Network Science", "Optimization"]}
                            projectTitle={"Practicum Project"}
                            projectLink={"/audiot-hmm"}
                            handleChange={handleChange}
                            expanded={expanded}
                            panel="panel-1"
                        />
                    </Grid>

                    <Grid item xs={10} style={{ justifyContent: "center" }}>
                        <EducationAccordion
                            programLink={"https://www.algonquincollege.com/sat/program/business-intelligence-system-infrastructure/"}
                            degree={"Graduate Certificate"}
                            program={"Business Intelligence Systems Infrastructure"}
                            logo={algonquinLogo}
                            logoalt={"The logo for Algonquin College"}
                            schoolAndYear={"Algonquin College, 2020-2021"}
                            description={"This program provides specialized knowledge and skills to support the corporate use of Business Intelligence, Data Visualization, Data Science, Cloud Services, and Agile Project Management. The focus is  on learning how to collect, analyze, design, build, integrate and manage systems in order to facilitate data-driven decision-making."}
                            selectedCoursework={["Data Visualization", "Data Modeling", "Cloud Data Architecture", "Database Administration"]}
                            handleChange={handleChange}
                            expanded={expanded}
                            panel="panel-2"
                        />
                    </Grid>

                    <Grid item xs={10} style={{ justifyContent: "center" }}>
                        <EducationAccordion
                            programLink={"https://academiccalendars.romcmaster.ca/preview_program.php?catoid=53&poid=26963"}
                            degree={"Bachelor of Science"}
                            program={"Honours Mathematics and Physics"}
                            logo={mcmasterLogo}
                            logoalt={"The crest for McMaster University"}
                            schoolAndYear={"McMaster University, 2016-2020"}
                            description={"This is a Physics specialization that focuses more  heavily on mathematics and theoretical topics."}
                            selectedCoursework={["Scientific Computing", "Linear Algebra", "Multivariable Calculus", "Probability and Statistics"]}
                            projectTitle={"Undergraduate Thesis"}
                            projectLink={"/thesis"}
                            handleChange={handleChange}
                            expanded={expanded}
                            panel="panel-3"
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )

}