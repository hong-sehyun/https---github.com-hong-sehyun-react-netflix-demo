import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

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
        title="Upcoming"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMovieSlide;
