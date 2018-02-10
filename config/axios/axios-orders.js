import axios from "axios";

export default axios.create({
  baseURL: "https://burger-builder-5d4a5.firebaseio.com/"
});
