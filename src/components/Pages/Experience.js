import React from "react";
import ExperienceAccordion from "../ExperienceAccordion";
import { Box, Grid } from "@mui/material";
import PageTitle from "../Titles";

//import images
import armyLogo from "../../assets/armyLogo.png"
import microsoftLogo from "../../assets/microsoftLogo.png"
import DNDLogo from "../../assets/CanadaFlagLogo.png"

export default function Experience({ name }) {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box sx={{ width: "100%", justifyContent: "center", marginBottom: "10px", flexGrow: 1, mb: 8 }}>
            <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }}>
                <Grid item xs={10} style={{ textAlign: "left" }}>
                    <PageTitle pageTitle="Experience" />
                </Grid>

                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <ExperienceAccordion
                        company={"Department of National Defence - Canadian Army"}
                        jobTitle={"Data Engineering Team Lead"}
                        dates={"11/2024 - Present"}
                        logo={armyLogo}
                        logoalt={"The logo for the Canadian Army"}
                        jobDuties={["Leading the Army enterprise data lake project and briefing stakeholders and leadership.",
                            "Developing ETL scripts for data transformation using AWS Glue and Pyspark.",
                            "Designing the cloud architecture in alignment with official security directives.",
                            "Creating transformed data warehouse tables and managing consumer access through API endpoints, with the goal of facilitating analytics and software development"]}
                        skills={["AWS", "Spark", "Python", "Data warehousing", "API Development", "Azure DevOps", "Git"]}
                        handleChange={handleChange}
                        expanded={expanded}
                        panel="panel-5"
                    />
                </Grid>

                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <ExperienceAccordion
                        company={"Department of National Defence - Digital Transformation Office"}
                        jobTitle={"Digital Solutions Team Lead"}
                        dates={"08/2024 - 11/2024"}
                        logo={DNDLogo}
                        logoalt={"The Canadian flag"}
                        jobDuties={["Supporting the Power BI platform for all of National Defence.",
                            "Communicating with users to fix blockers and identify desired new features.",
                            "Going through the security assessment approval process to have new features unlocked for the organization.",
                            "Supervising team members who are working on analytics products for the organization."
                        ]}
                        skills={["Power BI", "Fabric", "Troubleshooting", "Python", "Spark"]}
                        handleChange={handleChange}
                        expanded={expanded}
                        panel="panel-4"
                    />
                </Grid>

                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <ExperienceAccordion
                        company={"Department of National Defence - Canadian Army"}
                        jobTitle={"Full Stack Web Developer - Team Lead"}
                        dates={"07/2022 - 08/2024"}
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