import * as React from 'react';
import { Grid } from '@mui/material';
import ProjectCard from '../ProjectCard';
import PageTitle from '../Titles';

//Image imports
import rentingImage from "../../assets/rentingHelperImage.PNG"
import psdcImage from "../../assets/psdc.PNG"
import petMatchingImage from "../../assets/petMatching.PNG"
import cozySteamImage from "../../assets/steamCozy.PNG"

export default function Projects(props) {
  console.log(props.location)
  return (
    <Grid container spacing={2} padding={2}>

      <Grid item xs={10} style={{ textAlign: "left" }}>
        <PageTitle pageTitle="Projects" />
      </Grid>


      <Grid item xs={6} md={4} style={{ display: 'flex' }}>
        <ProjectCard
          image={rentingImage}
          imageTitle="NYC Renting Helper Image"
          cardTitle="New York City Rental Prediction Tool"
          cardDescription="A tool intended for renters to explore typical rental prices in New York City neighbourhoods based on amenities and features required, to help them decide which neighbourhoods most appeal to their needs."
          technologiesUsed={["D3.js", "Python", "Regression"]}
          codeLink=""
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
          codeLink=""
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
          codeLink=""
          projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
          projectType={["Data Science"]} />
      </Grid>

      <Grid item xs={6} md={4} style={{ display: 'flex' }}>
        <ProjectCard
          image={cozySteamImage}
          imageTitle="Cozy Steam Games"
          cardTitle="Cozy Steam Games Binary Class Prediction - in Progress"
          cardDescription="I'm working on building a binary classification model to identify which Steam games are 'cozy'. The end goal of this project would be to build a model that can predict a 'coziness level' for every Steam game."
          technologiesUsed={["Classification", "Python", "Class Imbalance"]}
          codeLink=""
          projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
          projectType={["Data Science"]} />
      </Grid>

      <Grid item xs={6} md={4} style={{ display: 'flex' }}>
        <ProjectCard
          image={rentingImage}
          imageTitle="Book Club App Image"
          cardTitle="Book Club Management Application"
          cardDescription="An application intended for book clubs to use to keep track of members, previously read books, upcoming meetings, books suggested by club members, and club member voting to determine the next book."
          technologiesUsed={["React", "Javascript"]}
          codeLink=""
          projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
          projectType={["Web Development"]} />
      </Grid>

    </Grid>
  )
}