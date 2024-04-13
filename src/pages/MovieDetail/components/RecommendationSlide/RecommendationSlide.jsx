import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import { useRecommendationQuery } from "../../../../hooks/useRecommendation";

const RecommendationSlide = ({ id }) => {
  const { data, isLoading, isError, error } = useRecommendationQuery(id);
  console.log("d4", data);
  if (isLoading) {
    <CircularProgress />;
  }

  if (isError) {
    <Alert variant="filled" severity="error">
      {error.message}
    </Alert>;
  }

  if (!data || !data.results) {
    return (
      <Box>
        <CircularProgress />;
      </Box>
    );
  }

  return (
    <div>
      <MovieSlider
        title="Recommendations"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default RecommendationSlide;
