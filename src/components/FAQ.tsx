import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchFaq } from "../redux/features/faq/faqSlice";

export default function FAQ() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const { isDark } = useAppSelector((state) => state.ui);

  const dispatch = useAppDispatch();
  const { faqs } = useAppSelector((state) => state.faq);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const fetchFAQS = async () => {
    try {
      const response = await fetch("/api/faq");
      if (!response.ok) {
        throw new Error("Error al obtener las preguntas frecuentes");
      }
      const data = await response.json();
      dispatch(fetchFaq(data));
      return data;
    } catch (error) {
      console.error("Error al obtener las preguntas frecuentes:", error);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  };

  useEffect(() => {
    const getFaqs = async () => {
      try {
        const result = await fetchFAQS();
      } catch (error) {
        console.log(error);
      }
    };

    getFaqs();
  }, []);

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
          {faqs.map((faq: any) => (
            <Accordion
              key={faq.FaqKey}
              expanded={expanded === faq.Title}
              onChange={handleChange(faq.Title)}
              sx={{
                backgroundColor: isDark ? "#111111" : "white",
                color: isDark ? "white" : "gray",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                // aria-controls="panel1d-content"
                // id="panel1d-header"
                key={faq.FaqKey}
              >
                <Typography component="h3" variant="subtitle2" key={faq.FaqKey}>
                  {faq?.Title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails key={faq.FaqKey}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ maxWidth: { sm: "100%", md: "70%" } }}
                  key={faq.FaqKey}
                >
                  {faq?.Description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </div>
  );
}
