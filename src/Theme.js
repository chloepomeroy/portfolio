import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ba8bf9",
      darker: "#51dce6"
    },
    secondary: {
      main: "#b8a3d4",
    },
    background: {
      default: "#2b2b2b",
      paper: "#212121",
      lighter: "#353535"
    },
  },
});
