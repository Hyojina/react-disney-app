import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({
    backdrop_path: "/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg",
  });

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`movie/${movieId}`);
      setMovie(response.data);
    }
    fetchData();
    console.log(movie);
  }, [movieId]);

  return (
    <section>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  );
};

export default DetailPage;
