import axios from "axios";

const api = axios.create({
    baseURL: "https://questoesquimica.herokuapp.com"
});

export default api;