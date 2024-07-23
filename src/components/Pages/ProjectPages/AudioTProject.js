import { Grid, Typography, Stack } from "@mui/material";
import React from "react";
import PageTitle from "../../Titles";
import practicumPDF from "../../../assets/pdfs/Practicum_Report.pdf"

export default function AudioTProject() {

    return (
        <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }} id="projects" >
            <Grid item xs={10} style={{ textAlign: "left" }}>
                <PageTitle pageTitle="Using Audio Data to Monitor Animal Health in Poultry Farming" />
                <Typography variant="h6" color={"#808080"} marginBottom={2}>
                    In partnership with Christopher Sniffen
                </Typography>
            </Grid>

            <Grid container spacing={2} padding={2} style={{ justifyContent: "center", textAlign: "left" }} marginBottom={5}>
                <Grid item xs={10}>
                    <Typography>
                        The overall aim of the research is to be able to isolate bird vocalizations from noise such as fans and other farming machinery, with the end goal of monitoring bird health and detecting potential issues using only microphones placed around the large industrial coops.
                        As part of this research, I worked on using previously-trained Hidden Markov Model prediction values as labels for classification and experimented with using PCA to capture data from multiple microphones at once, without every flock needing to use all microphones.
                        This was a significant finding due to the fact that AudioT typically runs into microphone failure issues with at least one microphone per flock.
                    </Typography>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <Typography variant="h6" color={"#b8a3d4"}>
                        Abstract
                    </Typography>
                    <Typography>
                        Large-scale poultry farms often have difficulty manually monitoring the health of their livestock due to the volume of animals.

                        AudioT attempts to address this by evaluating chicken health in near real-time from audio data collected in the poultry houses. It is hoped that by quickly detecting changes in chicken behavior, AudioT can help farmers optimize their operations and revenue while improving the treatment of the poultry themselves.

                        As one step towards this goal, AudioT asked the team to build on prior work from others to develop a model that can accurately discern between night and day using AudioT's proprietary dataset. The team explored, labelled, and modeled a large subset of the AudioT data using several different approaches, substantially advancing AudioT's ability to model night and day from raw audio files and setting new performance benchmarks for this classification task.

                    </Typography>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Typography variant="h4">
                            Final Report:
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <iframe
                        src={practicumPDF}
                        type="application/pdf"
                        width="100%"
                        height="850px"
                        title="Practicum Report"
                    ></iframe>
                </Grid>
            </Grid>
        </Grid>
    )
}