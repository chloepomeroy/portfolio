import { Grid, Typography, Button } from "@mui/material";
import React from "react";
import PageTitle from "../../Titles";
import AgenticFlow from IR_agentic.png
import Services from IR_services.png

export default function IncidentResponseProject() {

    return (
        <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }} id="projects">
            <Grid item xs={10} style={{ textAlign: "left" }}>
                <PageTitle pageTitle="AI-Powered Cybersecurity Incident Response Platform (NATO TIDE Hackathon 2026)" />
                <Grid item xs={5} marginBottom={2} style={{ textAlign: "left" }}>
                    <Button variant="outlined" href="https://www.act.nato.int/article/tide-hackathon-2026/">Official NATO Article</Button>
                </Grid>
            </Grid>

            <Grid container spacing={2} padding={2} style={{ justifyContent: "center", textAlign: "left" }} marginBottom={5}>
                <Grid item xs={10}>
                    <Typography color={"#808080"} marginBottom={2}>
                        This project was built as part of a Canadian Army Team with Ahmad Kamar, Chase Scott, and Nathaniel Tardif for the NATO TIDE Hackathon 2026.
                    </Typography>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <Typography marginBottom={2}>
                        The main problems we were tasked with addressing were:
                        <ul>
                        <li>Real-time collaboration so that Security Analysts can work together respond to incidents</li>
                        <li>Volume of event and log data that analysts needed to manually read through</li>
                        <li>Prioritization and assignment of incidents to the appropriate analysts</li>
                        </ul>
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h6" sx={{ textAlign: "left", marginBottom: 2 }}>
                        Agentic Workflow:
                    </Typography>
                    
                    <img src={AgenticFlow} width="100%"></img>                    
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <Typography marginBottom={2}>
                        The platform we built ingests events from MISP, Microsoft Sentinel, and the Cyber Emergency Response Team of Iceland's (CERT-IS) 
                        web portal where citizens can report threats. These data sources are connected through a plugin-based orchestrator that allows for 
                        easily adding new sources. The pipeline runs three source enrichment nodes in parallel, which enriches incident data with correlated 
                        data from all enabled daata sources. After triage, analyst assignment and remediation recommendation run in parallel as well. The 
                        assignment node takes into account the subject matter of the incident as well as the skillset and availability of analysts to 
                        accurately assign incidents, while the remediation node comes up with concrete steps that can be taken and automatically performed 
                        to address the incident.
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h6" sx={{ textAlign: "left", marginBottom: 2 }}>
                        Services:
                    </Typography>
                    
                    <img src={Services} width="100%"></img>
                    <Typography>
                        <ul>
                            <li>Feed Orchestrator — plugin system, SQLite state, routes events to the pipeline</li>
                            <li>Agents Service — hosts the LangGraph pipeline, owns all Neo4j reads and writes</li>
                            <li>Core API — unified gateway for AI chat, incident/user CRUD via MySQL, Neo4j graph proxy</li>
                            <li>Socket Service — per-incident chat rooms with Socket.IO for real-time collaboration</li>
                            <li>Frontend — React + MUI dashboard with plugin management, incident list, and the @Sentry AI chat assistant</li>
                        </ul>
                    </Typography>                
                </Grid>
            </Grid>
        </Grid>
    )
}