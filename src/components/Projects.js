import React, { useState, useEffect } from "react";
import {
  AppBar,
  Tab,
  Tabs,
  Box,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Projects() {
  const [letterClass, setLetterClass] = useState("text-animate");

  const projects = [
    {
      title: "Example",
      description: "This is an example project",
      imgUrl: "",
      redirectUrl: "https://www.google.com",
    },
    {
      title: "Example 2",
      description: "This is an example project",
      imgUrl: "videos/avg_games_test.mp4",
      redirectUrl: "https://www.google.com",
    },
    {
      title: "Example 3",
      description: "This is an example project",
      imgUrl: "",
      redirectUrl: "https://www.google.com",
    },
  ];
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Grid
      container
      id="projects"
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%" }}
    >
      {/* <AnimatedLetters letterClass={letterClass} word="Projects" delay={0} /> */}

      <h2>Projects</h2>
      <p>Lorem Ipsum</p>

      <Box
        id="projects-tabs"
        sx={{ width: "50%", bgcolor: "background.paper" }}
      >
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
          >
            {projects.map((project, i) => {
              return <Tab key={i} label={project.title} {...a11yProps(i)} />;
            })}
          </Tabs>
        </AppBar>
        {projects.map((project, i) => {
          return (
            <TabPanel key={i} value={value} index={i}>
              {project.description}
              {project.imgUrl.length != 0 ? (
                <ReactPlayer
                  className="react-player fixed-bottom"
                  url={project.imgUrl}
                  width="100%"
                  height="100%"
                  controls={true}
                />
              ) : null}
              <br />
              <Button href={project.redirectUrl}>More Info</Button>
            </TabPanel>
          );
        })}
      </Box>
    </Grid>
  );
}
