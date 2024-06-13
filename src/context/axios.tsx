import axios from "axios";

export default axios.create({
  baseURL: "https://node-vercel-sigma.vercel.app",
//   baseURL: "http://192.168.1.71:3030",
});
