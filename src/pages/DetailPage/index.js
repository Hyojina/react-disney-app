import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`movie/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.log(error);
        // 만약 상세 정보가 없으면 이전 페이지로 돌려보내기
        navigate(-1);
      }
    }
    fetchData();
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
