import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import requests from "../api/requests";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState({
    backdrop_path: "/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(requests.fetchNowPlaying);

    const movieId =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;

    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: {
        append_to_response: "videos",
      },
    });
    console.log("movieDetail", movieDetail);
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie.title || movie.original_title}</h1>

        <div className="banner__buttons">
          {movie.videos?.results[0]?.key ? (
            <button className="banner__button play">PLAY</button>
          ) : null}
        </div>
        <h5 className="banner__description">{truncate(movie.overview, 100)}</h5>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
