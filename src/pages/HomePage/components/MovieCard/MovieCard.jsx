import React from "react";
import Chip from "@mui/material/Chip";
import "./MovieCard.style.css";
import StarIcon from "@mui/icons-material/Star";

const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h3>{movie.title}</h3>
        {movie.genre_ids.map((id) => (
          <Chip label={id} color="error" />
        ))}
        <div>
          <div>
            <StarIcon />
            {movie.vote_average}
          </div>
          <div>{movie.popularity}</div>
          <div>{movie.adult ? "18+" : ""}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
