import { Grid, Typography, Button, Stack } from "@mui/material";
import React, { useRef, useEffect } from "react";
import PageTitle from "../../Titles";
import { Link } from "react-router-dom";

export default function QClefProject() {
    var clef = <Link className="nice-link" to="https://clef2025.clef-initiative.eu">CLEF 2025</Link>
    var qclef = <Link className="nice-link" to="https://qclef.dei.unipd.it/clef2025-lab">Quantum CLEF</Link>

    return (
        <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }} id="projects" >
            <Grid item xs={10} style={{ textAlign: "left" }}>
                <PageTitle pageTitle="Quantum Annealing for Machine Learning: Applications in Feature Selection, Instance Selection, and Clustering" />
                <Typography variant="h6" color={"#808080"} marginBottom={2}>
                    Quantum CLEF 2025 Lab Submission
                </Typography>
                <Grid item xs={5} marginBottom={2} style={{ textAlign: "left" }}>
                    <Button variant="outlined" href="https://arxiv.org/abs/2507.15063">View on arxiv</Button>
                </Grid>
            </Grid>

            <Grid container spacing={2} padding={2} style={{ justifyContent: "center", textAlign: "left" }} marginBottom={5}>
                <Grid item xs={10}>
                    <Typography color={"#808080"} marginBottom={2}>
                        This work was done in collaboration with my co-authors Aleksandar Pramov, Karishma Thakrar, and Lakshmi Yendapalli, as part of 
                        The Data Science @ Georgia Tech Applied Research Competitions group.
                    </Typography>
                    <Typography>
                    As part of the {qclef} 2025 Lab at the {clef} conference, this research project investigated the use of quantum and classical 
                    annealing techniques for tackling discrete optimization challenges in machine learning. Our team developed and evaluated QUBO-based 
                    formulations for tasks like feature selection, instance selection, and clustering, contributing a paper accepted to the conference. 
                    This work highlights the potential of emerging quantum methods for practical applications in data-driven workflows.
                    </Typography>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <Typography variant="h6" color={"#b8a3d4"}>
                        Abstract
                    </Typography>
                    <Typography>
                    This paper explores the applications of quantum annealing (QA) and classical simulated annealing (SA) 
                    to a suite of combinatorial optimization problems in machine learning, namely feature selection, 
                    instance selection, and clustering. We formulate each task as a Quadratic Unconstrained Binary 
                    Optimization (QUBO) problem and implement both quantum and classical solvers to compare their effectiveness. 
                    For feature selection, we propose several QUBO configurations that balance feature importance and redundancy, 
                    showing that quantum annealing (QA) produces solutions that are computationally more efficient. In instance 
                    selection, we propose a few novel heuristics for instance-level importance measures that extend existing 
                    methods. For clustering, we embed a classical-to-quantum pipeline, using classical clustering followed by 
                    QUBO-based medoid refinement, and demonstrate consistent improvements in cluster compactness and retrieval 
                    metrics. Our results suggest that QA can be a competitive and efficient tool for discrete machine learning 
                    optimization, even within the constraints of current quantum hardware.
                    </Typography>
                </Grid>
                <Grid item xs={10} style={{ justifyContent: "center" }}>
                    <iframe
                        src="https://arxiv.org/pdf/2507.15063"
                        type="application/pdf"
                        width="100%"
                        height="850px"
                    ></iframe>
                </Grid>
            </Grid>
        </Grid>
    )
}