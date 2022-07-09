import axios from "axios";

export const api = axios.create({
  baseURL: 'https://rocketnotes2-api.herokuapp.com'
});