import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppSelector } from "../redux/hooks";

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { isDark } = useAppSelector((state) => state.ui);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="contact">
      <Container
        id="faq"
        sx={{
          mt: 4,
          pt: { xs: 4, sm: 12 },
          pb: { xs: 4, sm: 8 },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <h1 className="text-uppercase poppins-font">
          Frequently asked questions
        </h1>

        <Box sx={{ width: "100%" }}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{
              backgroundColor: isDark ? "#111111" : "white",
              color: isDark ? "white" : "gray",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography component="h3" variant="subtitle2">
                How many zip codes can I cover?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ maxWidth: { sm: "100%", md: "70%" } }}
              >
                As many as you can handle! Our platform allows you to select the
                zip codes you want to target, with the flexibility to adjust
                your coverage based on your capacity and growth goals. Whether
                you're focused on a single neighborhood or expanding citywide,
                we can accommodate your needs.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={{
              backgroundColor: isDark ? "#111111" : "white",
              color: isDark ? "white" : "gray",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography component="h3" variant="subtitle2">
                What is your pricing and specials?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ maxWidth: { sm: "100%", md: "70%" } }}
              >
                Our starting price for most zip codes is $1000, which is enough
                to make sure our ad campaigns work effectively. We also offer
                promotions for longer commitments, such as 3 months free with a
                6-month subscription. We're happy to discuss your specific needs
                and provide a customized quote.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            sx={{
              backgroundColor: isDark ? "#111111" : "white",
              color: isDark ? "white" : "gray",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography component="h3" variant="subtitle2">
                How many agents can run ads in each zip code?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ maxWidth: { sm: "100%", md: "70%" } }}
              >
                Usually 2-3, depending on the market and it's demand. We limit
                the number of agents per zip code to ensure that you have the
                best chance of converting leads into clients. By reducing
                competition within each area, we help you stand out and maximize
                your return on investment.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </div>
  );
}
