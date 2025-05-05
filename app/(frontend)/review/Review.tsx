"use client";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import { ReviewProps } from "@/src/interfaces/interfaces";
import { useAppSelector } from "@/src/redux/hooks";

export default function Review(review: ReviewProps) {
  const { isDark } = useAppSelector((state) => state.ui);
  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: isDark ? "#111111" : "white",
        color: isDark ? "white" : "gray",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "#decd8769" }}
            aria-label="recipe"
            src={review.imageUrl} // Asegúrate de que `review.image` contiene la URL de la imagen
          />
        }
        title={`${review.name} - ${review.cargo}`}
        subheader={review.date}
        subheaderTypographyProps={{
          style: { color: isDark ? "white" : "gray" },
        }}
      />

      <CardContent>
        <p className="open-sans-font">{review.comment}</p>
      </CardContent>
      {/* <CardActions disableSpacing>
        {Array(review.rating)
          .fill()
          .map((_, i) => (
            <p key={i}>&#11088;</p>
          ))}
      </CardActions> */}
    </Card>
  );
}
