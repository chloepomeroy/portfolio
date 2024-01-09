import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  Box,
  TextField,
  Stack,
  Grid,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const styles_half = { backgroundColor: "#454545", width: "50%" };
  const styles_full = { backgroundColor: "#454545", width: "100%" };

  const handleSubmit = () => {
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(message);
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
    // set open for snackbar success here
  };

  return (
    <Grid
      container
      id="contact"
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%" }}
    >
      <h2>Contact</h2>

      {/* Mobile */}
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ width: "80%", display: { xs: "flex", md: "none" } }}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            id="first-name"
            label="First Name"
            value={firstName}
            variant="outlined"
            sx={styles_half}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="last-name"
            label="Last Name"
            value={lastName}
            variant="outlined"
            sx={styles_half}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Stack>
        <TextField
          id="email-address"
          label="Email Address"
          value={email}
          variant="outlined"
          sx={styles_full}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="message"
          label="Message"
          value={message}
          multiline
          rows={6}
          variant="outlined"
          sx={styles_full}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ marginLeft: { xs: 0, md: 3 } }}
          onClick={handleSubmit}
        >
          <SendIcon
            color="background"
            style={{ marginRight: "5px", fontSize: 19 }}
          />{" "}
          Send
        </Button>
      </Stack>

      {/* Desktop */}
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            id="first-name"
            label="First Name"
            value={firstName}
            variant="outlined"
            sx={styles_half}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="last-name"
            label="Last Name"
            value={lastName}
            variant="outlined"
            sx={styles_half}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Stack>
        <TextField
          id="email-address"
          label="Email Address"
          value={email}
          variant="outlined"
          sx={styles_full}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="message"
          label="Message"
          value={message}
          multiline
          rows={6}
          variant="outlined"
          sx={styles_full}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ marginLeft: { xs: 0, md: 3 } }}
          onClick={handleSubmit}
        >
          <SendIcon
            color="background"
            style={{ marginRight: "5px", fontSize: 19 }}
          />{" "}
          Send
        </Button>
      </Stack>
    </Grid>
  );
}
