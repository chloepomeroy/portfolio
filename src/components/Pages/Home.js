import { useRef, React } from "react";
import Certifications from "./Certifications";
import Education from "./Education";
import Experience from "./Experience";
import About from "./About";
import Projects from "./Projects";
import { Grid } from "@mui/material";

function Section(props) {
    const { component } = props
    return (
        <>
            {component}
            <Grid container>
                <Grid item xs={12}></Grid>
            </Grid>
        </>
    )
}

export default function Home() {

    return (
        <>
            <Projects id="projects" />
            <Experience id="experience" />
            <Education />
            <Certifications />
            <About />
        </>
    )
}