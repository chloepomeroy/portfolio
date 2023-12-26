import React from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "./NavBar";
import { CssBaseline, Box } from "@mui/material";

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <NavBar />

      <Outlet />
    </>
  );
}
