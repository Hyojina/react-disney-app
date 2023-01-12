import axios from "../../api/axios";
import "./SearchPage.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();

  // 여러개의 movie 정보가 오기 때문에 배열로 초기화합니다.
  const [searchResults, setSearchResults] = useState([]);

  const useQuery = () => {
    // 현재 url 주소의 값 중, search 부분에 해당하는 내용을 가져옵니다.
    return new URLSearchParams(useLocation().search);
  };

  // 인스턴스 객체가 됩니다.
  let query = useQuery();
  // console.log(query.toString());
  const searchTerm = query.get("q");

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
    // 검색할 때마다 호출되어야 하므로 종속성 부분에 searchTerm을 넣어줍니다.
  }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log(response.data.results);
      // React 컴포넌트에서 결과값을 관리하기 위해 state에 넣어줍니다.
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  if (searchResults.length > 0) {
    return (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div
                  className="movie__column-poster"
                  onClick={() => navigate(`/${movie.id}`)}
                >
                  <img
                    className="movie__poster"
                    src={movieImageUrl}
                    alt="movie"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    );
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자 하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  }
};

export default SearchPage;
