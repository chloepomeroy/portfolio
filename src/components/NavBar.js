import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import kaggleIcon from "../assets/kaggle-icon.svg";

export default function NavBar() {
  const [activeLink, setActiveLink] = useState("Projects");
  // const [scrolled, setScrolled] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavClick = (page) => {
    setActiveLink(page.page)
  };

  const pages = [
    { page: "Projects", url: "/#projects" },
    { page: "Experience", url: "/#experience" },
    { page: "Certifications", url: "/certifications" },
    { page: "Education", url: "/education" },
    { page: "About", url: "/about" },
  ];

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Chloe Pomeroy
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={page.page + i} component={Link} to={page.url} onClick={() => handleNavClick(page.page)}>
                  <Typography textAlign="center">{page.page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Pomeroy
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, i) => (
              <Button
                key={page.page + i}
                component={Link}
                onClick={() => handleNavClick(page)}
                to={page.url}
                sx={{ my: 2, color: "white", display: "block" }}
                variant={activeLink === page.page ? "contained" : "text"}
              >
                {page.page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              aria-label="linkedin"
              href="https://www.linkedin.com/in/chloepomeroy/"
              color="inherit"
            >
              <LinkedInIcon sx={{ fontSize: { xs: 20, md: 30 } }} />
            </IconButton>
            <IconButton
              aria-label="github"
              href="https://github.com/chloepomeroy"
              color="inherit"
            >
              <GitHubIcon sx={{ fontSize: { xs: 20, md: 30 } }} />
            </IconButton>
            <IconButton
              aria-label="kaggle"
              href="https://www.kaggle.com/chloepomeroy"
              color="inherit"
            >
              <img src={kaggleIcon} alt="Kaggle icon" style={{ height: "1em" }} />
            </IconButton>
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              sx={{ marginLeft: { xs: 0, md: 3 } }}
            >
              Contact
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
