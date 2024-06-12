import { Grid, Typography, Button, Stack } from "@mui/material";
import React, { useRef, useEffect } from "react";
import PageTitle from "../../Titles";
import midtermPDF from "../../../assets/pdfs/AudioT_ADV1_midterm_report.pdf"
import { Link } from "react-router-dom";

export default function AudioTProject() {

    return (
        <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }} id="projects" >
            <Grid item xs={10} style={{ textAlign: "left" }}>
                <PageTitle pageTitle="Using Audio Data to Monitor Animal Health in Poultry Farming" />
                <Typography variant="h6" color={"#808080"} marginBottom={2}>
                    In progress, in partnership with Chrristopher Sniffen
                </Typography>
            </Grid>

            <Grid container spacing={2} padding={2} style={{ justifyContent: "center", textAlign: "left" }} marginBottom={5}>
                <Grid item xs={10}>
                    <Typography>
                        The overall aim of the research is to be able to isolate bird vocalizations from noise such as fans and other farming machinery, with the end goal of monitoring bird health and detecting potential issues using only microphones places around the large industrial coops.
                        As part of this research, I am working on experimenting with various Hidden Markov Models to predict states of hig noise using various types of models and feature engineering methods.
                    </Typography>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <iframe
                        src={midtermPDF}
                        type="application/pdf"
                        width="100%"
                        height="850px"
                    ></iframe>
                </Grid>
            </Grid>
        </Grid>
    )
}