import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import image from "../../../assets/images/logo.png";

const logoStyle = {
  width: "140px",
  height: "auto",
  marginLeft: "20px",
  cursor: "pointer",
};

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <img src={image} style={logoStyle} alt="logo of sitemark" />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: "20px",
                alignItems: "center",
                justifyContent: "flex-start",
                lineheight: 1.43,

                flexBasis: "60%",
              }}
            >
              <MenuItem onClick={() => scrollToSection("features")}>
                <Typography
                  variant="body2"
                  color="text.primary"


                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9800rem",
                    lineheight: 1.43,
                    fontWeight:"550"


                  }}
                >
                  {" "}
                  Features
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("testimonials")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  fontWeight="400"

                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9800rem",
                    lineheight: 1.43,
                    fontWeight:"550"


                  }}
                >
                  {" "}
                  Testimonials
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("highlights")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  fontWeight="400"

                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9800rem",
                    lineheight: 1.43,
                    fontWeight:"550"


                  }}
                >
                  {" "}
                  Highlights
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("pricing")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  fontWeight="400"

                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9800rem",
                    lineheight: 1.43,
                    fontWeight:"550"


                  }}
                >
                  Pricing
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("faq")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  fontWeight="400"
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9800rem",
                    lineheight: 1.43,
                    fontWeight:"550"


                  }}
                >
                  FAQ
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              <Button
                color="primary"
                variant="text"
                size="normal"
                component="a"
                href="/material-ui/getting-started/templates/sign-in/"
                target="_blank"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9600rem",
                  fontWeight:"550",
                  marginRight:"10px"
                }}
              >
                Sign in
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="normal"
                component="a"
                href="/material-ui/getting-started/templates/sign-up/"
                target="_blank"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9600rem",
                  fontWeight:"550"
                }}
              >
                Sign up
              </Button>
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <MenuItem onClick={() => scrollToSection("features")}>
                    Features
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("testimonials")}>
                    Testimonials
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("highlights")}>
                    Highlights
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("pricing")}>
                    Pricing
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("faq")}>
                    FAQ
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-up/"
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-in/"
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Sign in
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
