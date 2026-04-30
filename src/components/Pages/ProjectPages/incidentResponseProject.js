import { Grid, Typography, Button } from "@mui/material";
import React from "react";
import PageTitle from "../../Titles";

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
                    <Typography marginBottom={2}>
                        The main problems we were tasked with addressing were:
                        <ul>
                        <li>Difficulty of Security Analysts to work on responding to incidents collaboratively</li>
                        <li>Volume of event and log data that analysts needed to manually read through</li>
                        <li>Prioritization and assignment of incidents to the appropriate analysts</li>
                        </ul>
                    </Typography>
                    <Typography marginBottom={2}>
                        The platform we built ingests events from MISP, Microsoft Sentinel, and the Cyber Emergency Response Team of Iceland's (CERT-IS) 
                        web portal where citizens can report threats. These data sources are connected through a plugin-based orchestrator that allows for easily adding new sources. The pipeline runs three source enrichment nodes in 
                        parallel, each either creating new graph nodes in Neo4j (if the event came from that source) or doing a read-only lookup to find 
                        cross-source matches. After triage, analyst assignment and remediation recommendation run in parallel as well — both using Azure 
                        OpenAI with structured output and algorithmic fallbacks in case the LLM is unavailable.
                    </Typography>
                    <Typography marginBottom={2}>
                        One thing I was deliberate about was keeping humans in the loop — the system produces recommendations with confidence scores and 
                        reasoning, but doesn't act on its own. The remediation layer has a mock execution system for 15 action types (things like blocking 
                        an IP, isolating a host, or disabling an account) where each executor is a stub that's easy to replace with a real API call.
                    </Typography>
                    <Typography>
                        <Typography variant="h6" color={"#b8a3d4"}>Pipeline:</Typography>
                        <ul>
                            <li>LangGraph StateGraph with two parallel fan-out stages using the Send() API</li>
                            <li>Stage 1 (parallel): MISP node, Sentinel node, CERT-IS node — each runs concurrently and cross-references the others via Neo4j</li>
                            <li>Triage: weighted confidence aggregation (primary source 0.6, each secondary 0.2), threshold ≥ 0.45 → incident</li>
                            <li>Stage 2 (parallel): analyst matching and remediation recommendation — both use Azure OpenAI gpt-4.1 with Pydantic structured output</li>
                        </ul>
                    </Typography>
                    <Typography>
                        <Typography variant="h6" color={"#b8a3d4"}>Services:</Typography>
                        <ul>
                            <li>Feed Orchestrator — plugin system, SHA-256 dedup, SQLite state, routes events to the pipeline</li>
                            <li>Agents Service — hosts the LangGraph pipeline, owns all Neo4j reads and writes</li>
                            <li>Core API — unified gateway for AI chat (SSE streaming), incident/user CRUD via MySQL, Neo4j graph proxy</li>
                            <li>Socket Service — per-incident chat rooms with Socket.IO (Node.js)</li>
                            <li>Frontend — React + MUI dashboard with plugin management, incident list, and the @Sentry AI chat assistant</li>
                        </ul>
                    </Typography>
                    <Typography>
                        <Typography variant="h6" color={"#b8a3d4"}>Tech Stack:</Typography>
                        <ul>
                            <li>Python 3.11, FastAPI, LangGraph, Azure OpenAI (gpt-4.1), Pydantic</li>
                            <li>Neo4j 5.13 (async driver), MySQL 8, Redis 7</li>
                            <li>React 18, TypeScript, Vite, MUI, Zustand, Socket.IO</li>
                            <li>Docker Compose, Kubernetes with Helm charts, Azure AKS, Azure Container Registry</li>
                        </ul>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}