import React from "react";
import { Grid, Typography } from "@mui/material";
import PageTitle from "../Titles";
import { Link } from "react-router-dom";
import portrait from "../../assets/linkedin_photo.png"
import cats from "../../assets/cats2.png"

export default function About() {
    var instagram = <Link className="nice-link" to="https://www.instagram.com/loslittlebuddies/">Instagram Page</Link>
    var etsy = <Link className="nice-link" to="https://loslittlebuddies.etsy.com">Etsy Store</Link>
    var youtube = <Link className="nice-link" to="https://www.youtube.com/channel/UCBFSoJrW8wPAUmX5i-nQYqw">Youtube</Link>

    return (
        <div id="about">
            <Grid container spacing={1} padding={2} sx={{ justifyContent: "center" }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10} style={{ textAlign: "left" }}>
                    <PageTitle pageTitle="About Me" />
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={3} md={2} sx={{ justifyContent: "left" }}>
                    <img src={portrait} width="300" height="auto" sx={{ justifyContent: "left" }} />
                </Grid>

                <Grid item xs={6} sx={{ justifyContent: "left", textAlign: "left" }}>

                    <Typography marginBottom={1}>
                        Hi! I'm Chloe and I live in Ottawa, Ontario, Canada with my partner and our 2 cats, Little Rascal and Cappuccino.
                    </Typography>
                    <Typography marginBottom={1}>
                        Professionally, I'm looking for opportunities related to data science and am passionate about communicating complex insights to non-technical users, be it through presentations, reports, or visualizations.
                        I have a wide range of interests and seem to find everything interesting and exciting.
                    </Typography>
                    <Typography>
                        In my personal life, it's pretty much the same. I'm excited about learning new skills and trying new things, and I'm always picking up new hobbies. Take a look at my (long) list of them:
                    </Typography>
                    <Typography textAlign="left">
                        <ul>
                            <li>Traditional & Digital Art</li>
                            <li>Tap Dancing</li>
                            <li>Canoeing</li>
                            <li>3D Modelling and Design</li>
                            <li>Crochet, especially Amigurumi (I have an {instagram} and an {etsy} for this!)</li>
                            <li>Gaming</li>
                            <li>Learning Languages</li>
                            <li>Making {youtube} videos (about cozy gaming)</li>
                            <li>Snowshoeing</li>
                            <li>Embroidery</li>
                            <li>Reading</li>
                        </ul>
                    </Typography>
                </Grid>
                <Grid item xs={3} md={2}>
                    <img src={cats} width="400" height="auto" sx={{ justifyContent: "left" }} />
                </Grid>
            </Grid >
        </div>
    )

}