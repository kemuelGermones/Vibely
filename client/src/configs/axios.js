import axios, { AxiosError } from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const server = axios.create({
  baseURL: SERVER_URL,
});

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { code, config, request, response } = error;
    const message = response
      ? response.data.message
      : "An error occured while trying to connect to server";
    const axiosError = new AxiosError(message, code, config, request, response);
    return Promise.reject(axiosError);
  }
);

export default server;
