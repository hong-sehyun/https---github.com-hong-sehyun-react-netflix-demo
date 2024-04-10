import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);

  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword });

  const handlePageClick = () => {};

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
      <div> 필터</div>
      <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 12, md: 12 }}>
        {data?.results.map((movie, index) => (
          <Grid item xs={2} sm={6} md={3} key={index}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
        {/* <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={data?.total_pages}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          forcePage={page - 1}
        /> */}

        <Pagination
          count={10}
          // count={data?.total_pages}
          // onChange={handlePageClick}
          // page={page}
        />
      </Grid>
    </Box>
  );
};

export default MoviePage;
