import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import Link from "next/link";

export default function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: "center", md: "left" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              minWidth: { xs: "100%", sm: "60%" },
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
              <h3 className="text-uppercase mb-0 text-start text-sm-center custom-title ft-wt-600">
                Join newsletter
              </h3>

              <p className="open-sans-font mb-4">
                Subscribe to our newsletter to receive our most exiting updates
                and offers.
              </p>
              <div className="contact">
                <form id="myForm" className="contactform">
                  <div className="col">
                    <div className="col-12">
                      <div
                        className="form-group"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <input
                          type="email"
                          name="user_email"
                          placeholder="YOUR EMAIL"
                          required
                          style={{ flexGrow: 1, marginRight: "10px" }}
                        />
                        <div>
                          <button
                            type="submit"
                            className="button"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <span className="button-text">Subscribe</span>
                            <span className="button-icon fa fa-send"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
              mr: 15,
            }}
          >
            <h3 className="text-uppercase mb-0 text-start ">Explore</h3>
            <Link
              color="text.secondary"
              href="/about"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              About us
            </Link>
            
            <Link
              color="text.secondary"
              href="/contact"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Contacto
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: { xs: 1, sm: 3 },
            width: "100%",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <div>
            <Link href="/privacy" style={{ color: "grey", fontSize: "0.875rem" }}>
              Privacy Policy
            </Link>
            <span
              style={{ display: "inline", margin: "0 0.5rem", opacity: 0.5 }}
            >
              &nbsp;•&nbsp;
            </span>
            <Link href="/terms" style={{ color: "grey", fontSize: "0.875rem" }}>
              Terms of Service
            </Link>
            <p
              style={{ color: "grey", fontSize: "0.875rem", marginTop: "1rem" }}
            >
              Copyright ©
              <a href="https://multisoft.com/" style={{ color: "grey" }}>
                Multisoft
              </a>
              &nbsp;2024
            </p>
          </div>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: "left", color: "#286bce", mr: 10 }}
          >
            <IconButton
              color="inherit"
              size="small"
              href="https://multisoft.com"
              aria-label="Facebook"
              sx={{ alignSelf: "center" }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://multisoft.com"
              aria-label="X"
              sx={{ alignSelf: "center" }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://multisoft.com"
              aria-label="LinkedIn"
              sx={{ alignSelf: "center" }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}
