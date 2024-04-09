import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

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
        title="Top Rated"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default TopRatedMovieSlide;
