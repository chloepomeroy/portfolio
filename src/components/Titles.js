import React from "react";
import { Typography } from "@mui/material";
import Divider from '@mui/material/Divider';

export default function PageTitle(props) {
    const { pageTitle } = props
    return (
        <>
            <Typography variant="h4" sx={{
                lineHeight: "1em",
                textTransform: "uppercase",
                fontSize: "2.5em",
                fontWeight: 700,
                color: "#ba8bf9",
                width: "fit-content",
                margin: "10px 0",
                letterSpacing: "2px",
                textShadow: '-3px 3px 2px #6a439f'
            }}>{pageTitle}</Typography>
            <Divider sx={{ marginBottom: "1vh" }} />
        </>
    )
}