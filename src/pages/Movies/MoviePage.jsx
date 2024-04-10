import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MovieCard from "../../common/MovieCard/MovieCard";
// import ReactPaginate from "react-paginate";
import { Pagination } from "@mui/material";
import Button from "@mui/material/Button";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortByVote, setSortByVote] = useState(false);

  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  const handlePageClick = (event, value) => {
    setPage(value);
    // console.log("page", page);
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
          평점순 정렬
        </Button>
      </div>
      <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 12, md: 12 }}>
        {/* {data?.results.map((movie, index) => (
          <Grid item xs={2} sm={6} md={3} key={index}>
            <MovieCard movie={movie} />
          </Grid>
        ))} */}
        {data?.results
          .slice()
          .sort((a, b) => (sortByVote ? b.vote_average - a.vote_average : 0))
          .map((movie, index) => (
            <Grid item xs={2} sm={6} md={3} key={index}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        <Pagination
          count={data?.total_pages}
          defaultPage={1}
          color="primary"
          page={page}
          onChange={handlePageClick}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
              borderColor: "gray",
            },
          }}
          // count={data?.total_pages}
          // onChange={handlePageClick}
          // page={page}
        />
      </Grid>
    </Box>
  );
};

export default MoviePage;
