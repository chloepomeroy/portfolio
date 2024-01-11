import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Box, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ProjectCard(props) {
    const { image, imageTitle, cardTitle, cardSubTitle, cardDescription, technologiesUsed, moreLink, projectLink, projectType } = props
    return (
        <Box sx={{ position: 'relative' }}>
            <Card sx={{
                width: "50vm",
                height: "50vh",
                backgroundColor: "#353535",
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column'
            }} >
                <CardMedia
                    sx={{ height: 300 }}
                    image={image}
                    title={imageTitle}
                />
                {/* {projectType.map((type, i) => {
                    console.log(i)
                    return (
                        <Badge key={i} right={i + 10 + i * 10} sx={{ position: 'absolute', bottom: 10 }} badgeContent={type} color="primary" />)
                })} */}
                <CardContent>
                    {/* {technologiesUsed.map((tech, i) => {
                        return (
                            <Badge key={i} badgeContent={tech} />)
                    })} */}
                    <Typography gutterBottom variant="h5" component="div">
                        {cardTitle}
                    </Typography>
                    {cardSubTitle !== "" ? <Typography gutterBottom variant="h7" color="#D3D3D3" component="div" textAlign="left">
                        {cardSubTitle}
                    </Typography> : ""}
                    <Stack direction="row" spacing={1} marginBottom={1}>
                        {technologiesUsed.map((tech) => {
                            return (
                                <Chip label={tech} color="secondary" />
                            )
                        })}
                    </Stack>
                    <Typography variant="body2" color="text.secondary" textAlign="left" marginTop={2}>
                        {cardDescription}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={Link} to={moreLink}>Learn More</Button>
                    {projectLink === "" ? "" : <Button size="small" href={projectLink}>View Project</Button>}
                </CardActions>
            </Card >
        </Box >
    );
}