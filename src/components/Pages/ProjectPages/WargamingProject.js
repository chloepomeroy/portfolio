import { Grid, Typography, Button, Stack } from "@mui/material";
import React, { useRef, useEffect } from "react";
import PageTitle from "../../Titles";
// import psdcPDF from "../../../assets/pdfs/lostPet.pdf"
// import { Link } from "react-router-dom";
// import petResults from "../../../assets/petResults.PNG"
// import petYolo from "../../../assets/petYolo.PNG"

export default function WargamingProject() {

    return (
        <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }} id="projects">
            <Grid item xs={10} style={{ textAlign: "left" }}>
                <PageTitle pageTitle="LLM-Powered Wargaming Application (NATO TIDE Hackathon 2024)" />
            </Grid>

            <Grid container spacing={2} padding={2} style={{ justifyContent: "center", textAlign: "left" }} marginBottom={5}>
                <Grid item xs={10}>
                    <Typography color={"#808080"} marginBottom={2}>
                        The application was created in collaboration with my team members from the Canadian Army: Aaron Luhning, Emmitt Luhning, and
                        Lauren Lussier.
                    </Typography>
                    <Typography marginBottom={2}>
                        As part of the Canadian Army's team for the 2024 NATO TIDE Hackathon, we competed in the LLM-Powered Wargaming category.
                        We were able to make it to the final round and come in third place in the category out of 18 teams.
                    </Typography>
                    <Typography marginBottom={2}>
                        To create this product, we used Langchain, GPT 4, and a React/Javascript frontend. The LLM was incorporated in multiple wargaming steps,
                        while continuing to focus human decisions since we felt that was an  important element in wargaming exercises.
                    </Typography>
                    <Typography marginBottom={2}>
                        <Typography variant="h6" color={"#b8a3d4"}>
                            Areas the LLM was incorporated:
                        </Typography>
                        <ul>
                            <li>Creating the wargame scenario</li>
                            <li>Advising players during their turn</li>
                            <li>Generating injects</li>
                            <li>Recommended winner</li>
                        </ul>
                    </Typography>
                    <Typography marginBottom={2}>
                        <Typography variant="h6" color={"#b8a3d4"}>
                            Creating the scenario
                        </Typography>
                        <Typography marginBottom={2}>
                            Generating wargaming scenarios can be time-consuming and labour-intensive, since they require a lot of detail. To help facilitate this,
                            we created a form where the game runner can enter some essential information about the game they want to create, including the nations
                            involved, their resources, and the objectives. The LLM then takes this information along with our prompt and generates a detailed wargame scenario.
                        </Typography>
                    </Typography>
                    <Typography marginBottom={2}>
                        <Typography variant="h6" color={"#b8a3d4"}>
                            Player Advisor
                        </Typography>
                        <Typography marginBottom={2}>
                            During their turn, players can ask questions to our LLM-powered advisor by clicking on the icon in the bottom right of the screen.
                            The advisor can give suggestions for what moves the player can make or what outcomes could happen. Ultimately, the player makes the
                            actual decision on what moves they want to do.
                        </Typography>
                    </Typography>
                    <Typography marginBottom={2}>
                        <Typography variant="h6" color={"#b8a3d4"}>
                            Generating Injects
                        </Typography>
                        <Typography marginBottom={2}>
                            In a wargame, new mini scenarios are created between each turn based on the players actions to determine both the consequences and
                            add any random events that could happen in this scenario. After both players submit their turn actions and the adjudicator submits
                            their decision, these are passed to the LLM along with the original scenario and a prompt to generate this inject. The number of
                            injects (number of turns) of the game is specified when creating the initial scenario.
                        </Typography>
                    </Typography>
                    <Typography marginBottom={2}>
                        <Typography variant="h6" color={"#b8a3d4"}>
                            Recommended Winner
                        </Typography>
                        <Typography marginBottom={2}>
                            After each player submits their actions for a turn, the adjudicator (typically the person running the game) is shown the recommended
                            winner and explanation provided by the LLM based on the players actions, the original scenario and objectives, and any injects for
                            that round. To make sure we're still centering human decisions, the adjudicator can easily override the recommended LLM result, but
                            they have the additional recommendation and explanation to help guide their decision.
                        </Typography>
                    </Typography>
                </Grid>

                {/* <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Typography variant="h4">
                            Final Report:
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <iframe
                        src={psdcPDF}
                        type="application/pdf"
                        width="100%"
                        height="850px"
                    ></iframe>
                </Grid> */}
            </Grid>
        </Grid>
    )
}