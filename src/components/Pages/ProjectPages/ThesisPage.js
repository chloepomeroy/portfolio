import { Grid, Typography, Button, Stack } from "@mui/material";
import React, { useRef, useEffect } from "react";
import PageTitle from "../../Titles";
import thesisPDF from "../../../assets/pdfs/thesis.pdf"
import { Link } from "react-router-dom";

export default function ThesisProject() {

    return (
        <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }} id="projects" >
            <Grid item xs={10} style={{ textAlign: "left" }}>
                <PageTitle pageTitle="Analyzing Computation Time for Holographic Reconstruction" />
                <Typography variant="h6" color={"#808080"} marginBottom={2}>
                    Undergraduate Thesis
                </Typography>
            </Grid>

            <Grid container spacing={2} padding={2} style={{ justifyContent: "center", textAlign: "left" }} marginBottom={5}>
                <Grid item xs={10}>
                    <Typography>
                        The aim of this project was to analyze holographic reconstruction computation to find ways to
                        reduce computation time and get closer to real-time reconstruction. For this research I conducted
                        a literature review on Holography and holographic reconstruction algorithms and then analyzed the
                        affect of different parameters on computation times using the HoloRec3D Matlab toolbox.
                    </Typography>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <Typography variant="h6" color={"#b8a3d4"}>
                        Abstract
                    </Typography>
                    <Typography>
                        Digital Holography has many applications and uses, particularly in

                        the medical and biological fields. One of it's major drawbacks, however,
                        is the need for the holograms to be reconstructed using phase

                        and amplitude information collected at the sensor. Depending on the
                        desired resolution, the holograms can take significant amounts of time
                        to reconstruct and, for this reason, real-time analysis using holography
                        isn't currently possible. Similarly, reconstructing videos takes quite a

                        long time. In this project we analyze the affect of certain parameters
                        on computation times using the HoloRec3D MATLAB toolbox.

                        We find that decreasing the interval on z decreases the computation

                        time, changing the pixel size has seemingly no effect on the computation
                        time, and increasing the step size has a significant effect on the

                        computation time. The ability to decrease computation time for reconstructions
                        would bring digital holography even more into the medical

                        and biological field and would greatly increase the benefits of using
                        holography for things like urinalysis.
                    </Typography>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Typography variant="h4">
                            Thesis Report:
                        </Typography>
                        <Button variant="outlined" href="https://www.researchgate.net/publication/235428529_HoloRec3D_A_free_Matlab_toolbox_for_digital_holography">
                            HoloRec3D Toolbox
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <iframe
                        src={thesisPDF}
                        type="application/pdf"
                        width="100%"
                        height="850px"
                    ></iframe>
                </Grid>
            </Grid>
        </Grid>
    )
}