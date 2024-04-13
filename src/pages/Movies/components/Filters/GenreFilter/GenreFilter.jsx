import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useMovieGenreQuery } from "../../../../../hooks/useMovieGenre";

const GenreFilter = ({ onGenreChange }) => {
  const { data, isLoading, isError, error } = useMovieGenreQuery();

  console.log("d5", data);
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

  // Check if data is not present or the array is empty
  if (!data || data.length === 0) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="genre-select-label">Genre</InputLabel>
      <Select
        labelId="genre-select-label"
        id="genre-select"
        value=""
        label="Genre"
        onChange={(e) => onGenreChange(e.target.value)}
        displayEmpty
      >
        {data.map((genre) => (
          <MenuItem key={genre.id} value={genre.id}>
            {genre.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenreFilter;
