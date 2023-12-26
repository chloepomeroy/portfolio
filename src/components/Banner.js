import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";

export default function Banner() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(100 - Math.random() * 100);
  const period = 1500;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(375);
    }
  };

  const toRotate = ["Analyst", "Engineer", "Scientist"];

  return (
    <section>
      <Grid sx={{ justifyContent: "flex-start", textAlign: "flex-start" }}>
        <h1>
          {"Hi I'm Chloe "}
          <br />
          <span>Data {text}</span>
        </h1>
      </Grid>
      <p>about lorem ipsum dolor blah blah</p>
      <Button variant="contained" sx={{ marginLeft: { xs: 0, md: 3 } }}>
        Contact
      </Button>
    </section>
  );
}
