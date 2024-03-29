import * as React from 'react';
import { Grid } from '@mui/material';
import ProjectCard from '../ProjectCard';
import PageTitle from '../Titles';
import { Element } from 'react-scroll';

//Image imports
import rentingImage from "../../assets/rentingHelperImage.PNG"
import psdcImage from "../../assets/psdc.PNG"
import petMatchingImage from "../../assets/petMatching.PNG"
import cozySteamImage from "../../assets/steamCozy.PNG"
import thesisImage from "../../assets/thesisImage.PNG"

export default function Projects() {

  return (
    <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }} id="projects">
      <Grid item xs={10} style={{ textAlign: "left" }}>
        <PageTitle pageTitle="Projects" />
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={2} padding={2} marginBottom={10}>

          <Grid item xs={6} md={4} style={{ display: 'flex' }}>
            <ProjectCard
              image={rentingImage}
              imageTitle="NYC Renting Helper Image"
              cardTitle="New York City Rental Prediction Tool"
              cardDescription="A tool intended for renters to explore typical rental prices in New York City neighbourhoods based on amenities and features required, to help them decide which neighbourhoods most appeal to their needs."
              technologiesUsed={["D3.js", "Python", "Regression", "JavaScript"]}
              moreLink="/renting"
              projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
              projectType={["Web Development", "Data Science"]} />
          </Grid>

          <Grid item xs={6} md={4} style={{ display: 'flex' }}>
            <ProjectCard
              image={psdcImage}
              imageTitle="Using AI to Detect Lost Gear in the Ocean"
              cardSubTitle="Canadian Public Service Data Challenge Finalist"
              cardTitle="Using AI to Detect Lost Gear in the Ocean"
              cardDescription="An interdepartmental project where I worked with public servants from varying departments to build out the problem space surrounding this issue and put together a presentation to compete for funding."
              technologiesUsed={["Literature Review", "Pitching", "Transfer Learning"]}
              moreLink="/ghostGear"
              projectLink=""
              projectType={["Data Science"]} />
          </Grid>

          <Grid item xs={6} md={4} style={{ display: 'flex' }}>
            <ProjectCard
              image={petMatchingImage}
              imageTitle="Matching Lost Pets"
              cardTitle="Exploring Facial Recognition in Matching Lost Pets"
              cardDescription="To address the problem of matching lost pet owners to found strays, I investigated the efficacy of different image recognition models in matching
          lost pets, and made observations whether certain species of pets are more identifiable with this approach."
              technologiesUsed={["Computer Vision", "YOLO", "FisherFaces", "Eigenfaces", "Python"]}
              moreLink="/lostPets"
              projectLink=""
              projectType={["Data Science"]} />
          </Grid>

          <Grid item xs={6} md={4} style={{ display: 'flex' }}>
            <ProjectCard
              image={cozySteamImage}
              imageTitle="Cozy Steam Games"
              cardTitle="Classifying Cozy Steam Games using Binary Prediction - in Progress"
              cardDescription="I'm working on building a binary classification model to identify which Steam games are 'cozy'. The end goal of this project would be to build a model that can predict a 'coziness level' for every Steam game."
              technologiesUsed={["Classification", "Python", "Class Imbalance"]}
              moreLink="/cozyGames"
              projectLink=""
              projectType={["Data Science"]} />
          </Grid>

          <Grid item xs={6} md={4} style={{ display: 'flex' }}>
            <ProjectCard
              image={thesisImage}
              imageTitle="Thesis"
              cardTitle="Analyzing Computation Time for Holographic Reconstruction (Undergrad Thesis)"
              cardDescription="The aim of this project was to analyze holographic reconstruction computation to find ways to reduce computation time and get closer to real-time reconstruction."
              technologiesUsed={["MATLAB", "Literature Review", "Research"]}
              moreLink="/thesis"
              projectLink=""
              projectType={["Physics"]} />
          </Grid>

          {/* <Grid item xs={6} md={4} style={{ display: 'flex' }}>
            <ProjectCard
              image={rentingImage}
              imageTitle="OWL Network"
              cardTitle="Overwatch League Players Network Diagram"
              cardDescription="An application intended for book clubs to use to keep track of members, previously read books, upcoming meetings, books suggested by club members, and club member voting to determine the next book."
              technologiesUsed={["React", "Javascript"]}
              moreLink="/owlNetwork"
              projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
              projectType={["Web Development"]} />
          </Grid> */}

        </Grid>
      </Grid>
    </Grid>
  )
}