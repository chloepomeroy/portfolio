import React from "react";
import PageTitle from "../Titles";
import { Grid, Box, Button } from "@mui/material";

//import images
import azureDataSci from "../../assets/dataScienceCert.png"
import azureDataEng from "../../assets/dataEngCert.png"
import comptiaDataPlus from "../../assets/dataPlusCert.png"

export default function Certifications() {

    return (
        <Box sx={{ width: "100%", justifyContent: "center" }}>
            <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }}>
                <Grid item xs={10} style={{ textAlign: "left" }}>
                    <PageTitle pageTitle="Certifications" />
                </Grid>
                <Grid item xs={10} style={{ textAlign: "left" }}>
                    <Button variant="outlined" href="https://www.credly.com/users/chloe-pomeroy">See All on Credly</Button>
                </Grid>
            </Grid>

            <Grid container xs={10} spacing={1} padding={2} sx={{ justifyContent: "center" }}>
                <Grid item xs={6} md={4} style={{ display: 'flex', justifyContent: "center" }}>
                    <img src={azureDataSci} width="400" height="400" />
                </Grid>

                <Grid item xs={6} md={4} style={{ display: 'flex', justifyContent: "center" }}>
                    <img src={azureDataEng} width="400" height="400" />
                </Grid>

                <Grid item xs={6} md={4} style={{ display: 'flex', justifyContent: "center" }}>
                    <img src={comptiaDataPlus} width="400" height="400" />
                </Grid>
            </Grid>
        </Box>
    )

}