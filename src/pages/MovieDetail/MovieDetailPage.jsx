import React from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { Grid, Paper, Typography, Button, Box } from "@mui/material";
import TrailerModal from "../HomePage/components/TrailerModal/TrailerModal";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import ReviewModal from "../HomePage/components/ReviewModal/ReviewModal";
import RecommendationSlide from "./components/RecommendationSlide/RecommendationSlide";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailQuery(id);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Alert variant="filled" severity="error">
        {error.message}
      </Alert>
    );
  }

  if (!data || !data.title) {
    return (
      <Box>
        <CircularProgress />;
      </Box>
    );
  }

  return (
    <div>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "auto",
              }}
              alt={data?.title}
              src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box display="flex" flexDirection="column" height="100%">
            <Typography variant="h5" gutterBottom>
              {data?.title}
            </Typography>
            {data?.genres && (
              <Typography variant="subtitle1" gutterBottom>
                {data?.genres.map((genre) => genre.name).join(", ")}
              </Typography>
            )}
            <TrailerModal id={id} />
            <Typography variant="body1" sx={{ flexGrow: 1 }} gutterBottom>
              {data?.overview}
            </Typography>
            <Typography variant="body2" gutterBottom>
              인기도: {data?.popularity}
            </Typography>
            <Typography variant="body2" gutterBottom>
              예산: ${data?.revenue.toLocaleString()}
            </Typography>
            <Typography variant="body2" gutterBottom>
              개봉일: {data?.release_date}
            </Typography>
            <ReviewModal id={data?.id} />
          </Box>
        </Grid>
      </Grid>
      <RecommendationSlide id={data?.id} />
    </div>
  );
};

export default MovieDetailPage;
