import * as React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { CustomTabPanel } from "./CustomTabPanel";
import { useInView } from "react-intersection-observer"; 

export default function Hero() {
  const [ref, inView] = useInView();
  const handleNavigation = () => {
    window.location.href = 'http://localhost:3000/authentificate/login'; 
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #5084bc, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          pt: { xs: 14, sm: 40 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ width: { xs: "100%", sm: "100%" } }}
        >
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              marginLeft: "20px",
            }}
          >
            TeamSync. &nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
                fontSize: "1em",
                fontWeight: 800,
                lineHeight: 1,
                animation: inView ? "popOut 0.9s ease-out backwards" : "",
                "@keyframes popOut": {
                  "0%": {
                    transform: "scale(0.8)",
                    opacity: 0,
                  },
                  "100%": {
                    transform: "scale(1)",
                    opacity: 1,
                  },
                },
              }}
              ref={ref}
            >
              Your ultimate workspace
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "20px",
              lineHeight: 1.43,
              fontWeight: 400,
            }}
          >
            Manage your projects with ease, stay connected and move forward
            together
            <br />
            An agile project management tool{" "}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf={{ xs: "center", sm: "center" }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "", sm: "auto" } }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ width: "250px" }}
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "18px",
                lineHeight: 1.43,
                fontWeight: 400,
              }}
              sm={{
                fontSize: "18px",
                lineHeight: 1.43,
                fontWeight: 400,
                alignSelf:'right'

              }}
              onClick={handleNavigation}
            >
              Start now
            </Button>
          </Stack>
        </Stack>

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            pt: { xs: 2, sm: 15 },
          }}
        >
          <CustomTabPanel />
        </Container>
      </Container>
    </Box>
  );
}