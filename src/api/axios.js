import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "c0c54d36689a799725c3b1a7103df846",
    language: "ko-KR",
  },
});

export default instance;
