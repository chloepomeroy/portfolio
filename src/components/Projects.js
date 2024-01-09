import * as React from 'react';
import { Grid, Box } from '@mui/material';
import ProjectCard from './ProjectCard';
import rentingImage from "../assets/rentingHelperImage.PNG"

export default function Projects() {
  return (
    <Grid container spacing={2} padding={2}>

      <Grid item xs={6} md={4}>
        <ProjectCard
          image={rentingImage}
          imageTitle="NYC Renting Helper Image"
          cardTitle="NYC Renting Helper"
          cardDescription="A tool intended for renters to explore typical rental prices in New York City neighbourhoods based on amenities and features required"
          technologiesUsed={["D3.js", "Python", "Regression"]}
          codeLink=""
          projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
          projectType={["Web Development", "Data Science"]} />
      </Grid>

      <Grid item xs={6} md={4}>
        <ProjectCard
          image={rentingImage}
          imageTitle="NYC Renting Helper Image"
          cardTitle="NYC Renting Helper"
          cardDescription="A tool intended for renters to explore typical rental prices in New York City neighbourhoods based on amenities and features required"
          technologiesUsed={["D3.js", "Python", "Regression"]}
          codeLink=""
          projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
          projectType={["Web Development", "Data Science"]} />
      </Grid>

      <Grid item xs={6} md={4}>
        <ProjectCard
          image={rentingImage}
          imageTitle="NYC Renting Helper Image"
          cardTitle="NYC Renting Helper"
          cardDescription="A tool intended for renters to explore typical rental prices in New York City neighbourhoods based on amenities and features required"
          technologiesUsed={["D3.js", "Python", "Regression"]}
          codeLink=""
          projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
          projectType={["Web Development", "Data Science"]} />
      </Grid>

      <Grid item xs={6} md={4}>
        <ProjectCard
          image={rentingImage}
          imageTitle="NYC Renting Helper Image"
          cardTitle="NYC Renting Helper"
          cardDescription="A tool intended for renters to explore typical rental prices in New York City neighbourhoods based on amenities and features required"
          technologiesUsed={["D3.js", "Python", "Regression"]}
          codeLink=""
          projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
          projectType={["Web Development", "Data Science"]} />
      </Grid>

      <Grid item xs={6} md={4}>
        <ProjectCard
          image={rentingImage}
          imageTitle="NYC Renting Helper Image"
          cardTitle="NYC Renting Helper"
          cardDescription="A tool intended for renters to explore typical rental prices in New York City neighbourhoods based on amenities and features required."
          technologiesUsed={["D3.js", "Python", "Regression"]}
          codeLink=""
          projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
          projectType={["Web Development", "Data Science"]} />
      </Grid>

      <Grid item xs={6} md={4}>
        <ProjectCard
          image={rentingImage}
          imageTitle="NYC Renting Helper Image"
          cardTitle="NYC Renting Helper"
          cardDescription="A tool intended for renters to explore typical rental prices in New York City neighbourhoods based on amenities and features required"
          technologiesUsed={["D3.js", "Python", "Regression"]}
          codeLink=""
          projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
          projectType={["Web Development", "Data Science"]} />
      </Grid>

    </Grid>
    // <Box
    //   display="flex"
    //   justifyContent="center"
    //   width="100%"
    // >
    //   <Grid
    //     container
    //     spacing={0}
    //     direction="column"
    //     alignItems="center"
    //     justify="center"
    //     style={{ minHeight: '100vh' }}
    //   >
    //     <Grid item xs={10} md={4}>
    //       <ProjectCard
    //         image={rentingImage}
    //         imageTitle="NYC Renting Helper Image"
    //         cardTitle="NYC Renting Helper"
    //         cardDescription="A tool intended for renters to explore typical rental prices in New York City neighbourhoods based on amenities and features required"
    //         technologiesUsed={["D3.js", "Python", "Regression"]}
    //         codeLink=""
    //         projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
    //         projectType={["Web Development", "Data Science"]} />
    //     </Grid>
    //     <Grid item xs={10} md={4}>
    //       <ProjectCard
    //         image={rentingImage}
    //         imageTitle="NYC Renting Helper Image"
    //         cardTitle="NYC Renting Helper"
    //         cardDescription="A tool intended for renters to explore typical rental prices in New York City neighbourhoods based on amenities and features required"
    //         technologiesUsed={["D3.js", "Python", "Regression"]}
    //         codeLink=""
    //         projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
    //         projectType={["Web Development", "Data Science"]} />
    //     </Grid>
    //     <Grid item xs={10} md={4}>
    //       <ProjectCard
    //         image={rentingImage}
    //         imageTitle="NYC Renting Helper Image"
    //         cardTitle="NYC Renting Helper"
    //         cardDescription="A tool intended for renters to explore typical rental prices in New York City neighbourhoods based on amenities and features required"
    //         technologiesUsed={["D3.js", "Python", "Regression"]}
    //         codeLink=""
    //         projectLink="https://main--peaceful-queijadas-9871d6.netlify.app/"
    //         projectType={["Web Development", "Data Science"]} />
    //     </Grid>
    //   </Grid>
    // </Box>
  )
}