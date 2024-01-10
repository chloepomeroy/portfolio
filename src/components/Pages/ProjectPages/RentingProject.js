import { Grid, Typography, Button } from "@mui/material";
import React, { useRef, useEffect } from "react";
import PageTitle from "../../Titles";
import rentingPDF from "../../../assets/pdfs/cse6242_final_report.pdf"

export default function RentingProject() {

    return (
        <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }} id="projects">
            <Grid item xs={10} style={{ textAlign: "left" }}>
                <PageTitle pageTitle="New York City Rental Prediction Tool" />
                <Grid item xs={10} marginBottom={2} style={{ textAlign: "left" }}>
                    <Button variant="outlined" href="https://main--peaceful-queijadas-9871d6.netlify.app/">View Project</Button>
                </Grid>
            </Grid>

            <Grid container spacing={2} padding={2} style={{ justifyContent: "center", textAlign: "left" }}>
                <Grid item xs={10}>
                    <Typography color={"#808080"} marginBottom={2}>
                        The tool was created in collaboration with my team members Nala Sadeeshkumar, Pengcheng (Will) Chen, and Sherjeel Arif. While we collaborated on all aspects of this project and all contributed our insights, my main responsibility was creating the visualization and writing the D3.js code.
                    </Typography>
                    <Typography marginBottom={2}>
                        We created a rental helper tool that takes a variety of features and returns
                        a prediction about fair rental prices for different types of
                        units, estimated increase or decrease of rental prices per
                        neighborhood and a summary about the area. The application is
                        designed to provide renters with information about different neighborhoods in a new city, including predicted
                        rental prices and proximity to amenities, displayed on a
                        map. This is different from rental listing sites like Zillow, as the focus is on helping users identify their ideal
                        areas and neighborhoods based on their needs, which
                        they can then use on rental listing sites to find the perfect
                        rental property. The goal is to serve people who are look-
                        ing to rent without a lot of knowledge about the area.

                        The model carries the risk of inaccurate price forecasts due to the volatility of
                        the rental market and the inability to curate a diverse
                        dataset. However, the payoff is significant, as the project
                        will help individuals and families make informed rental
                        decisions, save money, and find suitable rentals based on
                        their geographic needs.
                    </Typography>

                    <Typography>
                        A couple notes about this project:
                        <ul>
                            <li>Due to Georgia Tech's Honour Code and the possibility of future students finding this project, I am not permitted to make the codebase public. If you're interested in seeing it, please contact me and I can share it with you privately (provided you're not enrolled in the Georgia Tech program).</li>
                            <li>This project was completed in April 2022 and the data comes from February/March 2022. It's likely that the predicted rental prices and neighbourhood demographics don't reflect current values.</li>
                            <li>To create a project scope, we decided to focus solely on New York City as a proof of concept, but ideally this would exist for all major cities with a large amount of neighbourhoods.</li>
                        </ul>
                    </Typography>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <Typography variant="h4">
                        Full Project Report
                    </Typography>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <iframe
                        src={rentingPDF}
                        type="application/pdf"
                        width="100%"
                        height="850px"
                    ></iframe>
                </Grid>
            </Grid>
        </Grid>
    )
}