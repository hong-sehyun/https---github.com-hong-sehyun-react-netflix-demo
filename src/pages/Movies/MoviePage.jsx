import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MovieCard from "../../common/MovieCard/MovieCard";
import { Pagination } from "@mui/material";
import Button from "@mui/material/Button";
import GenreFilter from "./components/Filters/GenreFilter/GenreFilter";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortByVote, setSortByVote] = useState(false);
  const [genreFilter, setGenreFilter] = useState([]);

  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  const handlePageClick = (event, value) => {
    setPage(value);
    // console.log("page", page);
  };

  const handleGenre = (id) => {
    setGenreFilter([...genreFilter, id]);
  };

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
    <Box sx={{ mt: 5 }}>
      <div>
        <Button
          onClick={() => setSortByVote(!sortByVote)}
          sx={{ ml: 2, cursor: "pointer" }}
        >
          인기순 정렬
        </Button>
        <GenreFilter onGenreChange={handleGenre} />
      </div>
      <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 12, md: 12 }}>
        {data?.results
          .slice()
          .sort((a, b) => (sortByVote ? b.vote_average - a.vote_average : 0))
          .filter((item) =>
            genreFilter.every((i) => item.genre_ids.includes(i))
          )
          .map((movie, index) => (
            <Grid item xs={2} sm={6} md={3} key={index}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={data?.total_pages}
          page={page}
          onChange={handlePageClick}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
              borderColor: "gray",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default MoviePage;
