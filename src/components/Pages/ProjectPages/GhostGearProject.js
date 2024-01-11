import { Grid, Typography, Button, Stack } from "@mui/material";
import React, { useRef, useEffect } from "react";
import PageTitle from "../../Titles";
import psdcPDF from "../../../assets/pdfs/PSDC-Final.pdf"
import { Link } from "react-router-dom";
import satImg from "../../../assets/satImg.PNG"
import predImg from "../../../assets/predImg.PNG"

export default function GhostGearProject() {
    var Marida = <Link className="nice-link" to="https://github.com/marine-debris/marine-debris.github.io">this</Link>

    return (
        <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }} id="projects">
            <Grid item xs={10} style={{ textAlign: "left" }}>
                <PageTitle pageTitle="Using AI to Detect Lost Fishing Gear in the Ocean" />
                <Grid item xs={10} marginBottom={2} style={{ textAlign: "left" }}>
                    <Button variant="outlined" href="https://canada.governmentdatachallenge.com/about/">More about PSDC</Button>
                </Grid>
            </Grid>

            <Grid container spacing={2} padding={2} style={{ justifyContent: "center", textAlign: "left" }} marginBottom={5}>
                <Grid item xs={10}>
                    <Typography color={"#808080"} marginBottom={2}>
                        The Public Service Data Challenge aims to gather ideas from public servants on how the government can improve its use of data, then build
                        teams of public servants to address some of these ideas. Each team is tasked with building a detailed pitch  of their idea, and then only
                        4 ideas  are chosen to advance to the finals for a second presentation. The winning team received funding to advance their idea.
                    </Typography>
                    <Typography marginBottom={2}>
                        My team worked on the idea to use satellite and sonar data to locate discarded fishing gear at sea. Discarded 'ghost' fishing gear presents a serious
                        threat to the health of our oceans – harming sea life, damaging delicate environments, and ultimately entering the human food chain. The
                        Government of Canada is investing in clean-up operations, but these are extremely costly: an AI-assisted platform would help target this work,
                        much improving its efficiency and effectiveness. Drawing on satellite imagery and sonar data, the tool would create heat maps of
                        ghost gear densities to help target cleanup efforts to specific areas.
                    </Typography>
                    <Typography marginBottom={2}>
                        The team for this project was made up of people in various roles at the Departments of Fisheries and Oceans, Natural Resources Canada,
                        Employment and Social Development Canada, Environment and Climate Change, and myself at National Defence.
                    </Typography>
                    <Typography marginBottom={2}>
                        To build out the use case and construct the pitch,
                        we explored costing models, identified relevant Goivernment of Canada policies and grant programs, contacted Government of Canada and
                        nonprofit groups that could make use of the technology (such as Fundy North Fishermen's Association and Petty Harbour Fisherman's Co-Operative),
                        performed a literature review to identify similar AI models, and created proof of concept models for both Satellite and sonar data.
                        After the semifinal presentations we were chosen to advance to the finals.

                        As one of the more technical members of the team, I helped with the literature review and built the proof of concept for Satellite data
                        from {Marida} github project with data from the Marine Debris Archive.
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={5}>
                            <Typography variant="h6" sx={{ textAlign: "left", marginBottom: 2 }}>
                                Satellite Image Example
                            </Typography>

                            <img src={satImg}></img>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant="h6" sx={{ textAlign: "left" }}>
                                Annotated Image
                            </Typography>
                            <Typography color={"#b0b0b0"} sx={{ textAlign: "left" }}>
                                Each colour indicates a classification - debris is shown in red
                            </Typography>
                            <img src={predImg}></img>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Typography variant="h4">
                            Final Presentation:
                        </Typography>
                        <Button variant="outlined" href="https://canada.governmentdatachallenge.com/shortlist/">
                            Finals Recording
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <iframe
                        src={psdcPDF}
                        type="application/pdf"
                        width="100%"
                        height="850px"
                    ></iframe>
                </Grid>
            </Grid>
        </Grid>
    )
}