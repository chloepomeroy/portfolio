import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Footer() {
    var githubLink = <Link className="nice-link" to="https://github.com/chloepomeroy/portfolio">Github repo for this website</Link>
    return (
        <Box className="footer" sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container sx={{ justifyContent: "space-between" }}>
                        <Grid item sx={{ textAlign: "left" }}>
                            <Typography color={"#808080"}>
                                Chloe Pomeroy, Data Professional
                            </Typography>
                        </Grid>
                        <Grid item sx={{ textAlign: "right" }}>
                            {githubLink}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}