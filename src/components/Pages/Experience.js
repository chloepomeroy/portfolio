import React from "react";
import ExperienceAccordion from "../ExperienceAccordion";
import { Box, Grid } from "@mui/material";
import PageTitle from "../Titles";

//import images
import armyLogo from "../../assets/armyLogo.png"
import microsoftLogo from "../../assets/microsoftLogo.png"

export default function Experience({ name }) {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box sx={{ width: "100%", justifyContent: "center" }}>
            <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }}>
                <Grid item xs={10} style={{ textAlign: "left" }}>
                    <PageTitle pageTitle="Experience" />
                </Grid>

                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <ExperienceAccordion
                        company={"Department of National Defence - Canadian Army"}
                        jobTitle={"Full Stack Web Developer - Team Lead"}
                        dates={"07/2022 - Present"}
                        extra={"Part time from 09/2023 - 06/2024"}
                        logo={armyLogo}
                        logoalt={"The logo for the Canadian Army"}
                        jobDuties={["Taking a leadership role in a development team while abiding by Agile methodologies",
                            "Developing web applications using Mongo, ReactJS, and NodeJS with effective UI/UX as a priority",
                            "Reviewing pull requests and resolving merge conflicts, using Git for version control.",
                            "Working with internal clients to build application modules for their use case"]}
                        skills={["React.js", "MongoDB", "Node.js", "Azure Infrastructure", "Agile Methodologies", "Azure DevOps", "Git"]}
                        handleChange={handleChange}
                        expanded={expanded}
                        panel="panel-2"
                    />
                </Grid>

                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <ExperienceAccordion
                        company={"Microsoft (Contracted through ManpowerGroup)"}
                        jobTitle={"Support Engineer - Azure Databricks"}
                        dates={"09/2023 - 06/2024"}
                        logo={microsoftLogo}
                        logoalt={"The logo for Microsoft"}
                        jobDuties={["Communicating with Microsoft’s business clients to identify and rectify problems related to Apache Spark and Databricks", "Creating reproductions of customer errors in my own Databricks environment", "Doing research and troubleshooting to solve client issues", "Connecting with other internal support teams such as Storage, Power BI, and Entra ID to collaborate on cases"]}
                        skills={["Azure Databricks", "Spark", "Azure Cloud Infrastructure", "Client Communication", "Research", "Troubleshooting"]}
                        handleChange={handleChange}
                        expanded={expanded}
                        panel="panel-1"
                    />
                </Grid>

                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <ExperienceAccordion
                        company={"Department of National Defence - Canadian Army"}
                        jobTitle={"Data Analyst/Engineer"}
                        dates={"05/2021 - 07/2022"}
                        logo={armyLogo}
                        logoalt={"The logo for the Canadian Army"}
                        jobDuties={["Developing end to end data solutions using the Azure infrastructure (Data Factory, Synapse Analytics, SQL DB).",
                            "Cleaning and modeling data to prepare for analysis and visualization.",
                            "Creating dashboards in Power BI to communicate key insights from army data to non-technical users.",
                            "Working with internal clients to create datasets, data models, dashboards, and reports according to their requirements."]}
                        skills={["Power BI", "Python", "Azure Data Infrastructure", "Data Modelling", "SQL"]}
                        handleChange={handleChange}
                        expanded={expanded}
                        panel="panel-3"
                    />
                </Grid>

            </Grid>
        </Box>
    )

}