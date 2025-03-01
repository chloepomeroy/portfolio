import React from "react";
import PageTitle from "../Titles";
import { Grid, Button, Box } from "@mui/material";

//import images
import azureDataSci from "../../assets/dataScienceCert.png"
import azureDataEng from "../../assets/dataEngCert.png"
// import comptiaDataPlus from "../../assets/dataPlusCert.png"
import comptiaDataX from "../../assets/DataX.png"

export default function Certifications() {

    return (
        <div id="certifications">
            <Box sx={{ width: "100%", justifyContent: "center", flexGrow: 1, mb: 8 }}>
            <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }}>
                <Grid item xs={12} style={{ textAlign: "left" }}>
                    <PageTitle pageTitle="Certifications" />
                </Grid>
                <Grid item xs={10} marginBottom={2} style={{ textAlign: "left" }}>
                    <Button variant="outlined" href="https://www.credly.com/users/chloe-pomeroy">See All on Credly</Button>
                </Grid>

                <Grid item xs={10}>

                    <Grid container spacing={2} padding={2} >
                        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: "left" }}>
                            <Box
                            component="img"
                            src={azureDataSci}
                            sx={{
                                width: { xs: 250, lg: 400 },
                                height: { xs: 250, lg: 400 }
                            }}
                            alt="Badge for the Azure Data Scientist associate certification"
                            />  
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: "left" }}>
                            <Box
                            component="img"
                            src={azureDataEng}
                            sx={{
                                width: { xs: 250, lg: 400 },
                                height: { xs: 250, lg: 400 }
                            }}
                            alt="Badge for the Azure Data Engineer associate certification"
                            /> 
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: "left" }}>
                            <Box
                            component="img"
                            src={comptiaDataX}
                            sx={{
                                width: { xs: 250, lg: 400 },
                                height: { xs: 250, lg: 400 }
                            }}
                            alt="Badge for the Comptia DataX certification"
                            /> 
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </Box>
        </div>
    )

}