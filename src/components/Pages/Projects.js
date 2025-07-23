import * as React from 'react';
import { Grid } from '@mui/material';
import ProjectCard from '../ProjectCard';
import PageTitle from '../Titles';

//Image imports
import rentingImage from "../../assets/rentingHelperImage.PNG"
import psdcImage from "../../assets/psdc.PNG"
import petMatchingImage from "../../assets/petMatching.PNG"
import thesisImage from "../../assets/thesisImage.PNG"
import wargamingImage from "../../assets/MapleReady.jpg"
// import wrmthImage from "../../assets/wrmth.png"
import qclefImage from "../../assets/qclef.PNG"
import audiotImage from "../../assets/audiot.png"
import finetuningImage from "../../assets/finetuning.png"

export default function Projects() {

  return (
    <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }} id="projects">
      <Grid item xs={10} style={{ textAlign: "left" }}>
        <PageTitle pageTitle="Projects" />
      </Grid>
      <Grid item xs= {12} md={10}>
        <Grid container spacing={2} padding={2} alignItems="stretch" marginBottom={10}>
        <Grid item xs={12} sm={6} lg={4} style={{ display: 'flex' }}>
            <ProjectCard
              image={qclefImage}
              imageTitle="Matching Lost Pets"
              cardTitle="Quantum Annealing for Machine Learning: Applications"
              cardSubTitle="Accepted to Quantum CLEF 2025"
              cardDescription="As part of the Quantum CLEF 2025 Lab at the CLEF conference, this project investigated the use of quantum vs. classical 
                    annealing techniques for tackling instance selection, feature selection, and clustering."
              technologiesUsed={["Quantum Computing", "Instance Selection", "Research"]}
              moreLink="/qclef2025"
              projectLink="https://arxiv.org/abs/2507.15063"
              projectType={["Data Science"]} />
          </Grid>

          <Grid item xs={12} sm={6} lg={4} style={{ display: 'flex' }}>
            <ProjectCard
              image={audiotImage}
              imageTitle="AudioT"
              cardTitle="Using Audio Data to Monitor Bird Health in Poultry Farming"
              cardSubTitle="In Partnership with audiot.ai"
              cardDescription="Experimenting with various modelling and feature engineering approaches to identify states and classify time periods based on a large volume of audio files recorded in industrial chicken coops."
              technologiesUsed={["HMMs", "Audio Processing", "Classification"]}
              moreLink="/audiot-hmm"
              projectLink=""
              projectType={["Data Science"]} />
          </Grid>

          <Grid item xs={12} sm={6} lg={4} style={{ display: 'flex' }}>
            <ProjectCard
              image={wargamingImage}
              imageTitle="Wargaming"
              cardTitle="Developing an LLM-powered Wargaming Application"
              cardSubTitle="NATO Hackathon 2024 Finalist"
              cardDescription="A proof of concept wargaming application that leverages Langchain and GPT-4 to aid in the development and adjudication of wargaming simulations. Created as part of the 2024 NATO Hackathon in Amsterdam."
              technologiesUsed={["Javascript", "Langchain", "GPT-4", "LLMs"]}
              moreLink="/nato-wargaming"
              demoLink="/nato-wargaming#demo"
              projectType={["Web Development", "Data Science"]} />
          </Grid>

          <Grid item xs={12} sm={6} lg={4} style={{ display: 'flex' }}>
            <ProjectCard
              image={finetuningImage}
              imageTitle="LLM Finetuning"
              cardTitle="A Survey and Comparison of LLM Fine Tuning Methods"
              cardSubTitle=""
              cardDescription="We investigate the effectiveness of a series of approaches including vanilla fine tuning, prompt-based fine tuning, in-context learning, and context distillation, and compare these using the GLUE RTE benchmark."
              technologiesUsed={["LLMs", "Research", "Literature Review"]}
              moreLink="/llm-finetuning"
              projectLink=""
              projectType={["Data Science"]} />
          </Grid>

          <Grid item xs={12} sm={6} lg={4} style={{ display: 'flex' }}>
            <ProjectCard
              image={rentingImage}
              imageTitle="NYC Renting Helper Image"
              cardTitle="New York City Rental Prediction Model and Tool"
              cardSubTitle=""
              cardDescription="A tool intended for renters to explore typical rental prices in New York City neighbourhoods based on amenities and features required, to help them decide which neighbourhoods most appeal to their needs."
              technologiesUsed={["D3.js", "Python", "Regression", "JavaScript"]}
              moreLink="/renting"
              projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
              projectType={["Web Development", "Data Science"]} />
          </Grid>

          <Grid item xs={12} sm={6} lg={4} style={{ display: 'flex' }}>
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

          <Grid item xs={12} sm={6} lg={4} style={{ display: 'flex' }}>
            <ProjectCard
              image={petMatchingImage}
              imageTitle="Matching Lost Pets"
              cardTitle="Exploring Facial Recognition in Matching Lost Pets"
              cardSubTitle=""
              cardDescription="To address the problem of matching lost pet owners to found strays, I investigated the efficacy of facial recognition models in matching
          pets, and made observations whether certain species are more identifiable with this approach."
              technologiesUsed={["Computer Vision", "YOLO", "Eigenfaces", "Python"]}
              moreLink="/lostPets"
              projectLink=""
              projectType={["Data Science"]} />
          </Grid>

          <Grid item xs={12} sm={6} lg={4} style={{ display: 'flex' }}>
            <ProjectCard
              image={thesisImage}
              imageTitle="Thesis"
              cardTitle="Analyzing Computation Time for Holographic Reconstruction"
              cardSubTitle="Undergrad Thesis"
              cardDescription="The aim of this project was to analyze holographic reconstruction computation to find ways to reduce computation time and approach real-time reconstruction, with the goal to use this for urinalysis and studying algae blooms."
              technologiesUsed={["MATLAB", "Literature Review", "Research"]}
              moreLink="/thesis"
              projectLink=""
              projectType={["Physics"]} />
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  )
}