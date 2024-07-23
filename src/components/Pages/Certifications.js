import React from "react";
import PageTitle from "../Titles";
import { Grid, Button } from "@mui/material";

//import images
import azureDataSci from "../../assets/dataScienceCert.png"
import azureDataEng from "../../assets/dataEngCert.png"
// import comptiaDataPlus from "../../assets/dataPlusCert.png"
import comptiaDataX from "../../assets/DataX.png"

export default function Certifications() {

    return (
        <div id="certifications">
            <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }}>
                <Grid item xs={10} style={{ textAlign: "left" }}>
                    <PageTitle pageTitle="Certifications" />
                </Grid>
                <Grid item xs={10} marginBottom={2} style={{ textAlign: "left" }}>
                    <Button variant="outlined" href="https://www.credly.com/users/chloe-pomeroy">See All on Credly</Button>
                </Grid>

                <Grid item xs={10}>

                    <Grid container spacing={2} padding={2} >
                        <Grid item xs={6} md={4} style={{ display: 'flex', justifyContent: "left" }}>
                            <img src={azureDataSci} width="400" height="400" alt="Badge for the Azure Data Scienctist associate certification" />
                        </Grid>

                        <Grid item xs={6} md={4} style={{ display: 'flex', justifyContent: "left" }}>
                            <img src={azureDataEng} width="400" height="400" alt="Badge for the Azure Data Engineer associate certification" />
                        </Grid>

                        <Grid item xs={6} md={4} style={{ display: 'flex', justifyContent: "left" }}>
                            <img src={comptiaDataX} width="400" height="400" alt="Badge for the Comptia DataX certification" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )

}