import { Grid, Typography, Button, Stack } from "@mui/material";
import React, { useRef, useEffect } from "react";
import PageTitle from "../../Titles";
import finetuningPDF from "../../../assets/pdfs/finetuning.pdf"
import { Link } from "react-router-dom";
import finetuningChart from "../../../assets/finetuningChart.PNG"

export default function FinetuningProject() {

    return (
        <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }} id="projects" >
            <Grid item xs={10} style={{ textAlign: "left" }}>
                <PageTitle pageTitle="Comparing Fine-tuning Methods for Large Language Models" />
            </Grid>

            <Grid container spacing={2} padding={2} style={{ justifyContent: "center", textAlign: "left" }} marginBottom={5}>
                <Grid item xs={10}>
                    <Typography color={"#808080"} marginBottom={2}>
                        This research was done in collaboration with my team members Wenzhe (Cora) Ou, Erik Nordby, and Gaofeng Sha. While we collaborated on all aspects of this project, my main responsibility was the prompt-based finetuning using null prompts.
                    </Typography>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <Typography variant="h6" color={"#b8a3d4"}>
                        Abstract
                    </Typography>
                    <Typography>
                        Numerous open source large language models have been trained and released by research institutes and organizations.

                        These models have shown great general natural language processing capabilities, making them competent for article summarizing, education, and being AI chatbots.
                        However, these models may have limited capabilities in domains which the models have not been trained on, such as summarizing healthcare data and research.

                        In order to better understand the effectiveness of different domain adaptation techniques, we investigate the effectiveness of a series of approaches including vanilla fine tuning, prompt-based
                        fine tuning, in-context learning, and context distillation.

                        By testing these techniques across three language models and two datasets, a quantitative comparison has been drawn between these four techniques. Our results are aligned closely
                        with prior work done comparing these techniques under similar circumstances.
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h6" sx={{ textAlign: "left", marginBottom: 2 }}>
                        Final Results Comparison
                    </Typography>

                    <img src={finetuningChart} width="100%"></img>

                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Typography variant="h4">
                            Final Paper:
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <iframe
                        src={finetuningPDF}
                        type="application/pdf"
                        width="100%"
                        height="850px"
                    ></iframe>
                </Grid>
            </Grid>
        </Grid>
    )
}