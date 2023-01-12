import axios from "../../api/axios";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
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

  return <div>SearchPage</div>;
};

export default SearchPage;
