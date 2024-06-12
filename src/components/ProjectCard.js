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
                width: "52vh",
                height: "61vh",
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
                    <Grid container height={"25vh"}>
                        {cardSubTitle !== "" ?
                            <>
                                <Grid container height={"12vh"} marginBottom={"5px"}>
                                    <Grid item>
                                        <Typography gutterBottom variant="h5" component="div" textAlign="left">
                                            {cardTitle}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        {cardSubTitle !== "" ? <Typography gutterBottom variant="h7" color="#D3D3D3" component="div" textAlign="left">
                                            {cardSubTitle}
                                        </Typography> : ""}
                                    </Grid>
                                </Grid>
                            </> :
                            <>
                                <Grid container height={"12vh"} marginBottom={"5px"} alignItems={"center"}>
                                    <Grid item>
                                        <Typography gutterBottom variant="h5" component="div" textAlign="left">
                                            {cardTitle}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </>}
                        <Grid container spacing={1}>
                            {technologiesUsed.map((tech) => {
                                return (
                                    <Grid item>
                                        <Chip label={tech} color="secondary" />
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Typography variant="body2" color="text.secondary" textAlign="left" marginTop={2}>
                            {cardDescription}
                        </Typography>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button size="small" component={Link} to={moreLink}>Learn More</Button>
                    {projectLink === "" ? "" : <Button size="small" href={projectLink}>View Project</Button>}
                </CardActions>
            </Card >
        </Box >
    );
}