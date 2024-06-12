import { Grid, Typography, Button, Stack } from "@mui/material";
import React, { useRef, useEffect } from "react";
import PageTitle from "../../Titles";
import psdcPDF from "../../../assets/pdfs/lostPet.pdf"
import { Link } from "react-router-dom";
import petResults from "../../../assets/petResults.PNG"
import petYolo from "../../../assets/petYolo.PNG"

export default function WargamingProject() {

    return (
        <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }} id="projects">
            <Grid item xs={10} style={{ textAlign: "left" }}>
                <PageTitle pageTitle="LLM-Powered Wargaming Application (NATO TIDE Hackathon 2024)" />
            </Grid>

            <Grid container spacing={2} padding={2} style={{ justifyContent: "center", textAlign: "left" }} marginBottom={5}>
                <Grid item xs={10}>
                    <Typography marginBottom={2}>
                        After joining some local community groups on social media, I noticed that a significant
                        proportion of posts revolve around lost pets. Individuals frequently share pictures of their missing pets,
                        hoping for any leads, while others who spot stray animals share pictures with accompanying location
                        details, aiming to reunite them with their owners. I see many people making these kinds of posts,
                        but the success rate seems to be rather low. The sheer volume of these posts makes it easy for pet
                        owners to overlook some of them, and individuals who come across a lost pet are less likely to notice
                        the corresponding owner’s post if they are not actively seeking it.
                    </Typography>
                    <Typography marginBottom={2}>
                        To address this problem, I investigated the efficacy of different image recognition models in matching
                        lost pets, and made observations whether certain species of pets are more identifiable with this ap-
                        proach. The end goal is to create a model that can analyze a pet picture and provide the top N closest
                        matches from the database. Since the goal is to look for similar images, I believe that I could leverage
                        facial recognition models for this purpose. By testing different facial recognition methods, I hope to
                        create an accurate model that could help people find their lost pets more easily.
                    </Typography>
                    <Typography>
                        <Typography variant="h6" color={"#b8a3d4"}>
                            Models Tested:
                        </Typography>
                        <ul>
                            <li>YOLOv8</li>
                            <li>Eigenfaces</li>
                            <li>Fisherfaces</li>
                        </ul>
                    </Typography>
                    <Typography>
                        <Typography variant="h6" color={"#b8a3d4"}>
                            Data Used:
                        </Typography>
                        <ul>
                            <li>The Oxford-IIIT Pet Dataset, which contains 37 categories of dog/cat breeds</li>
                            <li>Images of my own cats, which aren't purebred</li>
                            <li>Images from local animal shelters, which are likely also not purebred</li>
                        </ul>
                    </Typography>
                    <Typography>
                        <Typography variant="h6" color={"#b8a3d4"}>
                            Limitations:
                        </Typography>
                        <ul>
                            <li>For Eigenfaces and Fisherfaces, I had to crop the images  by hand, so I couldn't use a big dataset.
                                To extend this project, I could use a separate model to detect the pet's faces and crop the images</li>
                            <li>Images taken of strays outdoors may be from a greater distance or poorer angle than my example images,
                                so this likely needs a lot more work to be useful for my intended use case</li>
                        </ul>
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={5}>
                            <Typography variant="h6" sx={{ textAlign: "left", marginBottom: 2 }}>
                                Model Results
                            </Typography>

                            <img src={petResults}></img>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant="h6" sx={{ textAlign: "left" }}>
                                Example Results from YOLO
                            </Typography>
                            <img src={petYolo}></img>
                        </Grid>
                    </Grid>
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