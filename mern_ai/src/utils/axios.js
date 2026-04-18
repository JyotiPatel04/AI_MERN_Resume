
import Axios from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

export default axios;