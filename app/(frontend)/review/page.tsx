"use client";
import Review from "./Review";
import { Box, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/testimony");
      if (!response.ok) {
        throw new Error("Error al obtener los testimonios");
      }
      const data = await response.json();
      setReviews(data);
      return data;
    } catch (error) {
      console.error("Error al obtener los testimonios:", error);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  };

  useEffect(() => {
    const getReviews = async () => {
      try {
        const result = await fetchReviews();
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, []);

  return (
    <>
      <div className="portfolio professional mt-4">
        <div
          className="title-section text-start text-sm-center"
          // data-aos="fade-up"
          // data-aos-duration="1200"
        >
          <h1>
            <span>Reseñas</span>
          </h1>
          <span className="title-bg">reseñas</span>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <div className="container">
            <div className="tab-container">
              <Grid2 container spacing={2}>
                {reviews.map((item) => {
                  const { TestimonyKey } = item;
                  return (
                    <div
                      key={TestimonyKey}
                      // data-aos="fade-right"
                      // data-aos-delay={delayAnimation}
                    >
                      <div className="tab-content">
                        <Grid2
                          key={TestimonyKey}
                          size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                        >
                          <Review key={TestimonyKey} {...item} />
                        </Grid2>
                      </div>
                    </div>
                  );
                })}
              </Grid2>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};

export default Reviews;
