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
        <h1 className="text-uppercase poppins-font">Preguntas frecuentes</h1>

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
                Qué es un ERP?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ maxWidth: { sm: "100%", md: "70%" } }}
              >
                Enterprise Resource Planning (ERP) es un tipo de software que
                las organizaciones utilizan para gestionar las actividades
                empresariales diarias, como la contabilidad, el
                aprovisionamiento, la gestión de proyectos, la gestión de
                riesgos y el cumplimiento, y las operaciones de la cadena de
                suministro.
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* <Accordion
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
          </Accordion> */}
        </Box>
      </Container>
    </div>
  );
}
