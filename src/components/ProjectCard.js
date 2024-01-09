import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { theme } from '../Theme.js';

export default function ProjectCard(props) {
    const { image, imageTitle, cardTitle, cardDescription, technologiesUsed, codeLink, projectLink, projectType } = props
    return (
        <Card sx={{ maxWidth: "50vm", maxHeight: "50vh", backgroundColor: "#353535", display: "inline-block", justifyContent: "center" }} >
            <CardMedia
                sx={{ height: 300 }}
                image={image}
                title={imageTitle}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {cardTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {cardDescription}
                </Typography>
            </CardContent>
            <CardActions>
                {projectType.includes("Web Development") ? (
                    <>
                        <Button size="small" href={codeLink}>Code</Button>
                        <Button size="small" href={projectLink}>View Project</Button>
                    </>
                ) : (
                    <Button size="small" href={projectLink}>View Project</Button>
                )}
            </CardActions>
        </Card >
    );
}