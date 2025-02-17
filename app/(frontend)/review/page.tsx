import ReviewData from "./reviewData";
import Review from "./Review";
import { Box, Grid2 } from "@mui/material";

const Reviews = () => {
  return (
    <>
      <div className="portfolio professional mt-4">
        <div
          className="title-section text-start text-sm-center"
          data-aos="fade-up"
          data-aos-duration="1200"
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
                {ReviewData.map((item) => {
                  const { id, delayAnimation } = item;
                  return (
                    <div
                      key={id}
                      data-aos="fade-right"
                      data-aos-delay={delayAnimation}
                    >
                      <div
                        className="tab-content"
                      >
                        <Grid2
                          key={id}
                          size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                        >
                          <Review key={id} {...item} />
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
