import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { SliderComp } from "./SliderComp";
import "./styles.css";
import image1 from "../../../assets/images/image1.png";
import image2 from "../../../assets/images/kanban.gif";
import { alpha } from "@mui/material";

import image3 from "../../../assets/images/gestion.png";

const data = [
  {
    title: "Adaptable performance",
    image: image1,
  },
  {
    title: "Innovative functionality",
    image: image3,
  },
  {
    title: "Great user experience",
    image: image2,
  },
  {
    title: "Innovative functionality",
    image: image1,
  },
  {
    title: "Precision in every detail",
    image: image3,
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={(theme) => ({
        pt: { xs: 4, sm: 5 },
        pb: { xs: 8, sm: 16 },
        color: "#f3f6f4",
        backgroundImage:
          theme.palette.mode === "light"
            ? "white"
            : `linear-gradient(#090E10, ${alpha("#090E10", 0.0)})`,
      })}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "#0f457b",
              fontFamily: "'Inter', sans-serif",
              marginTop: "50px",
              marginLeft: "10px",
              marginBottom: "38px",
              fontSize: "50px",
            }}
          >
            Feature by Feature
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "grey.500",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Explore why our product stands out: adaptability, durability,
            user-friendly design, and innovation. Enjoy reliable customer
            support and precision in every detail.
          </Typography>
        </Box>

        <SliderComp
          autoplay={true}
          autoplaySpeed={2000}
          slideNum={3}
          data={data}
        />
      </Container>
    </Box>
  );
}
